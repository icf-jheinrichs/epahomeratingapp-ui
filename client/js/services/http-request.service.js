import AWS from 'aws-sdk';

class HttpRequestService {
    constructor ($q, $http) {
        'ngInject';
        this.$q                    = $q;
        this.$http                 = $http;
    }

    config (id, access) {
        // this.config = { headers: {
        //         'Authorization'               : id,
        //         'Accept'                      : 'application/json',
        //         'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 
        //         'Access-Control-Allow-Origin' : '*', 
        //         'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
        //     }
        // };
        return 0;
    }

    get (url) {
        return this.$q((resolve, reject) => {
            this.$http.get(url, this.config)
            .success( res => {
                console.log(res);
                resolve(res);
            })
            .error(err => {
                console.log(err);
                // reject(err);
            })
        });
    }
}

export default HttpRequestService