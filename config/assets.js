var ENVIRONMENTS = require('./environment').ENV;

var assets = {
    client : {
        js : ''
    },
    server : {

    },
    built : {}
};

assets.built[ENVIRONMENTS.DEV] = {
    js : 'static/js/*.js'
};
