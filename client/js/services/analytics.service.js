class AnalyticsService {
    constructor ($window) {
        'ngInject';

        this.$window = $window;
    }

    trackPageView (page) {
        if (this.$window.dataLayer) {
            this.$window.dataLayer.push({
                'event'            : 'VirtualPageview',
                'virtualPageURL'   : page
            });
        }
    }

    trackEvent (event) {
        if (this.$window.dataLayer) {
            this.$window.dataLayer.push({
                'event'  : event.Category,
                'action' : event.Action,
                'label'  : event.Label,
                'value'  : event.Value
            });
        }
    }
}

export default AnalyticsService;
