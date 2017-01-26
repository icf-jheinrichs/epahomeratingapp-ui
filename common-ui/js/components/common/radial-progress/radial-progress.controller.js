import * as d3 from 'd3';

const WIDTH         = 80;
const THICKNESS     = 8;
const START_ANGLE   = 0;

const CENTER        = WIDTH / 2;
const OUTER_RADIUS  = WIDTH / 2;
const INNER_RADIUS  = OUTER_RADIUS - THICKNESS;

const TRANSFORM     = `translate(${CENTER},${CENTER})`;

/**
 * Displays an SVG radial progress element that tracks number of verified checklist items,
 * must correct items, and total progress.
 *
 * Depends on the d3 library.
 */
class RadialProgressController {
    constructor ($element) {
        'ngInject';

        this.$element = $element;
    }

    /**
     * Bind progressTotal to controller for the view.
     */
    get progressTotal () {
        return Math.ceil(((this.progress.Verified + this.progress.MustCorrect) / this.progress.Total) * 100);
    }

    /**
     * Draw background of the radial progress element.
     * If there is verified progress, draw that arc.
     * If there is must correct progress, draw that arc.
     */
    $postLink () {
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

        // define background arc
        let background
            = d3.arc()
                .innerRadius(INNER_RADIUS)
                .outerRadius(OUTER_RADIUS)
                .startAngle(START_ANGLE)
                .endAngle(2 * Math.PI);

        // append background arc to svgElement
        radial
            .append('path')
            .attr('d', background)
            .attr('class', 'radial-progress-background')
            .attr('transform', TRANSFORM);

        // only draw must correct arc if there is progress
        if (this.progress.MustCorrect > 0) {
            // define must correct arc
            let mustCorrect
                = d3.arc()
                    .innerRadius(INNER_RADIUS)
                    .outerRadius(OUTER_RADIUS)
                    .startAngle(START_ANGLE)
                    .endAngle(mustCorrectEnd);

            // append must correct arc to svgElement
            radial
                .append('path')
                .attr('d', mustCorrect)
                .attr('class', 'radial-progress-must-correct')
                .attr('transform', TRANSFORM);
        }

        // only draw verified arc if there is progress
        if (this.progress.Verified > 0) {
            // define verified arc
            let verified
                = d3.arc()
                    .innerRadius(INNER_RADIUS)
                    .outerRadius(OUTER_RADIUS)
                    .startAngle(verifiedStart)
                    .endAngle(verifiedEnd);

            // append verified arc to svgElement
            radial
                .append('path')
                .attr('d', verified)
                .attr('class', 'radial-progress-verified')
                .attr('transform', TRANSFORM);
        }
    }
}

export default RadialProgressController;
