import _defer from 'lodash/defer';

let _forEach   = require('lodash/forEach');
let _findIndex = require('lodash/findIndex');
let JSZip      = require('jszip');
let FileSaver  = require('file-saver');

class JobsPage {
    constructor ($http, $q, $state, $stateParams, AuthorizationService, DialogService, JobsService, UserCompanyService, UI_ENUMS) {
        'ngInject';

        this.$http                = $http;
        this.$q                   = $q;
        this.$state               = $state;
        this.$stateParams         = $stateParams;
        this.AuthorizationService = AuthorizationService;
        this.DialogService        = DialogService;
        this.JobsService          = JobsService;
        this.UserCompanyService   = UserCompanyService;

        this.DIALOG               = UI_ENUMS.DIALOG;
        this.JOB_STATUS           = UI_ENUMS.JOB_STATUS;
        this.STATE_NAME           = UI_ENUMS.STATE_NAME;
    }

    $onInit () {
        this.checkAll                 = false;
        this.bulkOperationsAreEnabled = false;

        this.userRole                 = this.AuthorizationService.getUserRole();
    }

    generateFileName (job) {
        let housePlanName = job.Primary.HousePlan[0].Name;
        let addressObj    = job.Primary.AddressInformation;
        let address       = `${addressObj.Address1}${addressObj.CityMunicipality}${addressObj.StateCode}${addressObj.ZipCode}`;

        housePlanName     = housePlanName.replace(/[^\w\s]/gi, '-');
        address           = address.replace(/[^\w\s]/gi, '-');

        return `${housePlanName}${address}`;
    }

    downloadXml (jobId) {
        const jobIndex = _findIndex(this.jobs, {_id : jobId});
        let self       = this;
        let zip             = new JSZip();
        let zipFilename     = 'ExportedXML.zip';

        let downloadJobs    = [{
            id          : jobId,
            fileName    : this.jobs[jobIndex].Primary.ExportFilename || this.generateFileName(this.jobs[jobIndex]),
            fileNameDup : 0
        }];

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

        sequence
            .then(() => {
                self.downloadingRem = false;
                _defer(function afterDigest () {
                    self.$scope.$apply();
                });
                return zip.generateAsync({type : 'Blob'});
            })
            .then((base64) => {
                FileSaver.saveAs(base64, zipFilename);
            });
    }

    bulkDownload () {
        const markedJobs    = this.jobsHandlers.getSelectedJobs();
        let downloadJobs    = [];
        let self            = this;
        let zip             = new JSZip();
        let zipFilename     = 'ExportedXML.zip';

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

        markedJobs.forEach((index) => {
            let exportFileName = this.jobs[index].Primary.ExportFilename;
            if (exportFileName === '' || exportFileName === undefined) {
                exportFileName = this.generateFileName(this.jobs[index]);
            }
            downloadJobs.push({
                id          : this.jobs[index]._id,
                fileName    : exportFileName,
                fileNameDup : getNumOfDupFiles(exportFileName)
            });
        });

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

        sequence
            .then(() => {
                self.downloadingRem = false;
                _defer(function afterDigest () {
                    self.$scope.$apply();
                });
                return zip.generateAsync({type : 'Blob'});
            })
            .then((base64) => {
                FileSaver.saveAs(base64, zipFilename);
            });
    }

    setBulkOperationStatus (status) {
        this.bulkOperationsAreEnabled = status;

        if (this.checkAll && !this.bulkOperationsAreEnabled) {
            this.checkAll = false;
        }
    }

    toggleAllJobs () {
        this
            .jobsHandlers
            .toggleAllJobs(this.checkAll);
    }

    registerHandlers (toggleAllJobs, getSelectedJobs) {
        this.jobsHandlers = {
            toggleAllJobs,
            getSelectedJobs
        };
    }
}

export default JobsPage;
