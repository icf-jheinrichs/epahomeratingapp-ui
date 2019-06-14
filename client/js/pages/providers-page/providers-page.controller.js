import _find from 'lodash/find';

class ProvidersPageController {
    constructor ($log, $q, AuthorizationService, DialogService, UserCompanyService, UI_ENUMS) {
        'ngInject';

        this.$log                 = $log;
        this.$q                   = $q;

        this.AuthorizationService = AuthorizationService;
        this.DialogService        = DialogService;
        this.UserCompanyService   = UserCompanyService;

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
                this.company = company;

                return this
                    .UserCompanyService
                    .getRelatedProviderCompanies(this.AuthorizationService.getCurrentOrganizationId());
            })
            .then((providerCompanies) => {
                this.relatedProviderCompanys = providerCompanies.related;
                this.pendingCompanies        = providerCompanies.pending;
            });
    }

    respondToProviderRequest (providerCompanyId, accept) {
        this
            .UserCompanyService
            .updatePendingProviderRaterAssociation(providerCompanyId, this.company.O_ID, accept)
            .then((response) => {
                if (accept) {
                    this.company.RelatedProviderCompanys.push(providerCompanyId);

                    this.relatedProviderCompanys.push(_find(this.pendingCompanies, {O_ID : providerCompanyId}));
                }

                this.company.PendingProviderCompanies = this.company.PendingProviderCompanies.filter((companyId) => {
                    return companyId !== providerCompanyId;
                });
                this.pendingCompanies = this.pendingCompanies.filter((company) => {
                    return company.O_ID !== providerCompanyId;
                });

            })
            .catch((error) => {
                //TODO: handle error
                this.$log.log(error);
            });
    }

    removeProvider (providerCompanyId) {
        if (this.company.O_ID === providerCompanyId) {
            return;
        }

        this
            .UserCompanyService
            .removeProviderRaterAssociation(providerCompanyId, this.company.O_ID)
            .then((response) => {
                this.company.RelatedProviderCompanys = this.company.RelatedProviderCompanys.filter((companyId) => {
                    return companyId !== providerCompanyId;
                });
                this.relatedProviderCompanys = this.relatedProviderCompanys.filter((company) => {
                    return company.O_ID !== providerCompanyId;
                });
            })
            .catch((error) => {
                //TODO: handle error
                this.$log.log(error);
            });
    }

    showRemoveProviderDialog (O_ID) {
        this
            .DialogService
            .openDialog(this.DIALOG_REMOVE_PROVIDER_COMPANY)
            .then((confirmation) => {
                if (confirmation) {
                    this.removeProvider(O_ID);
                }
            });
    }
}

export default ProvidersPageController;
