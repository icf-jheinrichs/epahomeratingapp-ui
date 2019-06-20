function accordion () {
    return {
        restrict : 'E',
        transclude: true,
        scope: {
        	title: '@',
        	idnum: '@'
        },
        template: `
        	<div class="accordion">
    			<input type="checkbox" id="accordion{{idnum}}">
    			<label class="accordion-label" for="accordion{{idnum}}">{{title}}</label>
			    <div class="accordion-content">
			        <ng-transclude></ng-transclude>
			    </div>
			</div>
		`
    };
}
export default accordion;
