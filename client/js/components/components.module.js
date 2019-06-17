import navbarAdminComponent from './navbar-admin/navbar-admin.component';
import DocumentHandlerModule from './document-handler/document-handler.module';
import navbarSupportComponent from './navbar-support/navbar-support.component';

let AdminComponentsModule
    = angular
        .module('epahomeratingapp.adminComponents', [
            DocumentHandlerModule.name
        ])
        .component('navbarAdmin', navbarAdminComponent)
        .component('navbarSupport', navbarSupportComponent);

export default AdminComponentsModule