class AnalyticsService {
    constructor ($window, NODE_ENV) {
        'ngInject';
        this.NODE_ENV = NODE_ENV;
        this.$window = $window;
    }

    trackPageView (page) {
        if (this.$window.ga && this.NODE_ENV === 'production') {
            this.$window.ga('send', {
                hitType            : 'pageview',
                page               : page
            });
        }
    }

    trackEvent (event) {
        if (this.$window.ga && this.NODE_ENV === 'production') {
            this.$window.ga('send', {
                hitType       : 'event',
                eventCategory : event.Category,
                eventAction   : event.Action,
                eventLabel    : event.Label,
            });
        }
    }
}

export default AnalyticsService;
