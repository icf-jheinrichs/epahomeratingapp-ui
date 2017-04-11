class LightboxController {
    constructor ($element, $document, UI_ENUMS) {
        'ngInject';

        this.$element  = $element;
        this.body      = $document.find('body');

        this.defaultPhotoUrl = UI_ENUMS.IMAGES.DEFAULT_PHOTO;

        this.isOpen    = false;

        //TODO: See if I can't get this html into a template file somehow
        this.overlayElement
            = angular
                .element('<div class="overlay overlay-lightbox"></div>');

        //TODO: See if I can't get this html into a template file somehow
        this.lightboxElement
            = angular
                .element('<div class="lightbox-wrapper"><figure class="lightbox"><button type="button" class="btn btn-no-label btn-lightbox-close"><i class="fa fa-times" aria-hidden="true"></i></button><img class="lightbox-image" alt="" /></figure></div>');

        this.$element.on('click', ($event) => {
            $event.preventDefault();
            $event.stopPropagation();

            this.showLightbox();
        });

        this.$element.on('$destroy', () => {
            this.$element.off('click');
        });
    }

    showLightbox () {
        let imgSrc = this.$element.find('img')[0].src;

        if (imgSrc.indexOf(this.defaultPhotoUrl) >= 0) {
            return;
        }

        this.lightboxElement
            .on('click', (event) => {
                if (event.srcElement.className !== 'lightbox-image') {
                    this.hideLightbox();
                }
            });

        this.body
            .append(this.lightboxElement);

        this.body
            .addClass('overlay-open')
            .append(this.overlayElement);

        this.lightboxElement
            .find('img')[0]
            .src = imgSrc;
    }

    hideLightbox () {
        this.body
            .removeClass('overlay-open');

        this.lightboxElement
            .off('click');

        this.overlayElement
            .remove();

        this.lightboxElement
            .remove();
    }
}

export default LightboxController;
