import _throttle from 'lodash/throttle';
import _forEach from 'lodash/forEach';

class ScrollService {
    constructor ($rootScope, $window, UI_ENUMS) {
        'ngInject';

        this.$rootScope      = $rootScope;
        this.$window         = $window;
        this.listeners       = {};
        this.affixedElements = [];
        this.scrollContext   = 'DEFAULT';

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

    setScrollContext (context) {
        this.scrollContext = context;

        console.log(`setScrollContext('${context}')`);
        this
            .$rootScope
            .$broadcast('SET_SCROLL_CONTEXT', context);
    }

    handleScroll () {
        const scroll = this.getScroll();

        _forEach(this.listeners[this.scrollContext], (listener) => {
            listener.scrollHandler(scroll);
        });
    }

    registerListener (listener) {
        if (this.listeners[listener.context] === undefined) {
            this.listeners[listener.context] = {};
        }
        this.listeners[listener.context][listener.id] = listener;
    }

    deregisterListener (listener) {
        if (this.listeners[listener.context][listener.id]) {
            delete this.listeners[listener.context][listener.id];
        }
    }

    getAffixedThreshold (elementIndex) {
        const length  = this.affixedElements.length;
        let index     = 0;
        let threshold = 0;

        while (index < elementIndex && index < length) {
            const element = this.affixedElements[index];

            if (element) {
                threshold += element.height;
            }
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

            if (element) {
                top   += (element.isAffixed) ? element.height : 0;
            }
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
