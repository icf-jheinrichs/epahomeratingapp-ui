import template from './item-comments-review.html';
import controller from './item-comments-review.controller';


//TODO: update this SCSS to use common .btn style - same as on home selection item
import './item-comments-review.scss';

let checklistItemCommentsReviewComponent = {
    bindings : {
        comments             : '<',
        onComment            : '&',
        itemId               : '@'
    },
    template,
    controller,
    controllerAs : 'checklistItemCommentsReviewCtrl'
};

export default checklistItemCommentsReviewComponent;
