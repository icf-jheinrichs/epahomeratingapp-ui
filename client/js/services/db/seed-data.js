import digestData from './seed-data/digest.data';

import jobs from './seed-data/jobs.data';
import jobDisplayList from './seed-data/job-display-list.data';
import jobDataResponse from './seed-data/job-data-response.data';
import jobDataHomePerformance from './seed-data/job-data-home-performance.data';

import PouchDB from 'pouchdb';

function seedData (DB) {
    let seedAll
        = new PouchDB(DB.JOB)
            .bulkDocs(jobs)
            .then(function handleSeedJobs () {
                let seedDisplayLogicDigest
                    = new PouchDB(DB.DISPLAY_LOGIC_DIGEST)
                            .put(digestData);

                return seedDisplayLogicDigest;
            })
            .then(function handleSeedDisplayLogicDigest () {
                let seedJobDisplayList
                    = new PouchDB(DB.JOB_DISPLAY_LIST)
                            .bulkDocs(jobDisplayList);

                return seedJobDisplayList;
            })
            .then(function handleSeedJobDisplayList () {
                let seedJobDataResponse
                    = new PouchDB(DB.JOB_DATA_RESPONSE)
                            .bulkDocs(jobDataResponse);

                return seedJobDataResponse;
            })
            .then(function handleSeedJobDataResponse () {
                let seedJobDataHomePerformance
                    = new PouchDB(DB.JOB_DATA_HOME_PERFORMANCE)
                            .bulkDocs(jobDataHomePerformance);

                return seedJobDataHomePerformance;
            });

    return seedAll;
}

export default seedData;
