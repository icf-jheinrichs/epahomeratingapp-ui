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
        const O_ID = this.AuthorizationService.getCurrentOrganizationId();

        this.organizationTypes = this.AuthorizationService.getOrganizationTypes();

        this
            .UserCompanyService
            .getCompany(O_ID)
            .then((company) => {
                this.company = company;

                return this.UserCompanyService.getCompanyUsers(O_ID);
            })
            .then((companyUsers) => {
                this.usersData = companyUsers;

                this.users = companyUsers;
            });
    }

    saveUser (user) {
        return this.$q((resolve, reject) => {
            const userIndex = this.users.findIndex((u) => {
                return u.C_ID === user.C_ID;
            });

            this
                .UserCompanyService
                .putUserAuthorization(user.authorizations)
                .then(() => {
                    this.users[userIndex] = user;

                    resolve({status : 'success'});
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default UsersPageController;
