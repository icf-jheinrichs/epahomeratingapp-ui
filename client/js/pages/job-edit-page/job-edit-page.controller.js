const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

const SUCCESS = {
    type        : 'success',
    text        : 'Job Edited.',
    dismissable : false
};

const HOUSE_PLAN_REQUIRED = {
    type        : 'error',
    text        : 'Please add a Rating File to all samples.',
    dismissable : false
};

class JobsEditPageController {
    constructor ($q,
        $state,
        AuthenticationService,
        FileUtilityService,
        JobHistoryService,
        JobsService,
        S3Service,
        S3_CONFIG,
        UI_ENUMS
    ) {
        'ngInject';

        this.$q          = $q;
        this.$state      = $state;

        this.AuthenticationService = AuthenticationService;
        this.FileUtilityService    = FileUtilityService;
        this.JobHistoryService     = JobHistoryService;
        this.JobsService           = JobsService;
        this.S3Service             = S3Service;

        this.PDF_FILE_PATH = S3_CONFIG.PATH_PDF;
        this.HISTORY = {
            CATEGORIES    : UI_ENUMS.HISTORY_CATEGORIES,
            SUBCATEGORIES : UI_ENUMS.HISTORY_SUBCATEGORIES
        };
    }

    $onInit () {
        this.message = {};
    }

    housePlansAreValid (job) {
        let housePlansValid = true;

        if (job.Primary.HousePlan.length < 1) {
            housePlansValid = false;
        }

        job.Secondary.forEach((location) => {
            if (location.HousePlan.length < 1) {
                housePlansValid = false;
            }
        });

        return housePlansValid;
    }

    updateJobFileData (results, job) {
        results.forEach((result) => {
            if (this.jobFileMap[result.data.request.token]) {
                const map      = this.jobFileMap[result.data.request.token];

                const fileName = result.data.request.fileName;
                const key      = result.data.s3Response.key;

                if (map.type === 'Primary') {
                    job[map.type][map.fileType][map.fileIndex] = {
                        Name : fileName,
                        Key  : key
                    };
                } else {
                    job[map.type][map.index][map.fileType][map.fileIndex] = {
                        Name : fileName,
                        Key  : key
                    };
                }
            }
        });
    }

    submitJob (job) {
        this.message = {};

        if (this.isBusy) {
            return;
        }

        if (this.housePlansAreValid(job)) {
            this.isBusy = true;

            const jobFileMeta = this.FileUtilityService.gatherJobFiles(job);

            let jobFiles    = jobFileMeta.jobFiles;
            this.jobFileMap = jobFileMeta.jobFileMap;
            let fileUploads = [];

            jobFiles.forEach((file) => {
                fileUploads.push(this.S3Service.upload(this.PDF_FILE_PATH, file.file, file.token));
            });

            this
                .$q
                .all(fileUploads)
                .then((results) => {
                    const now  = new Date();
                    const user = this.AuthenticationService.getUserInfo();

                    this.updateJobFileData(results, job);

                    job.History.push(this.JobHistoryService.serializeHistoryRecord({
                        DateTime        : now.toUTCString(),
                        Category        : this.HISTORY.CATEGORIES.MANAGE,
                        Subcategory     : this.HISTORY.SUBCATEGORIES.MANAGE.UPDATED,
                        UserId          : user.userId,
                        UserName        : `${user.firstName} ${user.lastName}`,
                        LatLongAccuracy : undefined
                    }));

                    return this.JobsService.put(job);
                })
                .then(response => {
                    this.message = Object.assign({}, SUCCESS);
                    window.history.back();
                })
                .catch(error => {
                    this.message = Object.assign({}, ERROR_SERVER);
                })
                .finally(() => {
                    this.isBusy = false;
                });
        } else {
            this.message = Object.assign({}, HOUSE_PLAN_REQUIRED);
        }
    }
}

export default JobsEditPageController;
