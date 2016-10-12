describe('Component: job', function testJob () {
    describe('rating label', function testRatingLabel () {
        it('should return class: label-energy-star if Energy Star Rating');

        it('should return class: label-hers-rating if HERS Rating');
    });

    describe('job type', function testJobType () {
        it('should return "House" if Secondary array is empty');

        it('should return "Sample" if Secondary array is not empty');
    });

    describe('job title', function testJobTitle () {
        it('should display address if supplied in AddressInformation');

        it('should display manual ID if supplied in AddressInformation');

        it('should display manual ID if supplied in AddressInformation');
    });

    describe('total addresses', function testJobTitle () {
        it('should not display if Secondary array is empty');

        it('should display length of Secondary array if not empty');
    });

    describe('total addresses', function testJobTitle () {
        it('should not display if Secondary array is empty');

        it('should display length of Secondary array if not empty');
    });
});
