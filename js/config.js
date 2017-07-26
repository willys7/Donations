(function() {
    'use strict';
    angular.module('Donations')
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        
        var login = {
            name : 'login',
            url : '/login',
            component : 'login'
        }
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

        $stateProvider.state(login);
        $stateProvider.state(homeState);
        $stateProvider.state(donationState);
        $stateProvider.state(agenciesState);
        $stateProvider.state(previewState);
        $urlRouterProvider.otherwise("/login");
    }

    var registerStatefulModal = function (url, stateName, controller, template, parent, params, size, resolves) {
        params = params || {};
        resolves = resolves || angular.extend({},
                resolves,
                {
                    stateParams: ['$stateParams', function ($stateParams) {
                        return $stateParams;
                    }]
                });
        size = size || 'md';

        var modal;
        $stateProvider.state(stateName,
            {
                url: url,
                modal: true,
                parent: parent || 'home',
                params: params,
                onEnter: [
                    '$stateParams',
                    '$uibModal',
                    '$previousState',
                    function ($stateParams, $uibModal, $previousState) {
                        //log('stateful modal enter', stateName, resolves);
                        $previousState.memo('modalInvoker');
                        modal = $uibModal.open({
                            animation: true,
                            templateUrl: template,
                            controller: controller,
                            controllerAs: 'vm',
                            backdrop: 'static',
                            keyboard: false,
                            size: size,
                            resolve: resolves
                        });
                        // $scope.cancel functions should use modal.dismiss('cancel') or modal.dismiss('success') etc. to close the modal
                        // so we can restore the previous state
                        modal.result.catch(function (reason) {
                            // log('modal dismiss', reason);
                            if (reason)
                                $previousState.go('modalInvoker');
                        });
                        modal.result.then(function (result) {
                            //log('modal close', result);
                        });
                        modal.result.finally(function () {
                            modal.$destroy();
                        });
                    }
                ],
                onExit: function () {
                    if (modal) {
                        modal.close();
                    }
                }
            });
    };
    
    

})();