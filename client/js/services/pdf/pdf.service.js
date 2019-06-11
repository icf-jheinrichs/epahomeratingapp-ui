import PDFMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import * as util from './pdf.util.js';
import { BASE_IMAGE_URL, BASE_S3_URL } from '../../epahomeratingapp.config';


const getDataUri = (url) => {
  return new Promise((res, rej) => {
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
        canvas.getContext('2d').drawImage(this, 0, 0);
        res(canvas.toDataURL('image/png'));
    };
    image.onerror = function() {
      this.src = '/img/imageMissing.png';
    }
    image.src = url;
  })
}

class Comment {
    constructor (photoUrl = '', comment = '', timestamp = '', username = '') { // eslint-disable-line no-empty-function
        this.photoUrl         = _isEmpty(photoUrl) ? '' : BASE_S3_URL + photoUrl;
        this.comment          = comment;
        this.timestamp        = timestamp;
        this.username         = username;
        // this.cordovaFile      = cordovaFile;
        this.photoUri         = '';
    }
    getPhotoUri () {
      return new Promise((res, rej) => {
          if (_isEmpty(this.photoUrl)) {
              res(this);
          } else {
            getDataUri(this.photoUrl)
              .then((dataUri) => {
                this.photoUri = dataUri;
                res(this);
              })
          }
      });
  }
}

class ChecklistItem {
    constructor (id = '', houseId = '', comments = [], response = 'MustCorrect', detail = 'TBD', category = '', stage = '') {
        this.id       = id;
        this.houseId  = houseId;
        // @type Comment[] this.comments
        this.comments = comments;
        this.response = response;
        this.detail   = detail;
        this.category = category;
        this.stage = stage;
    }

    getCommentPhotoDataUri() {
      return Promise.all(this.comments.map((comment) => {
          return comment.getPhotoUri();
      }))
          .then((commentsOutput) => {
              this.comments = commentsOutput;
              return this;
          });
    }
}


const MAX_MUST_CORRECTS = 100;


class PDFService {
    constructor ($q, $log, $stateParams, DisplayLogicDigestService, JobDataResponseService, JobChecklistStateService, AuthorizationService, UserCompanyService, AuthenticationService) {
        'ngInject';

        this.$q = $q;
        this.$log = $log;
        this.$stateParams = $stateParams;
        this.JobDataResponseService = JobDataResponseService;
        this.JobChecklistStateService = JobChecklistStateService;
        this.DisplayLogicDigestService = DisplayLogicDigestService;
        this.AuthorizationService = AuthorizationService;
        this.UserCompanyService = UserCompanyService;
        this.AuthenticationService = AuthenticationService;
        this.pdfInputs = util.EMPTY_PDF_INPUTS;
    }

    getHouseImages() {
      return this.$q((resolve, reject) => {
          let job = this.JobChecklistStateService.getJob();
          let houses = this.JobChecklistStateService.getJobHouses();
          let house = houses[job.Primary.HouseId];
          let preRes = [],
              postRes = {
                front: '',
                back: '',
                left: '',
                right: ''
              };
          for(let i = 0; i < 4; i++) {
            if(!_isEmpty(house.Photo[i])) {
              preRes[i] = BASE_S3_URL + house.Photo[i];
            } else {
              preRes[i] = null
            }
          }
          (_isEmpty(preRes[0]) ? this.$q((res,rej) => {res(null)}) : getDataUri(preRes[0]))
            .then((front) => {
              postRes.front = _isEmpty(front) ? null : front;
              return (_isEmpty(preRes[1]) ? this.$q((res,rej) => {res(null)}) : getDataUri(preRes[1]));
            })
            .then((back) => {
              postRes.back = _isEmpty(back) ? null : back;
              return (_isEmpty(preRes[2]) ? this.$q((res,rej) => {res(null)}) : getDataUri(preRes[2]));
            })
            .then((left) => {
              postRes.left = _isEmpty(left) ? null : left;
              return (_isEmpty(preRes[3]) ? this.$q((res,rej) => {res(null)}) : getDataUri(preRes[3]));
            })
            .then((right) => {
              postRes.right = _isEmpty(right) ? null : right;
              resolve(postRes)
            })
      });
    }

