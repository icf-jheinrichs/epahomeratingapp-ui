/*global google */

class jobHistoryController {
    constructor (
        $element,
        $state,
        $stateParams,
        JobHistoryService,
        JobChecklistStateService
    ) {
        'ngInject';

        this.$element     = $element;
        this.$state       = $state;
        this.$stateParams = $stateParams;

        this.JobHistoryService        = JobHistoryService;
        this.JobChecklistStateService = JobChecklistStateService;
    }

    getCenter () {
        const bound = new google.maps.LatLngBounds();

        this.map.coordinates.forEach((coord) => {
            bound.extend(new google.maps.LatLng({lat : coord.lat, lng : coord.lng}));
        });

        return {
            lat : bound.getCenter().lat(),
            lng : bound.getCenter().lng()
        };
    }

    getRadius () {
        const totalDistance = this.map.coordinates.reduce((accumulator, coord) => {
            return accumulator + google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.center), new google.maps.LatLng({lat : coord.lat, lng : coord.lng}));
        }, 0);

        return (totalDistance / this.map.coordinates.length);
    }

    $postLink () {
        if (!window.google) {
            return;
        }

        let radius = 0;

        if (this.map.coordinates.length > 1) {
            this.center = this.getCenter();
            radius = this.getRadius();
        } else {
            this.center = {lat : this.map.coordinates[0].lat, lng : this.map.coordinates[0].lng};
        }

        const map = new google.maps.Map(this.$element[0].childNodes[0],
            {
                zoom              : 18,
                center            : this.center,
                clickableIcons    : false,
                fullscreenControl : false,
                mapTypeControl    : false,
                streetViewControl : false,
                styles            : [{
                    featureType : 'poi.business',
                    stylers     : [{visibility : 'off'}]
                }]
            });
        new google.maps.Marker({position : this.center, map : map});

        if (this.map.coordinates.length > 1) {
            this.map.coordinates.forEach((coord) => {
                new google.maps.Marker({position : {lat : coord.lat, lng : coord.lng}, map : map});
            });
        }

        if (radius) {
            new google.maps.Circle({
                strokeColor   : '#018edc',
                strokeOpacity : 0.8,
                strokeWeight  : 2,
                fillColor     : '#018edc',
                fillOpacity   : 0.35,
                map           : map,
                center        : this.center,
                radius        : radius
            });
        }

        this.href = `https://www.google.com/maps/search/?api=1&query=${this.center.lat},${this.center.lng}`;
    }
}

export default jobHistoryController;
