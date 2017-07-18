(function () {
'use strict';
	angular.module('Donations').factory('CountryService',countryService);
        countryService.$inject = ['$http','CountryRepository'];
        function countryService($http, CountryRepository){
            var countries = {};
            var states = {};
            var service = {
                getCountries : getCountries,
                getUSStates : getUSStates,
                countries : countries,
                states : states
            };

            return service;

            function getCountries(){
                return CountryRepository.getCountries().then(function(data){
                    service.countries = data.data.Data;
                    for(var i=0; i<service.countries; i++){
                        var name = service.countries[i].CountryName;
                        name = name.replace(" ", "")
                        service.countries[i].CountryName = name;
                    }
                    console.log(data);
                    return service.countries;
                }).catch(function(err){
                    console.log(err);
                })
            }

            function getUSStates(){
                return CountryRepository.getUSStates().then(function(data){
                    service.states = data.data.Data;
                    console.log(data);
                    return service.states;
                }).catch(function(err){
                    console.log(err);
                })
            }

        }
})();