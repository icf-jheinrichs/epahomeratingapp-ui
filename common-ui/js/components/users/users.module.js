import angular from 'angular';

import userComponent from './user/user.component';
import usersComponent from './users/users.component';

let usersModule
    = angular
        .module('epahomeratingapp.components.users', [])
        .component('user', userComponent)
        .component('users', usersComponent);

export default usersModule;
