import _findIndex from 'lodash/findIndex';
import _reject from 'lodash/reject';

class ProvidersPageController {
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
            });

        this
            .UserCompanyService
            .getProviderCompanies()
            .then((providerCompanies) => {
                this.providerCompanies     = providerCompanies;
                this.selectedProviderToAdd = providerCompanies[0];
            });
    }

    addProvider (selectedProviderToAdd) {
        const companyIndex = _findIndex(this.company.RelatedProviderCompanys, {ProviderRESNETId : selectedProviderToAdd.ProviderRESNETId});

        if (companyIndex < 0) {
            this
                .company
                .RelatedProviderCompanys
                .push({
                    _id              : selectedProviderToAdd._id,
                    O_ID             : selectedProviderToAdd.O_ID,
                    ProviderRESNETId : selectedProviderToAdd.ProviderRESNETId || selectedProviderToAdd._id,
                    Name             : selectedProviderToAdd.Name,
                    Status           : selectedProviderToAdd.Status
                });

            this
                .UserCompanyService
                .putCompany(this.company)
                .then(() => {
                    return this.UserCompanyService.getCompany(selectedProviderToAdd._id);
                })
                .then((providerCompany) => {
                    if (providerCompany.ProviderRESNETId === '') {
                        providerCompany.ProviderRESNETId = providerCompany._id;
                    }

                    providerCompany
                        .RelatedRaterCompanys
                        .push({
                            _id              : this.company._id,
                            O_ID             : this.company.O_ID,
                            ProviderRESNETId : this.company.ProviderRESNETId || this.company._id,
                            Name             : this.company.Name,
                            Status           : this.company.Status
                        });

                    this
                        .UserCompanyService
                        .putCompany(providerCompany);
                });
        }
    }

    removeProvider (ProviderRESNETId) {
        this
            .company
            .RelatedProviderCompanys
            = _reject(this.company.RelatedProviderCompanys, {ProviderRESNETId : ProviderRESNETId});

        this
            .UserCompanyService
            .putCompany(this.company)
            .then(() => {
                return this.UserCompanyService.getCompany(ProviderRESNETId);
            })
            .then((providerCompany) => {
                providerCompany
                    .RelatedRaterCompanys
                    = _reject(providerCompany.RelatedRaterCompanys, {_id : this.company._id.toString()});

                this
                    .UserCompanyService
                    .putCompany(providerCompany);
            });
    }

    showRemoveProviderDiaglog (ProviderRESNETId) {
        this
            .DialogService
            .openDialog(this.DIALOG_REMOVE_PROVIDER_COMPANY)
            .then((confirmation) => {
                if (confirmation) {
                    this.removeProvider(ProviderRESNETId);
                }
            });
    }

    showAddProviderDialog () {
        this
            .DialogService
            .openDialog(this.DIALOG_ADD_PROVIDER_COMPANY)
            .then((confirmation) => {
                if (confirmation) {
                    this.addProvider(this.selectedProviderToAdd);
                }
            });
    }
}

export default ProvidersPageController;
