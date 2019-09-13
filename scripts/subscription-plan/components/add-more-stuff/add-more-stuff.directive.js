(function () {
    'use strict';

    angular.module('subscriptionPlanModule').directive('addMoreStuff', function (SUBSCRIPTION_PLAN) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/subscription-plan/components/add-more-stuff/add-more-stuff.directive.html',

            scope: {
                subscriptionPlan: '='
            },

            link: function ($scope) {
                var defaultPrice = $scope.subscriptionPlan.price;

                var defaulDiscountState = {
                    percentage: '0\%',
                    amount: '\$0'
                };

                $scope.discount = _.cloneDeep(defaulDiscountState);

                $scope.isDiscountNotificationMessageShown = false;

                $scope.updateSubscriptionPrice = function () {
                    var stuffPrice = 0,
                        discountAmount = 0;

                    stuffPrice += $scope.subscriptionPlan.adminCount > 1 ?
                        ($scope.subscriptionPlan.adminCount - 1) * SUBSCRIPTION_PLAN.stuffPrices.admin : 0;

                    stuffPrice += $scope.subscriptionPlan.techCount > 1 ?
                        ($scope.subscriptionPlan.techCount - 1) * SUBSCRIPTION_PLAN.stuffPrices.tech : 0;

                    discountAmount =
                        (defaultPrice + stuffPrice) * SUBSCRIPTION_PLAN.discountPercentageByTechsCount[$scope.subscriptionPlan.techCount] / 100;

                    $scope.subscriptionPlan.price = (defaultPrice + stuffPrice - discountAmount).toFixed(2);

                    $scope.discount = {
                        percentage: SUBSCRIPTION_PLAN.discountPercentageByTechsCount[$scope.subscriptionPlan.techCount] + '\%',
                        amount: '\$' + (discountAmount ? discountAmount.toFixed(2) : discountAmount)
                    };

                    $scope.isDiscountNotificationMessageShown = $scope.subscriptionPlan.techCount === 10;
                };

                $scope.$watch('subscriptionPlan', function () {
                    $scope.discount = _.cloneDeep(defaulDiscountState);
                    $scope.isDiscountNotificationMessageShown = false;
                });
            }
        }
    })
})();
