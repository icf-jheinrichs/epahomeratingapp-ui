describe('Component: job', function testJob () {
    describe('rating label', function testRatingLabel () {
        it('should return class: label-energy-star if Energy Star Rating', function testRatingTypeEnergyStar () {
            expect('label-energy-star').to.equal('label-energy-star');
        });

        it('should return class: label-hers-rating if HERS Rating', function testRatingTypeHERS () {
            expect('label-hers-rating').to.equal('label-hers-rating');
        });
    });
});
