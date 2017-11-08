import _defer from 'lodash/defer';

let _forEach   = require('lodash/forEach');
let JSZip      = require('jszip');
let FileSaver  = require('file-saver');

class JobsController {
    constructor (CONTEXT, UI_ENUMS, $window, $scope, $state, $http, $rootScope, JobsService) {
        'ngInject';

        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;

        this.JobsService = JobsService;
        this.$http       = $http;
        this.$state      = $state;
        this.$scope      = $scope;
        this.$rootScope  = $rootScope;
        this.JOB_STATUS  = UI_ENUMS.JOB_STATUS;
        this.MESSAGING   = UI_ENUMS.MESSAGING;

        this.checkAll   = false;
        this.markedJobs = [];

        this.downloadingRem = false;
    }

    $onInit () {
        this.filterCriteria = 'Jobs';

        for (let i = 0; i < this.jobs.length; i++) {
            this.markedJobs.push(false);
        }
    }

    generateFileName (job) {
        let housePlanName = job.Primary.HousePlan[0].Name;
        let addressObj    = job.Primary.AddressInformation;
        let address       = `${addressObj.Address1}${addressObj.CityMunicipality}${addressObj.StateCode}${addressObj.ZipCode}`;

        housePlanName = housePlanName.replace(/[^\w\s]/gi, '-');
        address       = address.replace(/[^\w\s]/gi, '-');
        return `${housePlanName}${address}`;
    }

    bulkDownload () {
        let downloadJobs = [];
        let self = this;
        let zip = new JSZip();
        let zipFilename = 'ExportedXML.zip';

        this.downloadingRem = true;

        function getNumOfDupFiles (exportFileName) {
            let numOfDup = 0;
            _forEach(downloadJobs, (job) => {
                if (job.fileName === exportFileName) {
                    numOfDup++;
                }
            });
            return numOfDup;
        }

        for (let i = 0; i < this.markedJobs.length; i++) {
            if (this.markedJobs[i] === true) {
                let exportFileName = this.jobs[i].Primary.ExportFilename;
                if (exportFileName === '' || exportFileName === undefined) {
                    exportFileName = this.generateFileName(this.jobs[i]);
                }
                downloadJobs.push({
                    id          : this.jobs[i]._id,
                    fileName    : exportFileName,
                    fileNameDup : getNumOfDupFiles(exportFileName)
                });
            }
        }

        // download the files async to get rid of the same export-file-name issue
        // rem-xml-outbound service save the exported name to S3, same file name will overwrite
        // TODO - This might need server change?
        let sequence = Promise.resolve();

        downloadJobs.forEach(function downloadJob (downloadJob) {
            sequence = sequence
                .then(() => {
                    return self.JobsService.getExportSignedUrl(downloadJob.id);
                })
                .then((url) => {
                    let config = {
                        method  : 'GET',
                        url     : url,
                        headers : {
                            Authorization : 'Remove in Interceptor'
                        }
                    };
                    return self.$http(config);
                })
                .then((response) => {
                    if (downloadJob.fileNameDup !== 0) {
                        downloadJob.fileName = `${downloadJob.fileName} (${downloadJob.fileNameDup})`;
                    }

                    zip.file(downloadJob.fileName + '.xml', response.data, {binary : false});
                });
        });

        sequence.then(() => {
            self.downloadingRem = false;
            _defer(function afterDigest () {
                self.$scope.$apply();
            });
            return zip.generateAsync({type : 'Blob'});
        }).then((base64) => {
            FileSaver.saveAs(base64, zipFilename);
        });
    }

    getSelectedJobs () {
        let changeJobs = [];
        let remainJobs = [];
        for (let i = 0; i < this.markedJobs.length; i++) {
            if (this.markedJobs[i] === true) {
                changeJobs.push(this.jobs[i]);
            } else {
                remainJobs.push(this.jobs[i]);
            }
        }
        return {changeJobs : changeJobs, remainJobs : remainJobs};
    }

    flagForReview () {
        for (let i = 0; i < this.markedJobs.length; i++) {
            if (this.markedJobs[i] === true) {
                let job = this.jobs[i];
                if (job.Status === this.JOB_STATUS.COMPLETED) {
                    job.InternalReview = true;
                    this.JobsService.put(job);
                }
            }
        }

        this.$state.go('jobs');
    }

    submitToProvider () {
        for (let i = 0; i < this.markedJobs.length; i++) {
            if (this.markedJobs[i] === true) {
                let job = this.jobs[i];
                if (job.Status === this.JOB_STATUS.COMPLETED) {
                    // TODO - Pop error message to user
                    job.Status = this.JOB_STATUS.SUBMITTED_TO_PROVIDER;
                    this.JobsService.put(job);
                }
            }
        }

        // TODO - Keep the current tab
        this.$state.go('jobs');
    }

    jobsAreSelected () {
        for (let i = 0; i < this.markedJobs.length; i++) {
            if (this.markedJobs[i] === true) {
                return true;
            }
        }
        return false;
    }

    selectAllJobs () {
        for (let i = 0; i < this.markedJobs.length; i++) {
            this.markedJobs[i] = this.checkAll;
        }
    }
}

export default JobsController;
