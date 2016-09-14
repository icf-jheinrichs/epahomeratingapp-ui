class RadialProgressController {
    constructor ($log) {
        'ngInject';

        this.TotalProgress = Math.min(this.progress.Verified + this.progress.MustCorrect, 100);
    }
}

export default RadialProgressController;
