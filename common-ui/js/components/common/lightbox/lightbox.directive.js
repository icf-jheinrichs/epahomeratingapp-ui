import controller from './lightbox.controller';

function lightbox () {
    return {
        restrict : 'A',
        controller
    };
}

export default lightbox;
