
let _forEach   = require('lodash/forEach');
let JSZip      = require('jszip');
let FileSaver  = require('file-saver');

class JobsController {
    constructor (CONTEXT, UI_ENUMS, $http, $window, JobsService) {
        'ngInject';

        this.CONTEXT_IS_ADMIN = CONTEXT === UI_ENUMS.CONTEXT.ADMIN;

        this.JobsService = JobsService;
        this.$window     = $window;
        this.$http       = $http;
        this.JOB_STATUS  = UI_ENUMS.JOB_STATUS;

        this.checkAll   = false;
        this.markedJobs = [];
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
        let getURLPromise = [];
        let zip = new JSZip();
        let zipFilename = 'ExportedXML.zip';

        for (let i = 0; i < this.markedJobs.length; i++) {
            if (this.markedJobs[i] === true) {
                let exportFileName = this.jobs[i].Primary.ExportFilename;
                if (exportFileName === '' || exportFileName === undefined) {
                    exportFileName = this.generateFileName(this.jobs[i]);
                }
                downloadJobs.push({
                    id       : this.jobs[i]._id,
                    fileName : exportFileName
                });
            }
        }

        let downloadPromise = function downloadPromise (jobID, fileName) {
            return new Promise ((resolve, reject) => {
                self.JobsService
                    .getExportSignedUrl(jobID)
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
                        zip.file(fileName + '.xml', response.data, {binary : false});
                        resolve(response.data);
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        };

        _forEach(downloadJobs, function downloadJob (downloadJob) {
            getURLPromise.push(downloadPromise(downloadJob.id, downloadJob.fileName));
        });

        Promise.all(getURLPromise)
            .then((result) => {
                zip.generateAsync({type : 'Blob'})
                    .then(function download (base64) {
                        FileSaver.saveAs(base64, zipFilename);
                    });
            });
    }

    changeStatus (jobs, status) {
        let self = this;
        _forEach (jobs, function updateJob (job) {
            job.Status = status;
            self.JobsService.put(job);
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

    flagForQA () {
        let selectedJobs = this.getSelectedJobs();
        this.changeStatus(selectedJobs.changeJobs, this.JOB_STATUS.INTERNAL_REVIEW);
        this.jobs = selectedJobs.remainJobs;
        this.markedJobs = [];
    }

    submitToProvider () {
        let selectedJobs = this.getSelectedJobs();
        this.changeStatus(selectedJobs.changeJobs, this.JOB_STATUS.SUBMITTED_TO_PROVIDER);
        this.jobs = selectedJobs.remainJobs;
        this.markedJobs = [];
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
