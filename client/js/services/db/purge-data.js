import PouchDB from 'pouchdb';

function purgeData (DB) {
    let purgeAll
        = new PouchDB(DB.JOB)
                .destroy()
                .then(function handleDropJob () {
                    let purgeDigest
                        = new PouchDB(DB.DISPLAY_LOGIC_DIGEST)
                                .destroy();

                    return purgeDigest;
                })
                .then(function handleDropDigest () {
                    let purgeJobDataResponse
                        = new PouchDB(DB.JOB_DATA_RESPONSE)
                                .destroy();

                    return purgeJobDataResponse;
                })
                .then(function handleDropJobDataResponse () {
                    let purgeJobDataHomePerformance
                        = new PouchDB(DB.JOB_DATA_HOME_PERFORMANCE)
                                .destroy();

                    return purgeJobDataHomePerformance;
                })
                .then(function handleDropJobDataHomePerformance () {
                    let purgeJobDisplayList
                        = new PouchDB(DB.JOB_DISPLAY_LIST)
                                .destroy();

                    return purgeJobDisplayList;
                });

    return purgeAll;
}

export default purgeData;
