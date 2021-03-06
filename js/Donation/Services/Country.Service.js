(function () {
'use strict';
	angular.module('Donation').factory('CountryService',countryService);
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
                    return service.countries;
                }).catch(function(err){
                    console.log(err);
                })
            }

            function getUSStates(){
                return CountryRepository.getUSStates().then(function(data){
                    service.states = data.data.Data;
                    return service.states;
                }).catch(function(err){
                    console.log(err);
                })
            }

        }
})();