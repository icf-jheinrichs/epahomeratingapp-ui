import _findIndex from 'lodash/findIndex';
import _cloneDeep from 'lodash/cloneDeep';

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

    saveUser (user) {
        return this.$q((resolve, reject) => {
            const O_ID           = this.AuthorizationService.getCurrentOrganizationId();
            const userCognitoId  = user.CognitoId;
            const userIndex      = _findIndex(this.usersData, (userData) => {
                return userData.user.CognitoId === userCognitoId;
            });

            if (userIndex >= 0) {
                const editedUser = _cloneDeep(this.usersData[userIndex]);

                const userCompanyIndex = _findIndex(this.usersData[userIndex].userCompany, {O_ID : O_ID});

                if (userCompanyIndex >= 0) {
                    editedUser.userCompany[userCompanyIndex].Admin    = user.authorizations.Admin;
                    editedUser.userCompany[userCompanyIndex].Provider = user.authorizations.Provider;
                    editedUser.userCompany[userCompanyIndex].Rater    = user.authorizations.Rater;

                    this
                        .UserCompanyService
                        .putUser(editedUser)
                        .then(() => {
                            this.usersData[userIndex] = editedUser;
                            resolve({status : 'success'});
                        })
                        .catch((error) => {
                            reject(error);
                        });
                } else {
                    reject('user not associated with company');
                }
            } else {
                reject('user not found');
            }
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

        return userAuthorizations.map((userUserCompany) => {
            let user = Object.assign({}, userUserCompany.user);

            let userAuthorizationIndex = _findIndex(userUserCompany.userCompany, {O_ID : O_ID});

            if (userAuthorizationIndex >= 0) {
                user.authorizations = userUserCompany.userCompany[userAuthorizationIndex];
            } else {
                user.authorizations = Object.assign({
                    C_ID : userUserCompany.user.C_ID,
                    O_ID : O_ID
                }, defaultUserAuthorization);
            }

            return user;
        });
    }
}

export default UsersPageController;
