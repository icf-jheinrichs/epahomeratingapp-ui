class DropdownService {
    constructor ($log, $q) {
        'ngInject';

        this.$log           = $log;
        this.$q             = $q;
        this.dropdowns        = {};
    }

    registerDropdown (dropdown) {
        this.dropdowns[dropdown.id] = dropdown;
    }

    deregisterDropdown (dropdownId) {
        if (this.dropdowns[dropdownId]) {
            delete this.dropdowns[dropdownId];
        }
    }

    openDropdown (dropdownId) {
        if (this.dropdowns[dropdownId]) {
            this.dropdowns[dropdownId].open();
        }
    }

    closeDropdown (dropdownId) {
        if (this.dropdowns[dropdownId]) {
            this.dropdowns[dropdownId].close();
        }
    }
}

export default DropdownService;
