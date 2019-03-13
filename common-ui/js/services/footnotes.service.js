class FootNotesService {

    constructor ($http) {
        'ngInject';
        this.$http = $http;
    }

    getData (callback) {
        this.$http({
          method: 'GET',
          url: '../../../server/api/display-logic/data/display-logic.data.json',
          cache: true
        }).success(callback);
    }

    return {
        list: getData,
        find: function(name, callback){
            getData(function(data) {
            var country = data.filter(function(entry){
                return entry.name === name;
            })[0];
            callback(country);
            });
        }
    }
}

export default FootNotesService;