    generateBuilderNotification() {
      return this.$q((res, rej) => {
        this.getHouseImages()
        // .then((houseImagesArray) => {
        //   return Promise.all(houseImagesArray.map((houseUrl) => {
        //       return getDataUri(houseUrl);
        //   }));
        // })
        .then((houseImages) => {
          const user    = this.AuthenticationService.getUser();
          const job     = this.JobChecklistStateService.getJob();
          const house   = this.JobChecklistStateService.getHouse(job.Primary.HouseId);
          const hpd     = this.JobChecklistStateService.jobDataHomePerformance[this.JobChecklistStateService.currentHouse.HouseId];
          const ai      = house.AddressInformation;
          console.warn('ai', ai);

          const address = _isEmpty(ai.Address1) ? '' : ai.Address1;
          const city    = _isEmpty(ai.CityMunicipality) ? '' : ai.CityMunicipality;
          const state   = _isEmpty(ai.StateCode) ? '' : ai.StateCode;
          const zipcode = _isEmpty(ai.ZipCode) ? '' : ai.ZipCode;

          this.pdfInputs.otherHomes = [];
          job.Secondary.map((house) => {
            console.warn('house secondary', house);
            let oai = house.AddressInformation;
            let otherHome = {
              houseId: house.HouseId,
              address: {
                communityName : oai.CommunityName,
                streetAddress : (_isEmpty(oai.Address1) ? '' : oai.Address1) + ', ' + (_isEmpty(oai.CityMunicipality) ? '' : oai.CityMunicipality) + ', ' + (_isEmpty(ai.StateCode) ? '' : ai.StateCode),
                lotNo         : oai.LotNo,
                manualid      : oai.ManualId,
              }
            };
            this.pdfInputs.otherHomes.push(otherHome);
          })

          this.pdfInputs.houseId                  = job.Primary.HouseId;
          this.pdfInputs.rater.name               = `${user.firstName} ${user.lastName}`;
          this.pdfInputs.rater.email              = user.email;
          this.pdfInputs.builder.name             = house.Builder;
          this.pdfInputs.house.model              = _isEmpty(house.HousePlan.Name) ? '' : house.HousePlan.Name;
          this.pdfInputs.address.lotNo            = _isEmpty(ai.LotNo) ? '' : ai.LotNo;

          this.pdfInputs.address.manualid = _isEmpty(ai.ManualId) ? '' : ai.ManualId;
          this.pdfInputs.address.streetAddress    = (_isEmpty(address) && _isEmpty(city) && _isEmpty(state) && _isEmpty(zipcode) ? '' : `${address}, ${city}, ${state} ${zipcode}`);
          this.pdfInputs.address.communityName = ai.CommunityName;
          this.pdfInputs.general.inspectionDate   = moment(job.History[job.History.length - 1].DateTime).format('MMM Do YYYY h:mm a');
          this.pdfInputs.general.createdDate      = `${moment().format('MM/DD/YYYY')}`;
          this.pdfInputs.house.type               = (_isEmpty(hpd.ChecklistItems['BE 1'].BuildingSummary[0].ResidentialFacilityType))
              ? ''
              : hpd.ChecklistItems['BE 1'].BuildingSummary[0].ResidentialFacilityType;
          this.pdfInputs.house.foundation = (_isEmpty(hpd.ChecklistItems['BE 2'].Foundation[0].FoundationType))
              ? ''
              : hpd.ChecklistItems['BE 2'].Foundation[0].FoundationType;
          this.pdfInputs.house.sqFootage = (_isEmpty(hpd.ChecklistItems['BE 1'].BuildingSummary.ConditionedFloorArea))
              ? ''
              : hpd.ChecklistItems['BE 1'].BuildingSummary[0].ConditionedFloorArea;

          this.pdfInputs.address.merged  =  _isEmpty(this.pdfInputs.address.streetAddress) ? '' : this.pdfInputs.address.streetAddress + '\n';
          this.pdfInputs.address.merged +=  _isEmpty(this.pdfInputs.address.communityName) ? '' : this.pdfInputs.address.communityName + (!_isEmpty(this.pdfInputs.address.lotNo ? ', ' : ''));
          this.pdfInputs.address.merged +=  _isEmpty(this.pdfInputs.address.lotNo) ? '' : 'Lot ' + this.pdfInputs.address.lotNo + '\n';
          this.pdfInputs.address.merged +=  _isEmpty(this.pdfInputs.general.manualIdentifier) ? '' : this.pdfInputs.general.manualIdentifier + '\n';

          this.pdfInputs.images = houseImages;

          // this.pdfInputs.images = (_isEmpty(houseImages)) ? {} : {
          //   front: (_isEmpty(houseImages[0]) ? null : houseImages[0]),
          //   back: (_isEmpty(houseImages[1]) ? null : houseImages[1]),
          //   left: (_isEmpty(houseImages[2]) ? null : houseImages[2]),
          //   right: (_isEmpty(houseImages[3]) ? null : houseImages[3])
          // };
          console.warn('HOUSE IMAGES', houseImages, this.pdfInputs.images);

          return this.$q.all({
              company : this.UserCompanyService.getCompany(
                  this.AuthorizationService.getCurrentOrganizationId()
              ),
              digest  : this.DisplayLogicDigestService.digest
          });
        })
        .then((response) => {
          const company = response.company,
                digest = response.digest.data;

          this.pdfInputs.general.ratingOrganization = (_isEmpty(company.Name) ? '<No Name>' : company.Name);


          return this.$q((res, rej) => {
            const checklistItems = this.JobChecklistStateService.getCheckListElementsForArchivalReport();

            this.$log.log('Checklist Items: ', checklistItems, MAX_MUST_CORRECTS);
            if (checklistItems.length > MAX_MUST_CORRECTS) {
                // null[]
                res(new Array(MAX_MUST_CORRECTS + 1));
            } else {
              res(checklistItems.map((checklistItem) => {
                  // const $cordovaFile = this.$cordovaFile;
                  // const dataDirectory = cordova.file.dataDirectory;
                  const _checklistItem = new ChecklistItem(
                      checklistItem.element,
                      checklistItem.ResponseHouseId,
                      checklistItem.Comments.map((comment) => {
                          this.$log.log('Comment ', comment);
                          return new Comment(
                              comment.PhotoUrl,
                              comment.Comment,
                              comment.Timestamp,
                              `${comment.User.firstName} ${comment.User.lastName}`,
                          );
                      }),
                      checklistItem.Response[0],
                      ((id, digest) => {
                          const detail = digest.ChecklistItems[id].Shorthand;
                          this.$log.log(`Details for element ${checklistItem.element} ${detail}`);
                          return detail;
                      })(checklistItem.element, digest),
                      checklistItem.category,
                      checklistItem.stage
                  );
                  return _checklistItem;
              }));
              }
          })
        })
        .then((checklistItems) => {
          this.$log.log('CHECKLIST ITEMS pre-promise', checklistItems);
          return this.$q.all(checklistItems.map(checklistItem => {
              return checklistItem.getCommentPhotoDataUri();
          }));
        })
        .then((checklistItems) => {
          this.pdfInputs.checklist = checklistItems;
          return this.JobChecklistStateService.getPdfInfo();
        })
        .then((archiveInfo) => {
          this.pdfInputs.archive = archiveInfo;
          return getDataUri('/img/logo-raterpro.png');
        })
        .then((logo) => {
          this.pdfInputs.logo = logo;
          return getDataUri('/img/comment-icon.png');
        })
        .then((commentIcon) => {
          this.pdfInputs.icons.comment = commentIcon;
          return getDataUri('/img/mustCorrect.png');
        })
        .then((correctIcon) => {
          this.pdfInputs.icons.correct = correctIcon;
          return getDataUri('/img/mustVerify.png');
        })
        .then((verifyIcon) => {
          this.pdfInputs.icons.verify = verifyIcon;
        })
        .then(() => {
          // generate PDF here.
          console.warn('this inputs', this.pdfInputs);
          const pdf = PDFService.getArchivalReport(this.pdfInputs);
          // this.$log.log('PDF Inputs: ', JSON.stringify(this.pdfInputs));
          this.$log.log('Generated PDF: ', JSON.stringify(pdf));

          PDFMake.vfs = pdfFonts.pdfMake.vfs;
          const pdfDocGenerator = PDFMake.createPdf(pdf);

          pdfDocGenerator.download();

          this.$log.log('Generated PDF: ', pdfDocGenerator);
          // pdfDocGenerator.getBuffer((blob) => {
          //     this.$log.log('Returned Buffer object: ', blob);
          //     resolve({
          //         blob     : blob,
          //         buffer   : new Uint8Array(blob).buffer,
          //         subject  : `RaterPRO Builder Inspection Report for ${this.pdfInputs.address.streetAddress}`,
          //         bodyText : `Hello, \n\n This is the RaterPRO Builder Inspection Report for ${this.pdfInputs.address.streetAddress}`,
          //     });
          // });
        })
      })

    }

