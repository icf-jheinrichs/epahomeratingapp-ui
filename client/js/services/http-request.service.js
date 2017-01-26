import AWS from 'aws-sdk';

class HttpRequestService {
    constructor ($q, $http) {
        'ngInject';
        // @todo best method of pulling id and access from single source?
        this.$q                    = $q;
        this.$http                 = $http;
    }

    config (id, access) {
        // @todo including access token under what header? 
        this.config = { headers: {
                'Authorization'               : id
            }
        };
    }

    get (url) {
        return this.$q((resolve, reject) => {
            this.$http.get(url, this.config)
            .then( res => {
                console.log(res);
                resolve(res);
            })
            .catch( err => {
                // for developmental purposes only, perhaps 
                // log this in the future.
                console.log(err);

                // @todo enable rejection?
                // reject(err);
            })
            .finally( () => {
                // for developmental purposes only. remove on prod. 
                console.log(`Completed HTTP Request to ${url}.`);
            })
        });
    }
}

export default HttpRequestService