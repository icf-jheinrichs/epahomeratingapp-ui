import template from './job-admin.html';
import controller from './job-admin.controller';
import './job-admin.scss';

let jobAdminComponent = {
    bindings : {
        enabled                  : '<',
        job                      : '<',
        marked                   : '=',
        onSetBulkOperationStatus : '&',
        onDownloadXml            : '&'
    },
    template,
    controller,
    controllerAs : 'jobAdminCtrl'
};

export default jobAdminComponent;
