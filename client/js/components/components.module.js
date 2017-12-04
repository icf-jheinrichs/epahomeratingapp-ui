import navbarAdminComponent from './navbar-admin/navbar-admin.component';

let AdminComponentsModule
    = angular
        .module('epahomeratingapp.adminComponents', [])
        .component('navbarAdmin', navbarAdminComponent);

export default AdminComponentsModule;
