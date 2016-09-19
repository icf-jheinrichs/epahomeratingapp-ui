class LinearProgressController {
    constructor ($log) {
        'ngInject';

    }

    $onInit () {
        this.mustCorrectWidth = this.getWidth(this.mustCorrect, this.total);
        this.verifiedWidth = this.getWidth(this.verified, this.total);
    }

    getWidth (partial, total) {
        return `${(partial / total) * 100}%`;
    }
}

export default LinearProgressController;
