(function () {
    'use strict';

    angular.module('subscriptionPlanModule').directive('subscriptionPlanCard', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/subscription-plan/components/subscription-plan-card/subscription-plan-card.directive.html',

            scope: {
                subscriptionPlan: '='
            }
        }
    });
})();
