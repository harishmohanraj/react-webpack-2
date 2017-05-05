var axios = require('axios');
var mockdata  = require('../mockdata/cachedResponse');

function returnCachedResponse() {
    return mockdata;
}

module.exports = {
    fetchPopularReops: function(language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

        return axios.get(encodedURI)
            .then((res) => {
                return res.data.items;
            })
            .catch(() => {
                returnCachedResponse()
            })
    }
}