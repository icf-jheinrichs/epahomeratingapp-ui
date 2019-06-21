class jobLocationController {
    constructor (
        $state,
        $stateParams,
        jobTitleFilter
    ) {
        'ngInject';

        this.$state           = $state;
        this.$stateParams     = $stateParams;
        this.jobTitleFilter   = jobTitleFilter;
    }

    $onInit () {
      this.elevationPhotos = this.house.Photo;
      this.elevationPhotosVisible = true;
    }

    get JobTitle() {
      return this.jobTitleFilter(this.house.AddressInformation, true)
    }

    get JobAddress() {
      return this.jobTitleFilter(this.house.AddressInformation)
    }

}

export default jobLocationController;
