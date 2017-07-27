(function() {
    'use strict';
    angular.module('Donation')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        
       
        var homeState = {
            name : 'home',
            url : '/home',
            component : 'homeComponent'
        };
        
        var donationState = {
            name : 'addDonation',
            url : '/AddDonation',
            component : 'donationComponent'
        };
        var agenciesState = {
            name : 'agencies',
            url : '/agencies',
            component : 'agenciesComponent'
        }
        var previewState = {
            name : 'preview',
            url : '/preview',
            component : 'previewComponent'
        };

        
        $stateProvider.state(homeState);
        $stateProvider.state(donationState);
        $stateProvider.state(agenciesState);
        $stateProvider.state(previewState);
        $urlRouterProvider.otherwise("/login");
        registerStatefulModal('details', 'detailComponent', 'home', {
            donationDetails: undefined
        }, undefined, undefined);

        function registerStatefulModal(stateName, component, parent, params, size, resolves) {
            params = params || {};
            resolves = resolves || angular.extend({}, resolves, {
                stateParams: ['$stateParams', function($stateParams) {
                    return $stateParams;
                }]
            });
            size = size || 'md';

            var modal;
            $stateProvider.state(stateName, {
                url: '/' + stateName, // I only use this for debugging
                modal: true,
                parent: parent || 'home',
                params: params,
                onEnter: ['$stateParams', '$uibModal', function($stateParams, $uibModal) {
                    modal = $uibModal.open({
                        animation: true,
                        component: component,
                        backdrop: 'static',
                        keyboard: false,
                        size: size,
                        resolve: resolves
                    });
                    modal.result.catch(function(reason) {

                    });
                    modal.result.then(function(result) {

                    });
                    modal.result.finally(function() {
                        /*modal.$destroy();*/
                    });
                }],
                onExit: function() {
                    if (modal) {
                        modal.close();
                    }
                }
            });
        }
    }   

})();