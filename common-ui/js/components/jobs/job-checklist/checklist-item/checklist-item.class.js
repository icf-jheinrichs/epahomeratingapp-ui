let JSZip      = require('jszip');
let FileSaver  = require('file-saver');

class ChecklistItemClass {
    constructor (
        $log,
        $q,
        $rootScope,
        $timeout,
        SanitizeService,
        $stateParams,
        UI_ENUMS,
        DisplayLogicDigestService,
        JobChecklistStateService,
        ModalService,
        PopoverService,
        S3_CONFIG,
        $http,
        $injector,
        DialogService
        ) {
        'ngInject';

        this.isOnApp = true;
        try {
          this.$cordovaFile = $injector.get("$cordovaFile");
        } catch (err) {
          this.isOnApp = false;
        }

        this.$log         = $log;
        this.$q           = $q;
        this.$rootScope   = $rootScope;
        this.$timeout     = $timeout;
        this.$stateParams = $stateParams;
        this.$http        = $http;

        this.RESPONSES    = UI_ENUMS.RESPONSES;
        this.MESSAGING    = UI_ENUMS.MESSAGING;
        this.MODAL        = UI_ENUMS.MODAL;
        this.DIALOG       = UI_ENUMS.DIALOG;



        this.SanitizeService           = SanitizeService;
        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.JobChecklistStateService  = JobChecklistStateService;
        this.ModalService              = ModalService;
        this.PopoverService            = PopoverService;
        this.DialogService             = DialogService;

        this.isReview                  = this.JobChecklistStateService.isReview;
        this.s3Bucket                  = `${S3_CONFIG.S3_BUCKET_NAME_PREFIX}-rating-company`; //TODO DRY
    }

    $onInit () {
        return this.$q((resolve, reject) => {
            this
                .JobChecklistStateService
                .getChecklistItemResponse(this.itemId, this.itemCategory, this.itemCategoryProgress)
                .then(response => {
                    this.response        = response.Response;
                    this.responseHouseId = response.ResponseHouseId;
                    this.comments        = response.Comments;
                    this.itemData        = response.ItemData;

                    this.showResponseButtons = (!this.isReview && (this.responseHouseId === undefined || this.responseHouseId === parseInt(this.$stateParams.houseId, 10)));

                    return this.DisplayLogicDigestService.get(this.itemId);
                })
                .then(display => {
                    this.display = display;

                    this.responseButtons = this.getResponseOptions();

                    resolve({'status' : 'success'});
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getHvacUrls(arr) {
      return arr.map((hvac) => {
        return this.getHvacUrl(hvac);
      })
    }

    getHvacUrl(hvac) {
      return 'https://s3.amazonaws.com/' + this.s3Bucket + '/' + hvac.Key;
    }

    downloadSingleHvac(e) {
      try {
        this.$http.get(e.target.dataset['hvacurl']).then((arraybuffer) => {
            FileSaver.saveAs(e.target.dataset['hvacurl'], e.target.attributes['download'].nodeValue);
        }).catch((err) => {
          this
              .DialogService
              .openDialog('dialog-hvac-error')
        })
      } catch (err) {
        this
            .DialogService
            .openDialog('dialog-hvac-error')
      }
    }

    downloadAllHvacs(hvacs) {
      let zip = new JSZip();
      let urls = this.getHvacUrls(hvacs);

      Promise.all(urls.map((url) => {
        return this.$http.get(url, { responseType: 'arraybuffer' })
      }))
        .then((files) => {
          files.map((res, index) => {
            return zip.file(hvacs[index].Name, res.data);
          })
          zip.generateAsync({type:"blob"}).then((content) => {
              FileSaver.saveAs(content, "HvacReports.zip");
          });
        })
        .catch((err) => {
          this
              .DialogService
              .openDialog('dialog-hvac-error')
        })
    }

    onEditResponse () {
        this.showResponseButtons = true;
    }

    getResponseOptions () {
        let responseOptions = [];
        let key;

        for (key in this.RESPONSES) {
            if (this.display.ResponseOptions[this.RESPONSES[key].Key]) {
                responseOptions.push(this.RESPONSES[key]);
            }
        }

        return responseOptions;
    }

    onSetResponse (Response) {
        if (this.response !== undefined && this.response[0] === this.RESPONSES.MustCorrect.Key && Response[0] === this.RESPONSES.RaterVerified.Key) {
            this
                .PopoverService
                .openPopover(this.itemId.replace(/\s/g, '_'))
                .catch((error) => {
                    this.$log.log(error);
                });
        }

        this.response = Response;

        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_RESPONSE, {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Response'         : Response
        });
    }

    setItemData (ItemData) {
        this.$rootScope.$emit(this.MESSAGING.UPDATE_CHECKLIST_ITEM_DATA, {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'ItemData'         : ItemData
        });
    }

    postComment (Comment) {
        this.$rootScope.$emit(this.MESSAGING.POST_COMMENT, {
            'ItemId'           : this.itemId,
            'Category'         : this.itemCategory,
            'CategoryProgress' : this.itemCategoryProgress,
            'Comment'          : Comment
        });
    }

    get hasFootnote () {
        return this.display !== undefined && this.display.Footnotes.length > 0;
    }

    showFootnote () {
        this.$rootScope.$emit(this.MESSAGING.SHOW_FOOTNOTE, {
            'item'     : this.display.Item,
            'title'    : this.display.Shorthand,
            'footnote' : this.display.Footnotes
        });
    }
}

export default ChecklistItemClass;
