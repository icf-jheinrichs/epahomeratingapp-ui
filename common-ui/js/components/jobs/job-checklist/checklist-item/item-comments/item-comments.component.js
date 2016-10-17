import template from './item-comments.html';
import controller from './item-comments.controller';


/* TODO: update this SCSS to use common .btn style - same as on home selection itme */
import './item-comments.scss';

let checklistItemCommentsComponent = {
    bindings : {
        comments             : '<',
        onComment            : '&'
    },
    template,
    controller,
    controllerAs : 'checklistItemCommentsCtrl'
};

export default checklistItemCommentsComponent;
