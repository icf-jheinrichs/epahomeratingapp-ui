import _throttle from 'lodash/throttle';
import _forEach from 'lodash/forEach';

class ScrollService {
    constructor ($rootScope, $window, UI_ENUMS) {
        'ngInject';

        this.$rootScope      = $rootScope;
        this.$window         = $window;
        this.listeners       = {};
        this.affixedElements = [];

        this.MESSAGING_SET_TOP_PAD = UI_ENUMS.MESSAGING.SET_TOP_PAD;

        $window.addEventListener('scroll', _throttle(this.handleScroll.bind(this), 125));
    }

    getScroll () {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        return {
            scrollX,
            scrollY
        };
    }

    handleScroll () {
        const scroll = this.getScroll();

        _forEach(this.listeners, (listener) => {
            listener.scrollHandler(scroll);
        });
    }

    registerListener (listener) {
        this.listeners[listener.id] = listener;
    }

    deregisterListener (listenerId) {
        if (this.listeners[listenerId]) {
            delete this.listeners[listenerId];
        }
    }

    getAffixedThreshold (elementIndex) {
        const length  = this.affixedElements.length;
        let index     = 0;
        let threshold = 0;

        while (index < elementIndex && index < length) {
            const element = this.affixedElements[index];

            threshold += element.height;
            index     += 1;
        }

        return threshold;
    }

    getAffixedTop (elementIndex) {
        const length = this.affixedElements.length;
        let index    = 0;
        let top      = 0;

        while (index < elementIndex && index < length) {
            const element = this.affixedElements[index];

            top   += (element.isAffixed) ? element.height : 0;
            index += 1;
        }

        return top;
    }

    getAffixedHeight () {
        let height = 35;

        this
            .affixedElements
            .forEach((element) => {
                height += (element && element.isAffixed) ? element.height : 0;
            });

        return height;
    }

    setAffixed (affixedElement) {
        this.affixedElements[affixedElement.index] = affixedElement;
    }

    removeAffixed (index) {
        delete this.affixedElements[index];
    }
}

export default ScrollService;
