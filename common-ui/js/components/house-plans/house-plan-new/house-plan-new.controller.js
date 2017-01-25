const ERROR_INPUT = {
    type        : 'error',
    text        : 'Please select a single valid house plan. File extension must be .xml and file should be no larger than 200kb.',
    dismissable : false
};

const ERROR_SERVER = {
    type        : 'error',
    text        : 'There was an error processing your request. Please try again.',
    dismissable : false
};

class HousePlanNewController {
    constructor ($state, HousePlansService) {
        'ngInject';

        this.$state   = $state;

        this.HousePlansService = HousePlansService;
    }

    $onInit () {
        this.fileInput = document.getElementById('housePlanFile');
    }

    isValidFile (file) {
        return file.type === 'text/xml' && ((file.size / 1024) < 200);
    }

    onSubmit () {
        let file = this.fileInput.files[0];
        let formData;

        this.message = {};

        if (this.fileInput.files.length === 1 && this.isValidFile(file)) {
            formData = new window.FormData();

            formData.append('filedata', file, file.name);

            this.HousePlansService
                .post(formData)
                .then((response) => {
                    if (response.code === 200 && response.data.docID) {
                        this.$state.go('house-plans.edit', {id : response.data.docID});
                    }

                })
                .catch((error) => {
                    this.message = Object.assign({}, ERROR_SERVER);
                });
        } else {
            this.message = Object.assign({}, ERROR_INPUT);
        }
    }
}

export default HousePlanNewController;
