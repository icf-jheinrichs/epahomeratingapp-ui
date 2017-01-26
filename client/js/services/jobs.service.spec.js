'use strict';

// import mockdata from 'db/seed-data/jobs.data.js';

describe('Service: Jobs', function testJobsService () {
    let JobsService;
    let $httpBackend;

    beforeEach(module('epahomeratingapp.services'));

    beforeEach(inject((_JobsService_, _$httpBackend_) => {
        JobsService = _JobsService_;
        $httpBackend = _$httpBackend_;
    }));

    describe('getById', function testGetById () {
        it('should get single job', function testGetByIdSuccess () {
            let results;
            const _id = '12345678';

            JobsService
                .getById(_id)
                .then((queryResults) => {
                    results = queryResults;
                });

            $httpBackend.flush();

            expect(results._id).to.equal(_id);
        });
    });

/*
    describe('getNewJob', function testGetNewJob () {
        it('should not be drawn if progress.verified === 0', function verifiedNotDrawn () {
            expect(15).to.be.at.least(0);
        });
    });

    describe('put', function testPut () {
        it('should not be drawn if progress.mustCorrect === 0', function mustCorrectNotDrawn () {
            expect(15).to.be.at.least(0);
        });
    });
*/
});
