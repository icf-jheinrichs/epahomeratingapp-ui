import component from './users-page.component';
import template from './users-page.html';
import controller from './users-page.controller';

describe('Page: Users', function testHomePage () {
    describe('Component Tests', function testComponent () {
        it('includes the right template', function itIncludesTemplate () {
            expect(component.template).to.equal(template);
        });

        it('uses the correct `controllerAs` label', function itHasCorrectLabel () {
            expect(component.controllerAs).to.equal('usersPageCtrl');
        });

        it('inclues the right controller', function itIncludesController () {
            expect(component.controller).to.equal(controller);
        });
    });
});