    static getArchivalReport(inputs = EMPTY_PDF_INPUTS) {
        const WIDTHS = [225, 225];
        let res = {
          content : [
              util.PageHeader({ logo: inputs.logo, createdDate: inputs.general.createdDate }),
              util.generateLineBreak({ type: "thick" }),
              util.Header({
                home: inputs.address,
                builder: inputs.builder.name,
                ratingOrg: inputs.general.ratingOrganization,
                rater: inputs.rater.name,
                otherHomes: inputs.otherHomes
              }),
              util.HeaderDescription({ icons: inputs.icons }),
              util.SectionHeader({ text: "Home Details" }),
              util.HomeDetails({ home: inputs.archive.home }),
              util.HouseImages({ images: inputs.images }),
              util.SectionHeader({ text: "Utility Meters and Equipment" }),
              util.Utility({utility: inputs.archive.utility }),
              util.SectionHeader({ text: "Minimum Rated Features" }),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'hers', icons: inputs.icons, category: 'Walls'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'hers', icons: inputs.icons, category: 'CeilingsRoofs'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'hers', icons: inputs.icons, category: 'FoundationFloors'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'hers', icons: inputs.icons, category: 'Tests'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'hers', icons: inputs.icons, category: 'HvacWater'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'hers', icons: inputs.icons, category: 'PlugLoadsLightingPv'}),
              util.SectionHeader({ text: "ENERGYSTAR Rater Field Checklist" }),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'energy-star', icons: inputs.icons, category: 'Walls'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'energy-star', icons: inputs.icons, category: 'CeilingsRoofs'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'energy-star', icons: inputs.icons, category: 'FoundationFloors'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'energy-star', icons: inputs.icons, category: 'Tests'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'energy-star', icons: inputs.icons, category: 'HvacWater'}),
              util.ChecklistList({checklist: inputs.archive.checklist, ratingType: 'energy-star', icons: inputs.icons, category: 'PlugLoadsLightingPv'}),
              util.SectionHeader({ text: "Comments and Photos" }),
              ...inputs.checklist.map(checklist => {
                return [util.ChecklistItem({ checklist: checklist, icons: inputs.icons }), util.Comments({ comments: checklist.comments, checklist: checklist, otherHomes: inputs.otherHomes, houseId: inputs.houseId, address: inputs.address, icons: inputs.icons })]
              }),
              util.SectionHeader({ text: "Job History" }),
              util.JobHistory({ history: inputs.archive.history })
          ],
          pageBreakBefore : function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
            if(currentNode.headlineLevel !== 1 && ((previousNodesOnPage.length > 0 && currentNode.pageNumbers.length > 1  && currentNode.stack !== true) || (currentNode.headlineLevel == 2 && followingNodesOnPage.length <= 4)  || (currentNode.headlineLevel == 3 && followingNodesOnPage.length <= 6))) {
              console.warn('poop', currentNode);
            }
              /*
              CONDITIONS:
                {currentNode.stack !== true}
                  - Disregard some pdfmake generated invisible nodes
                {currentNode.pageNumbers.length > 1}
                  - If node span across more than 1 page
                {currentNode.headlineLevel !== 1}
                  - Disregard higher level nodes
                {previousNodesOnPage.length > 0}
                  - Prevent blank pages
              */
              return currentNode.headlineLevel !== 1 && ((previousNodesOnPage.length > 0 && currentNode.pageNumbers.length > 1  && currentNode.stack !== true) || (currentNode.headlineLevel == 2 && followingNodesOnPage.length <= 4)  || (currentNode.headlineLevel == 3 && followingNodesOnPage.length <= 6));
          },
          styles  : util.Styles,
          defaultStyle : {
              columnGap : 20,
              border    : [false, false, false, false],
              fontSize  : 10
          },
          footer: function (currentPage, pageCount) {
            return {
               text: 'Page ' + currentPage + ' of ' + pageCount,
               alignment: 'right',
               margin: [0,0,40,0]
            }
          }
      };
      return res;
    }

}

export default PDFService;
