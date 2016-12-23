import angular from 'angular';

import loginComponent from './login.component';
import loginFormComponent from './login-form/login-form.component';
import forgotPasswordComponent from './forgot-password/forgot-password.component';
import userMenuComponent from './user-menu/user-menu.component';

let loginModule
    = angular
        .module('epahomeratingapp.components.login', [])
        .component('login', loginComponent)
        .component('loginForm', loginFormComponent)
        .component('forgotPassword', forgotPasswordComponent)
        .component('userMenu', userMenuComponent);

export default loginModule;
