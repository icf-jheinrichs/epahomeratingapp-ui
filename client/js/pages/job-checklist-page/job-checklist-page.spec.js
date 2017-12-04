import component from './job-checklist-page.component';
import template from './job-checklist-page.html';
import controller from './job-checklist-page.controller';

describe('Page: Job Checklist', function testHomePage () {
    describe('Component Tests', function testComponent () {
        it('includes the right template', function itIncludesTemplate () {
            expect(component.template).to.equal(template);
        });

        it('uses the correct `controllerAs` label', function itHasCorrectLabel () {
            expect(component.controllerAs).to.equal('jobsChecklistPageCtrl');
        });

        it('inclues the right controller', function itIncludesController () {
            expect(component.controller).to.equal(controller);
        });
    });
});
