import component from './house-plans-page.component';
import template from './house-plans-page.html';
import controller from './house-plans-page.controller';

describe('Page: House Plans', function testHomePage () {
    describe('Component Tests', function testComponent () {
        it('includes the right template', function itIncludesTemplate () {
            expect(component.template).to.equal(template);
        });

        it('uses the correct `controllerAs` label', function itHasCorrectLabel () {
            expect(component.controllerAs).to.equal('housePlansPageCtrl');
        });

        it('inclues the right controller', function itIncludesController () {
            expect(component.controller).to.equal(controller);
        });
    });
});
