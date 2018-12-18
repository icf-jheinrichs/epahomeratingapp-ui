import _find from 'lodash/find';

class RatingCompanyPageController {
    constructor ($log, $q, AuthorizationService, DialogService, UserCompanyService, UI_ENUMS) {
        'ngInject';

        this.$log                 = $log;
        this.$q                   = $q;

        this.AuthorizationService = AuthorizationService;
        this.DialogService        = DialogService;
        this.UserCompanyService   = UserCompanyService;

        this.DIALOG_ADD_PROVIDER_COMPANY    = UI_ENUMS.DIALOG.ADD_PROVIDER_COMPANY;
        this.DIALOG_REMOVE_PROVIDER_COMPANY = UI_ENUMS.DIALOG.REMOVE_PROVIDER_COMPANY;
    }

    $onInit () {
        this.organizationTypes
            = this
                .AuthorizationService
                .getOrganizationTypes();

        this
            .UserCompanyService
            .getCompany(this.AuthorizationService.getCurrentOrganizationId())
            .then((company) => {
                // debugger;
                this.company = company;

                return this
                    .UserCompanyService
                    .getRatingCompanies();
            })
            .then((ratingCompanies) => {
                this.ratingCompanies            = ratingCompanies;
                this.selectedRatingCompanyToAdd = ratingCompanies[0];

                this.relatedRatingCompanys = this.company.RelatedRaterCompanys.map((O_ID) => {
                    return _find(this.ratingCompanies, {O_ID});
                });

                this.pendingCompanies = this.company.PendingRaterCompanies.map((O_ID) => {
                    return _find(this.ratingCompanies, {O_ID});
                });
            });
    }

    addRatingCompany (raterCompanyId) {
        if (
            !this.company.RelatedRaterCompanys.includes(raterCompanyId)
            && !this.company.PendingRaterCompanies.includes(raterCompanyId)
        ) {
            this
                .UserCompanyService
                .createPendingProviderRaterAssociation(this.company.O_ID, raterCompanyId)
                .then((response) => {
                    this.company.PendingRaterCompanies.push(raterCompanyId);
                    this.pendingCompanies.push(_find(this.ratingCompanies, {O_ID : raterCompanyId}));
                })
                .catch((error) => {
                    //TODO: handle error
                    this.$log.log(error);
                });
        }
    }

    cancelRatingCompany (raterCompanyId) {
        this
            .UserCompanyService
            .updatePendingProviderRaterAssociation(this.company.O_ID, raterCompanyId, false)
            .then((response) => {
                this.company.PendingRaterCompanies = this.company.PendingRaterCompanies.filter((companyId) => {
                    return companyId !== raterCompanyId;
                });
                this.pendingCompanies = this.pendingCompanies.filter((company) => {
                    return company.O_ID !== raterCompanyId;
                });
            })
            .catch((error) => {
                //TODO: handle error
                this.$log.log(error);
            });
    }

    removeRatingCompany (raterCompanyId) {
        if (this.company.O_ID === raterCompanyId) {
            return;
        }

        this
            .UserCompanyService
            .removeProviderRaterAssociation(this.company.O_ID, raterCompanyId)
            .then((response) => {
                this.company.RelatedRaterCompanys = this.company.RelatedRaterCompanys.filter((companyId) => {
                    return companyId !== raterCompanyId;
                });
                this.relatedRatingCompanys = this.relatedRatingCompanys.filter((company) => {
                    return company.O_ID !== raterCompanyId;
                });
            })
            .catch((error) => {
                //TODO: handle error
                this.$log.log(error);
            });
    }

    showRemoveRatingCompanyDialog (O_ID) {
        this
            .DialogService
            .openDialog('dialog-remove-rating-company')
            .then((confirmation) => {
                if (confirmation) {
                    this.removeRatingCompany(O_ID);
                }
            });
    }

    showAddRatingCompanyDialog () {
        this
            .DialogService
            .openDialog('dialog-add-rating-company')
            .then((confirmation) => {
                if (confirmation) {
                    this.addRatingCompany(this.selectedRatingCompanyToAdd.O_ID);
                }
            });
    }
}

export default RatingCompanyPageController;
