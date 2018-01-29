import navbarAdminComponent from './navbar-admin/navbar-admin.component';
import DocumentHandlerModule from './document-handler/document-handler.module';

let AdminComponentsModule
    = angular
        .module('epahomeratingapp.adminComponents', [
            DocumentHandlerModule.name
        ])
        .component('navbarAdmin', navbarAdminComponent);

export default AdminComponentsModule;
