// import JobsModule from './jobs';
import JobsComponent from './jobs.component';
import JobsController from './jobs.controller';
import JobsTemplate from './jobs.html';

describe('Jobs', function describeJobs () {
    // let component;
    // let $componentController;
    // let CategoriesModel;

    // beforeEach(() => {
    //     window.module('categories');

    //     window.module($provide => {
    //         $provide.value('CategoriesModel', {
    //             getCategories: () => {
    //                 return {
    //                     then: () => {}
    //                 };
    //             }
    //         });
    //     });
    // });

    // beforeEach(inject((_$componentController_, _CategoriesModel_) => {
    //     CategoriesModel = _CategoriesModel_;
    //     $componentController = _$componentController_;
    // }));

    // describe('Module', () => {
    //     it('is named correctly', () => {
    //         expect(CategoriesModule.name).toEqual('categories');
    //     });
    // });
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
