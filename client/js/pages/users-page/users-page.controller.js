import _findIndex from 'lodash/findIndex';
import _reject from 'lodash/reject';

class UsersPageController {
    constructor ($log, $q, AuthorizationService, DialogService, UserCompanyService, UI_ENUMS) {
        'ngInject';

        this.$log                 = $log;
        this.$q                   = $q;

        this.AuthorizationService = AuthorizationService;
        this.DialogService        = DialogService;
        this.UserCompanyService   = UserCompanyService;

        this.DIALOG_ADD_PROVIDER_COMPANY      = UI_ENUMS.DIALOG.ADD_PROVIDER_COMPANY;
        this.DIALOG_SAVE_USER_COMPANIES_ERROR = UI_ENUMS.DIALOG.SAVE_USER_COMPANIES_ERROR;
    }

    $onInit () {
        const C_ID = this.AuthorizationService.getUserId();
        const O_ID = this.AuthorizationService.getCurrentOrganizationId();

        this.organizationTypes = this.AuthorizationService.getOrganizationTypes();

        this
            .UserCompanyService
            .getCompanyUsers(C_ID, O_ID)
            .then((companyUsers) => {
                this.usersData = companyUsers;

                this.users = this.mergeUserUserAuthorizations(this.usersData, O_ID);
            });

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

        this.currentView = 'users';
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
                    ProviderRESNETId : selectedProviderToAdd.ProviderRESNETId,
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
                    providerCompany
                        .RelatedRaterCompanys
                        .push({
                            _id              : this.company._id,
                            O_ID             : this.company.O_ID,
                            ProviderRESNETId : this.company.ProviderRESNETId,
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
            .putCompany(this.company);
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

    setActiveView (view) {
        this.currentView = view;
    }

    saveUsers (users) {
        users.forEach((user) => {
            const O_ID           = this.AuthorizationService.getCurrentOrganizationId();
            const userCognitoId  = user.CognitoId;
            const userIndex      = _findIndex(this.usersData, (userData) => {
                return userData.user.CognitoId === userCognitoId;
            });

            if (userIndex >= 0) {
                const userCompanyIndex = _findIndex(this.usersData[userIndex].userCompany, {O_ID : O_ID});

                if (userCompanyIndex >= 0) {
                    this.usersData[userIndex].userCompany[userCompanyIndex].Admin    = user.authorizations.Admin;
                    this.usersData[userIndex].userCompany[userCompanyIndex].Provider = user.authorizations.Provider;
                    this.usersData[userIndex].userCompany[userCompanyIndex].Rater    = user.authorizations.Rater;
                }
            }
        });

        return this.$q((resolve, reject) => {
            this.usersData.forEach((userData) => {
                this
                    .UserCompanyService
                    .putUser(userData)
                    .then(() => {
                        resolve({status : 'success'});
                    })
                    .catch(() => {
                        reject({status : 'success'});
                    });
            });
        });
    }

    mergeUserUserAuthorizations (userAuthorizations, O_ID) {
        const defaultUserAuthorization = {
            Admin           : false,
            OrgTypeProvider : false,
            OrgTypeRater    : false,
            Provider        : false,
            Rater           : false
        };
        let companyUsers = [];

        userAuthorizations.forEach((userUserCompany) => {
            let user = userUserCompany.user;

            let userAuthorizationIndex = _findIndex(userUserCompany.userCompany, {O_ID : O_ID});

            if (userAuthorizationIndex >= 0) {
                user.authorizations = userUserCompany.userCompany[userAuthorizationIndex];
            } else {
                user.authorizations = Object.assign({
                    C_ID : userUserCompany.user.C_ID,
                    O_ID : O_ID
                }, defaultUserAuthorization);
            }

            companyUsers.push(user);
        });


        return companyUsers;
    }
}

export default UsersPageController;
