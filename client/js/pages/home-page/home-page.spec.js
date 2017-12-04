import component from './home-page.component';
import template from './home-page.html';
import controller from './home-page.controller';

describe('Page: Home Page', function testHomePage () {
    describe('Component Tests', function testComponent () {
        it('includes the right template', function itIncludesTemplate () {
            expect(component.template).to.equal(template);
        });

        it('uses the correct `controllerAs` label', function itHasCorrectLabel () {
            expect(component.controllerAs).to.equal('homePageCtrl');
        });

        it('inclues the right controller', function itIncludesController () {
            expect(component.controller).to.equal(controller);
        });
    });
});
