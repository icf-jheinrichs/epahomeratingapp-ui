import _find from 'lodash/find';
import xmlToJSON from 'xmlToJSON';

class JobDetailLocationController {
    constructor (UI_ENUMS, $scope, $timeout) {
        'ngInject';

        this.ratingTypeOptions = UI_ENUMS.RATING_TYPES;
        this.selectHousePlanEnabled = true;
        this.showDetails = 'HousePlanLibrary';

        this.$scope = $scope;
        this.$timeout = $timeout;
    }

    libraryHousePlanOnSelect () {
        // auto pop builder name
        if (this.location.HousePlan.length === 0) {
            return;
        }

        let self = this;
        let selectedHousePlan = _find(this.housePlans.housePlan, function compare (o) {
            return o._id === self.location.HousePlan[0]._id;
        });

        this.location.Builder                             = selectedHousePlan.BuilderName;
        this.location.AddressInformation.CommunityName    = selectedHousePlan.CommunityName;
        this.location.AddressInformation.Address1         = selectedHousePlan.StreetAddress;
        this.location.AddressInformation.CityMunicipality = selectedHousePlan.City;
        this.location.AddressInformation.StateCode        = selectedHousePlan.State;
        this.location.AddressInformation.ZipCode          = selectedHousePlan.ZipCode;
    }

    localHousePlanOnSelect () {
        let self = this;

        this.$timeout(function waitFormRender () {
            if (self.location.HousePlan[0] instanceof File) {

                let reader = new FileReader();
                reader.readAsText(self.location.HousePlan[0]);

                reader.onloadend = function readXMLSuccess () {
                    let remJSON = xmlToJSON.parseString(reader.result, {childrenAsArray : false});

                    self.location.Builder                             = remJSON.buildingfile.building.projectinfo.buildername._text || '';
                    self.location.AddressInformation.CommunityName    = remJSON.buildingfile.building.projectinfo.developmentname._text || '';
                    self.location.AddressInformation.Address1         = remJSON.buildingfile.building.projectinfo.propertyaddress._text || '';
                    self.location.AddressInformation.CityMunicipality = remJSON.buildingfile.building.projectinfo.propertycity._text || '';
                    self.location.AddressInformation.StateCode        = remJSON.buildingfile.building.projectinfo.propertystate._text || '';
                    self.location.AddressInformation.ZipCode          = remJSON.buildingfile.building.projectinfo.propertyzip._text || '';

                    self.$scope.$apply();
                };
            }
        });
    }
}

export default JobDetailLocationController;
