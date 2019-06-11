/* global File, FileReader */

import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import xmlToJSON from 'xmltojson';

class JobDetailLocationController {
    constructor (UI_ENUMS, $scope, $timeout, S3_CONFIG) {
        'ngInject';

        this.ratingTypeOptions      = UI_ENUMS.RATING_TYPES;
        this.showDetails            = 'HousePlanLibrary';
        this.showFileDetails        = 'File';

        this.$scope                 = $scope;
        this.$timeout               = $timeout;
        this.s3Bucket               = `${S3_CONFIG.S3_BUCKET_NAME_PREFIX}-rating-company`;
    }

    $onInit () {
        this.gatherReports();
    }

    //might not need
    generateHvacFileLinks (files) {
      return files.map((file) => {
        return 'https://s3.amazonaws.com/' + this.s3Bucket + '/' + file.Key;
      })
    }

    gatherReports () {
        let hvacDesignReports           = [];
        let raterDesignReviewChecklists = [];

        this.location.HousePlan.forEach((housePlan) => {
            let locationHousePlan = _find(this.housePlans.housePlan, {_id : housePlan._id});

            //Skip house plans uploaded from computer
            if (locationHousePlan === undefined) {
                return;
            }

            if (locationHousePlan.HvacDesignReport && locationHousePlan.HvacDesignReport.length > 0) {
                hvacDesignReports.push(...locationHousePlan.HvacDesignReport);
            }
            if (locationHousePlan.RaterDesignReviewChecklist && locationHousePlan.RaterDesignReviewChecklist.length > 0) {
                raterDesignReviewChecklists.push(...locationHousePlan.RaterDesignReviewChecklist);
            }
        });

        this.housePlansHVACDesignReports           = hvacDesignReports;
        this.housePlansRaterDesignReviewChecklists = raterDesignReviewChecklists;
    }

    libraryHousePlanOnSelect () {
        // auto pop builder name
        if (this.location.HousePlan.length === 0) {
            return;
        }

        const selectedHousePlan = _find(this.housePlans.housePlan, (o) => {
            return o._id === this.location.HousePlan[0]._id;
        });

        if (selectedHousePlan !== undefined) {
            this.location.Builder                             = _isEmpty(selectedHousePlan.BuilderName) ? '' : selectedHousePlan.BuilderName;
            this.location.AddressInformation.CommunityName    = _isEmpty(selectedHousePlan.CommunityName) ? '' : selectedHousePlan.CommunityName;
            this.location.AddressInformation.Address1         = _isEmpty(selectedHousePlan.StreetAddress) ? '' : selectedHousePlan.StreetAddress;
            this.location.AddressInformation.CityMunicipality = _isEmpty(selectedHousePlan.City) ? '' : selectedHousePlan.City;
            this.location.AddressInformation.StateCode        = _isEmpty(selectedHousePlan.State) ? '' : selectedHousePlan.State;
            this.location.AddressInformation.ZipCode          = _isEmpty(selectedHousePlan.ZipCode) ? '' : selectedHousePlan.ZipCode;
            this.location.HvacDesignReport                    = _isEmpty(selectedHousePlan.HvacDesignReport) ? [] : selectedHousePlan.HvacDesignReport;
            this.location.RaterDesignReviewChecklist          = _isEmpty(selectedHousePlan.RaterDesignReviewChecklist) ? [] : selectedHousePlan.RaterDesignReviewChecklist;
        }

        this.gatherReports();
    }

    localHousePlanOnSelect () {
        let self = this;

        this.$timeout(function waitFormRender () {
            if (self.location.HousePlan[0] instanceof File) {

                let reader = new FileReader();
                reader.readAsText(self.location.HousePlan[0]);

                reader.onloadend = function readXMLSuccess () {
                    let remJSON = xmlToJSON.parseString(reader.result, {childrenAsArray : false});

                    self.location.Builder                             = _isEmpty(remJSON.buildingfile.building.projectinfo.buildername._text) ? '' : remJSON.buildingfile.building.projectinfo.buildername._text;
                    self.location.AddressInformation.CommunityName    = _isEmpty(remJSON.buildingfile.building.projectinfo.developmentname._text) ? '' : remJSON.buildingfile.building.projectinfo.developmentname._text;
                    self.location.AddressInformation.Address1         = _isEmpty(remJSON.buildingfile.building.projectinfo.propertyaddress._text) ? '' : remJSON.buildingfile.building.projectinfo.propertyaddress._text;
                    self.location.AddressInformation.CityMunicipality = _isEmpty(remJSON.buildingfile.building.projectinfo.propertycity._text) ? '' : remJSON.buildingfile.building.projectinfo.propertycity._text;
                    self.location.AddressInformation.StateCode        = _isEmpty(remJSON.buildingfile.building.projectinfo.propertystate._text) ? '' : remJSON.buildingfile.building.projectinfo.propertystate._text;
                    self.location.AddressInformation.ZipCode          = remJSON.buildingfile.building.projectinfo.propertyzip._text === null ? '' : remJSON.buildingfile.building.projectinfo.propertyzip._text;
                    self.location.HvacDesignReport                    = [];
                    self.location.RaterDesignReviewChecklist          = [];

                    self.$scope.$apply();
                };
            }
        });
    }
}

export default JobDetailLocationController;
