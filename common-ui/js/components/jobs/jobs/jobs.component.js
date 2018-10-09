import template from './jobs.html';
import controller from './jobs.controller';
import './jobs.scss';

let jobsComponent = {
    bindings : {
        enabled                  : '<',
        jobs                     : '<',
        ratingCompanyId          : '@',
        registerHandlers         : '&',
        onSetBulkOperationStatus : '&',
        onDownloadXml            : '&',
        onMarkJobAsRegistered    : '&',
        onOpenJob                : '&'
    },
    template,
    controller,
    controllerAs : 'jobsCtrl'
};

export default jobsComponent;
