// import AWS from 'aws-sdk';

class HttpRequestService {
    constructor ($q, $http) {
        'ngInject';
        this.$q                    = $q;
        this.$http                 = $http;
    }

    /**
     * sets up global default of $http headers.
     * @param String id     (token)
     * @param String access (token)
     */
    config (id, access) {
        // @todo including access token under what header?
        // @todo place injector/transformer into ALL http calls.
        // this.config = {headers : {
        //     'Authorization'           : id
        // }};

        // this.http.defaults.headers.common.Authorization = access;
        console.log(access);
    }

    /**
     * testing simple GET with header.
     * @param url
     * @returns {*}
     */
    get (url) {
        console.log(this.http);
        return this.$q((resolve, reject) => {
            // this.$http.get(url, this.config)
            this.$http.get(url)
            .then(res=> {
                resolve(res);
            })
            .catch(err=>{
                // @todo enable rejection?
                // reject(err);
            })
            .finally(()=> {
                // for developmental purposes only. remove on prod.
                console.log(`Completed HTTP Request to ${url}.`);
            });
        });
    }
}

export default HttpRequestService;
