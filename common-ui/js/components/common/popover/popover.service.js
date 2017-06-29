class PopoverService {
    constructor ($log, $q) {
        'ngInject';

        this.$log           = $log;
        this.$q             = $q;
        this.popovers        = {};
    }

    registerPopover (popover) {
        this.popovers[popover.id] = popover;
    }

    deregisterPopover (popoverId) {
        if (this.popovers[popoverId]) {
            delete this.popovers[popoverId];
        }
    }

    openPopover (popoverId) {
        return this.$q((resolve, reject) => {
            if (this.popovers[popoverId]) {
                this.popovers[popoverId].open({
                    resolve,
                    reject
                });
            } else {
                reject(`popover ${popoverId} not registered`);
            }
        });
    }
}

export default PopoverService;
