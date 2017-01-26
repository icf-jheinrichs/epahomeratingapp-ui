/**
 * Displays a linear progress bar depicting verified checklist items,
 * must correct items in respect to total items in a category.
 */
class LinearProgressController {
    constructor ($element) {
        'ngInject';

        this.$element = $element;
    }

    /**
     * Calculate width for bar's CSS property
     * @param  {integer} partial    quantity of verified or must correct checklist items
     * @param  {integer} total      total number of checklist items in category
     * @return {string}             string version of CSS width property as percent.
     */
    getWidth (partial, total) {
        return `${(partial / total) * 100}%`;
    }

    get mustCorrectWidth () {
        return this.getWidth(this.progress.MustCorrect, this.progress.Total);
    }

    get verifiedWidth () {
        return this.getWidth(this.progress.Verified, this.progress.Total);
    }

    // If there are no checklist items, indicate that bar is not applicable via
    // striped bars.
    $postLink () {
        if (this.progress.Total === 0) {
            this.$element.addClass('not-applicable');
        }
    }
}

export default LinearProgressController;
