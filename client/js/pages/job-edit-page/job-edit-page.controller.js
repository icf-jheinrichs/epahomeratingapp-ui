/* global File */

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

    /**
     * Check if file is PDF and less than 2 MB
     * @param  {File}      file file to validify
     * @return {Boolean}   validity
     */
    //TODO make DRY
    isValidFile (file) {
        return file.type === 'application/pdf' && ((file.size / 1048576) < 2);
    }

    gatherJobFiles (job) {
        this.jobFileMap = {};
        let jobFiles    = [];

        job.Primary.HvacDesignReport.forEach((hvacDesignReport, index) => {
            if (hvacDesignReport instanceof File && this.isValidFile(hvacDesignReport)) {
                const token = `Primary:0:HvacDesignReport:${hvacDesignReport.name}`;

                jobFiles.push({
                    file  : hvacDesignReport,
                    token : token
                });

                this.jobFileMap[token] = {
                    type      : 'Primary',
                    index     : 0,
                    fileType  : 'HvacDesignReport',
                    fileIndex : index
                };
            }
        });

        job.Primary.RaterDesignReviewChecklist.forEach((raterDesignReviewChecklist, index) => {
            if (raterDesignReviewChecklist instanceof File && this.isValidFile(raterDesignReviewChecklist)) {
                const token = `Primary:0:RaterDesignReviewChecklist:${raterDesignReviewChecklist.name}`;

                jobFiles.push({
                    file  : raterDesignReviewChecklist,
                    token : token
                });

                this.jobFileMap[token] = {
                    type      : 'Primary',
                    index     : 0,
                    fileType  : 'RaterDesignReviewChecklist',
                    fileIndex : index
                };
            }
        });

        job.Secondary.forEach((location, locationIndex) => {
            location.HvacDesignReport.forEach((hvacDesignReport, index) => {
                if (hvacDesignReport instanceof File && this.isValidFile(hvacDesignReport)) {
                    const token = `Secondary:${locationIndex}:HvacDesignReport:${hvacDesignReport.name}`;

                    jobFiles.push({
                        file  : hvacDesignReport,
                        token : token
                    });

                    this.jobFileMap[token] = {
                        type      : 'Secondary',
                        index     : locationIndex,
                        fileType  : 'HvacDesignReport',
                        fileIndex : index
                    };
                }
            });

            location.RaterDesignReviewChecklist.forEach((raterDesignReviewChecklist, index) => {
                if (raterDesignReviewChecklist instanceof File && this.isValidFile(raterDesignReviewChecklist)) {
                    const token = `Secondary:${locationIndex}:RaterDesignReviewChecklist:${raterDesignReviewChecklist.name}`;

                    jobFiles.push({
                        file  : raterDesignReviewChecklist,
                        token : token
                    });

                    this.jobFileMap[token] = {
                        type      : 'Secondary',
                        index     : locationIndex,
                        fileType  : 'RaterDesignReviewChecklist',
                        fileIndex : index
                    };
                }
            });
        });

        return jobFiles;
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

            let jobFiles    = this.gatherJobFiles(job);
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
