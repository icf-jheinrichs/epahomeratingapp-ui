'use strict';

describe('Component: Common: Radial Progress', function testRadialProgress () {
    let parentScope;
    let element;
    let compile;

    const SUCCESS_CASE = {
        MustCorrect : 15,
        Verified    : 65,
        Total       : 100
    };

    const NO_VERIFIED = {
        MustCorrect : 55,
        Verified    : 0,
        Total       : 100
    };

    const NO_MUST_CORRECT = {
        MustCorrect : 0,
        Verified    : 55,
        Total       : 100
    };

    const BACKGROUND_CLASS   = 'radial-progress-background';
    const VERIFIED_CLASS     = 'radial-progress-verified';
    const MUST_CORRECT_CLASS = 'radial-progress-must-correct';

    beforeEach(angular.mock.module('epahomeratingapp.common'));

    beforeEach(inject(($compile, $rootScope) => {
        compile     = $compile;
        parentScope = $rootScope.$new();
        element     = angular.element('<radial-progress title="Pre-drywall" progress="progress" /></radial-progress>');
    }));

    describe('Background Arc', function testTotalProgress () {
        it('should be in DOM', function backgroundDrawn () {
            parentScope.progress = SUCCESS_CASE;
            element = compile(element)(parentScope);
            parentScope.$digest();

            let verifiedArc = element[0].getElementsByClassName(BACKGROUND_CLASS);

            expect(verifiedArc).to.have.lengthOf(1);
        });
    });

    describe('Verified Arc', function testVerifiedArc () {
        it('should not be appended if progress.verified === 0', function verifiedNotDrawn () {
            parentScope.progress = NO_VERIFIED;
            element = compile(element)(parentScope);
            parentScope.$digest();

            let verifiedArc = element[0].getElementsByClassName(VERIFIED_CLASS);

            expect(verifiedArc).to.have.lengthOf(0);
        });

        it('should be appended if progress.verified > 0', function verifiedNotDrawn () {
            parentScope.progress = SUCCESS_CASE;
            element = compile(element)(parentScope);
            parentScope.$digest();

            let verifiedArc = element[0].getElementsByClassName(VERIFIED_CLASS);

            expect(verifiedArc).to.have.lengthOf(1);
        });
    });

    describe('Must Correct Arc', function testVerifiedArc () {
        it('should not be appended if progress.mustCorrect === 0', function mustCorrectNotDrawn () {
            parentScope.progress = NO_MUST_CORRECT;
            element = compile(element)(parentScope);
            parentScope.$digest();

            let mustCorrectArc = element[0].getElementsByClassName(MUST_CORRECT_CLASS);

            expect(mustCorrectArc).to.have.lengthOf(0);
        });

        it('should not be appended if progress.mustCorrect > 0', function mustCorrectNotDrawn () {
            parentScope.progress = SUCCESS_CASE;
            element = compile(element)(parentScope);
            parentScope.$digest();

            let mustCorrectArc = element[0].getElementsByClassName(MUST_CORRECT_CLASS);

            expect(mustCorrectArc).to.have.lengthOf(1);
        });
    });
});
