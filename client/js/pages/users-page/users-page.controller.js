import _findIndex from 'lodash/findIndex';

class UsersPageController {
    constructor (AuthorizationService, DialogService, UserCompanyService, UI_ENUMS) {
        'ngInject';

        this.AuthorizationService = AuthorizationService;
        this.DialogService        = DialogService;
        this.UserCompanyService   = UserCompanyService;

        this.DIALOG_SAVE_USER_COMPANIES_ERROR = UI_ENUMS.DIALOG.SAVE_USER_COMPANIES_ERROR;
    }

    saveUsers (users) {
        let adminCount    = 0;
        let providerCount = 0;

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


                adminCount += (user.authorizations.Admin) ? 1 : 0;
                providerCount += (user.authorizations.Provider) ? 1 : 0;
            }
        });

        if (adminCount > 0) {
            this.usersData.forEach((userData) => {
                this
                    .UserCompanyService
                    .putUser(userData);
            });
        } else {
            this.DialogService.openDialog(this.DIALOG_SAVE_USER_COMPANIES_ERROR);
        }
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

    $onInit () {
        const C_ID = this.AuthorizationService.getUserId();;
        const O_ID = this.AuthorizationService.getCurrentOrganizationId();;

        this
            .UserCompanyService
            .getCompanyUsers(C_ID, O_ID)
            .then((companyUsers) => {
                this.usersData = companyUsers;

                this.users = this.mergeUserUserAuthorizations(this.usersData, O_ID);
            });
    }
}

export default UsersPageController;
