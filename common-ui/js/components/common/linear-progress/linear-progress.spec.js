'use strict';

describe('Component: Common: Linear Progress', function testLinearProgress () {
    let parentScope;
    let element;
    let compile;

    const APPLICABLE_CASE = {
        MustCorrect : 15,
        Verified    : 65,
        Total       : 100
    };

    const NOT_APPLICABLE_CASE = {
        MustCorrect : 0,
        Verified    : 0,
        Total       : 0
    };

    const LINEAR_PROGRESS_COMPONENT = 'linearProgress';
    const NOT_APPLICABLE_CLASS      = 'not-applicable';

    beforeEach(angular.mock.module('epahomeratingapp.common'));

    beforeEach(inject(($compile, $rootScope) => {
        compile     = $compile;
        parentScope = $rootScope.$new();
        element     = angular.element('<linear-progress class="linear-progress linear-progress-pre-drywall" progress="progress"></linear-progress>');
    }));

    describe('Total Checklist Items', function testTotalItems () {
        it(`progress bar should have class "${NOT_APPLICABLE_CLASS}" if total === 0`, function totalItemsZero () {
            parentScope.progress = NOT_APPLICABLE_CASE;
            element = compile(element)(parentScope);
            parentScope.$digest();

            expect(element.hasClass(NOT_APPLICABLE_CLASS)).to.be.true;
        });

        it(`progress bar should not have class "${NOT_APPLICABLE_CLASS}" if total > 0`, function totalItemsGTZero () {
            parentScope.progress = APPLICABLE_CASE;
            element = compile(element)(parentScope);
            parentScope.$digest();

            expect(element.hasClass(NOT_APPLICABLE_CLASS)).to.be.false;
        });
    });

    describe('Linear Progress Controller', function testComponentController () {
        let scope;
        let controller;

        beforeEach(inject(($rootScope, $componentController) => {
            scope      = $rootScope;
            controller = $componentController(
                LINEAR_PROGRESS_COMPONENT,
                {
                    $scope   : scope,
                    $element : angular.element('<div></div>')
                },
                {progress : APPLICABLE_CASE}
            );
        }));

        it('should calculate width', function control () {
            expect(controller.getWidth(APPLICABLE_CASE.Verified, APPLICABLE_CASE.Total)).to.equal('65%');
        });

        it('should calculate verified width', function control () {
            expect(controller.verifiedWidth).to.equal('65%');
        });

        it('should calculate must correct width', function lte100 () {
            expect(controller.mustCorrectWidth).to.equal('15%');
        });
    });
});
