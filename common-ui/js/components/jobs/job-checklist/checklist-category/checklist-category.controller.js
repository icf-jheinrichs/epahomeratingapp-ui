class jobChecklistChecklistController {
    constructor ($stateParams) {
        'ngInject';

        //TODO: Put this in an enum service
        this.categoryEnum = {
            'exterior-walls' : {
                name : 'Exterior Walls'
            },
            'ceilings-roof' : {
                name : 'Ceilings & Roofs'
            },
            'slabs-floors-joists' : {
                name : 'Slabs, Floors & Rim Joists'
            },
            'interior-walls' : {
                name : 'Interior Walls'
            },
            'hvac-water' : {
                name : 'HVAC & Water'
            },
            'electrical' : {
                name : 'Plug Loads, Lighting, PV, Meters'
            }
        };

        this.categoryId = $stateParams.categoryId;
    }

    $onInit () {
        this.categoryName = this.categoryEnum[this.categoryId].name;
    }
}

export default jobChecklistChecklistController;
