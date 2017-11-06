import angular from 'angular';

import jobsSearchComponent from './jobs-search.component';
import searchFilterInspectionStageComponent from './search-filter-inspection-stage/search-filter-inspection-stage.component';
import searchFilterKeywordsComponent from './search-filter-keywords/search-filter-keywords.component';
import searchFilterMustCorrectComponent from './search-filter-must-correct/search-filter-must-correct.component';
import searchFilterRatingTypeComponent from './search-filter-rating-type/search-filter-rating-type.component';
import searchFilterReturnedFromInternalComponent from './search-filter-returned-from-internal/search-filter-returned-from-internal.component';
import searchFilterReturnedFromProviderComponent from './search-filter-returned-from-provider/search-filter-returned-from-provider.component';

let jobsModule
    = angular
        .module('epahomeratingapp.components.jobs.search', [])
        .component('jobsSearch', jobsSearchComponent)
        .component('searchFilterInspectionStage', searchFilterInspectionStageComponent)
        .component('searchFilterKeywords', searchFilterKeywordsComponent)
        .component('searchFilterMustCorrect', searchFilterMustCorrectComponent)
        .component('searchFilterRatingType', searchFilterRatingTypeComponent)
        .component('searchFilterReturnedFromInternal', searchFilterReturnedFromInternalComponent)
        .component('searchFilterReturnedFromProvider', searchFilterReturnedFromProviderComponent);

export default jobsModule;
