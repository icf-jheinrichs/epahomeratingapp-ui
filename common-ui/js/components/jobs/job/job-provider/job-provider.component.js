import template from './job-provider.html';
import controller from './job-provider.controller';
import './job-provider.scss';

let jobProviderComponent = {
    bindings : {
        enabled                  : '<',
        job                      : '<',
        marked                   : '=',
        onSetBulkOperationStatus : '&',
        onMarkJobRegistered      : '&',
        onDownloadXml            : '&'
    },
    template,
    controller,
    controllerAs : 'jobProviderCtrl'
};

export default jobProviderComponent;
