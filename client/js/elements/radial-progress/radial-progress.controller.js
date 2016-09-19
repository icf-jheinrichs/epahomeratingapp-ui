import * as d3 from 'd3';

// 'Verified'      : 20,
// 'MustCorrect'   : 4


class RadialProgressController {
    constructor ($element) {
        'ngInject';

        this.$element = $element;
    }

    $onInit () {
        this.progressTotal = this.progress.Verified + this.progress.MustCorrect;
    }

    $postLink () {
        let svgElement  = this.$element.find('svg')[0];
        let radial      = d3.select(svgElement);

        let cScale
            = d3
                .scaleLinear()
                .domain([0, 100])
                .range([0, 2 * Math.PI]);

        let mustCorrectEnd  = cScale(this.progress.MustCorrect);

        let verifiedStart   = mustCorrectEnd;
        let verifiedEnd     = cScale(this.progress.Verified + this.progress.MustCorrect);

        let background
            = d3.arc()
                .innerRadius(35)
                .outerRadius(40)
                .startAngle(0)
                .endAngle(2 * Math.PI);

        let mustCorrect
            = d3.arc()
                .innerRadius(35)
                .outerRadius(40)
                .startAngle(0)
                .endAngle(mustCorrectEnd);

        let verified
            = d3.arc()
                .innerRadius(35)
                .outerRadius(40)
                .startAngle(verifiedStart)
                .endAngle(verifiedEnd);

        radial
            .append('path')
            .attr('d', background)
            .attr('class', 'radial-progress-background')
            .attr('transform', 'translate(40,40)');

        radial
            .append('path')
            .attr('d', verified)
            .attr('class', 'radial-progress-verified')
            .attr('transform', 'translate(40,40)');

        radial
            .append('path')
            .attr('d', mustCorrect)
            .attr('class', 'radial-progress-must-correct')
            .attr('transform', 'translate(40,40)');

    }
}

export default RadialProgressController;
