import JobsComponent from './jobs.component';
import JobsController from './jobs.controller';
import JobsTemplate from './jobs.html';

describe('Jobs', function describeJobs () {
    describe('Jobs Component', function describeJobsComponent () {
        const component = JobsComponent;

        it('includes the right template', function itIncludesTemplate () {
            expect(component.template).to.equal(JobsTemplate);
        });

        it('uses the correct `controllerAs` label', function itIncludesTemplate () {
            expect(component.controllerAs).to.equal('jobsCtrl');
        });

        it('inclues the right template', function itIncludesTemplate () {
            expect(component.controller).to.equal(JobsController);
        });
    });
});
