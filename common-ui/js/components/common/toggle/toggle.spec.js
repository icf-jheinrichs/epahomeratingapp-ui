'use strict';

describe('Component: Common: Toggle', function testToggle () {
    describe('Total Progress', function testTotalProgress () {
        let progress = 10 + 51;

        it('should not exceed 100', function lte100 () {
            expect(progress).to.be.most(100);
        });

        it('should not be less than zero', function gte0 () {
            expect(progress).to.be.at.least(0);
        });

        it('don\'t draw arc if verified === 0');
        it('don\'t draw arc if must correct === 0');
    });
});
