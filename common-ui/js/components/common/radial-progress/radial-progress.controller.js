import * as d3 from 'd3';

class RadialProgressController {
    constructor ($element) {
        'ngInject';

        this.$element = $element;
    }

    $onInit () {
        this.progressTotal = Math.ceil(((this.progress.Verified + this.progress.MustCorrect) / this.progress.Total) * 100);
    }

    $postLink () {
        const WIDTH         = 80;
        const THICKNESS     = 8;
        const START_ANGLE   = 0;

        const CENTER        = WIDTH / 2;
        const OUTER_RADIUS  = WIDTH / 2;
        const INNER_RADIUS  = OUTER_RADIUS - THICKNESS;

        const TRANSFORM     = `translate(${CENTER},${CENTER})`;

        let svgElement  = this.$element.find('svg')[0];
        let radial      = d3.select(svgElement);

        let cScale
            = d3
                .scaleLinear()
                .domain([0, this.progress.Total])
                .range([0, 2 * Math.PI]);

        let mustCorrectEnd  = cScale(this.progress.MustCorrect);

        let verifiedStart   = mustCorrectEnd;
        let verifiedEnd     = cScale(this.progress.Verified + this.progress.MustCorrect);

        let background
            = d3.arc()
                .innerRadius(INNER_RADIUS)
                .outerRadius(OUTER_RADIUS)
                .startAngle(START_ANGLE)
                .endAngle(2 * Math.PI);

        radial
            .append('path')
            .attr('d', background)
            .attr('class', 'radial-progress-background')
            .attr('transform', TRANSFORM);

        if (this.progress.MustCorrect > 0) {
            let mustCorrect
                = d3.arc()
                    .innerRadius(INNER_RADIUS)
                    .outerRadius(OUTER_RADIUS)
                    .startAngle(START_ANGLE)
                    .endAngle(mustCorrectEnd);

            radial
                .append('path')
                .attr('d', mustCorrect)
                .attr('class', 'radial-progress-must-correct')
                .attr('transform', TRANSFORM);
        }

        if (this.progress.Verified > 0) {
            let verified
                = d3.arc()
                    .innerRadius(INNER_RADIUS)
                    .outerRadius(OUTER_RADIUS)
                    .startAngle(verifiedStart)
                    .endAngle(verifiedEnd);

            radial
                .append('path')
                .attr('d', verified)
                .attr('class', 'radial-progress-verified')
                .attr('transform', TRANSFORM);
        }
    }
}

export default RadialProgressController;
