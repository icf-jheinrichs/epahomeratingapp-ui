import angular from 'angular';

import jobsSearchComponent from './jobs-search.component';
import searchFilterBuilderComponent from './search-filter-builder/search-filter-builder.component';
import searchFilterHousePlanComponent from './search-filter-house-plan/search-filter-house-plan.component';
import searchFilterInspectionStageComponent from './search-filter-inspection-stage/search-filter-inspection-stage.component';
import searchFilterKeywordsComponent from './search-filter-keywords/search-filter-keywords.component';
import searchFilterMustCorrectComponent from './search-filter-must-correct/search-filter-must-correct.component';
import searchFilterJobTypeComponent from './search-filter-job-type/search-filter-job-type.component';
import searchFilterRatingTypeComponent from './search-filter-rating-type/search-filter-rating-type.component';
import searchFilterInternalReviewComponent from './search-filter-internal-review/search-filter-internal-review.component';
import searchFilterReturnedFromProviderComponent from './search-filter-returned-from-provider/search-filter-returned-from-provider.component';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs.search', [])
        .component('jobsSearch', jobsSearchComponent)
        .component('searchFilterBuilder', searchFilterBuilderComponent)
        .component('searchFilterHousePlan', searchFilterHousePlanComponent)
        .component('searchFilterInspectionStage', searchFilterInspectionStageComponent)
        .component('searchFilterKeywords', searchFilterKeywordsComponent)
        .component('searchFilterMustCorrect', searchFilterMustCorrectComponent)
        .component('searchFilterJobType', searchFilterJobTypeComponent)
        .component('searchFilterRatingType', searchFilterRatingTypeComponent)
        .component('searchFilterInternalReview', searchFilterInternalReviewComponent)
        .component('searchFilterReturnedFromProvider', searchFilterReturnedFromProviderComponent);

export default jobsModule;
