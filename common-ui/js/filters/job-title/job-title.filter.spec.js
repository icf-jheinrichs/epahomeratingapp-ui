'use strict';

describe('Filter: Job Title', function testJob () {
    describe('Address', function testRatingLabel () {
        it('should display [Address1]');
        it('should include CityMunicipality if defined');
        it('should include StateCode if defined');
        it('should include ZipCode if defined');
    });

    describe('Community', function testJobType () {
        it('should display [CommunityName]');
        it('should display [CommunityName], [LotNo] if LotNo is defined');
    });

    describe('Manual Id', function testJobTitle () {
        it('should display Manual ID: [id]');
    });
});
