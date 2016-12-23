import template from './status-message.html';
import controller from './status-message.controller';

let statusMessageComponent = {
    bindings     : {
        status : '<'
    },
    template,
    controller,
    controllerAs : 'statusMessageCtrl'
};

export default statusMessageComponent;
