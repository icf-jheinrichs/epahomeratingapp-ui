import component from './navbar-admin.component';
import template from './navbar-admin.html';
import controller from './navbar-admin.controller';

describe('Component: Admin Navbar', function testAdminNavbar () {
    describe('Component Tests', function testComponent () {
        it('includes the right template', function itIncludesTemplate () {
            expect(component.template).to.equal(template);
        });

        it('uses the correct `controllerAs` label', function itHasCorrectLabel () {
            expect(component.controllerAs).to.equal('navbarAdminCtrl');
        });

        it('inclues the right controller', function itIncludesController () {
            expect(component.controller).to.equal(controller);
        });
    });
});
