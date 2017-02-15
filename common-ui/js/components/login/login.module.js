import angular from 'angular';

import forgotPasswordComponent from './forgot-password/forgot-password.component';
import loginComponent from './login.component';
import loginFormComponent from './login-form/login-form.component';
import registerComponent from './register/register.component';
import userMenuComponent from './user-menu/user-menu.component';

let loginModule
    = angular
        .module('epahomeratingapp.components.login', [])
        .component('forgotPassword', forgotPasswordComponent)
        .component('login', loginComponent)
        .component('loginForm', loginFormComponent)
        .component('register', registerComponent)
        .component('userMenu', userMenuComponent);

export default loginModule;
