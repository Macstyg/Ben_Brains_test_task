(function () {
    'use strict';

    angular.module('subscriptionPlanModule').directive('subscriptionPlan', function (SUBSCRIPTION_PLAN, $mdDialog) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/subscription-plan/subscription-plan.directive.html',

            link: function ($scope) {
                $scope.subscriptionPlans = SUBSCRIPTION_PLAN.defaultSubscriptionPlans;
                $scope.isUpdated = false;

                $scope.selectSubscriptionPlan = function (subscriptionPlanType) {
                    if (!$scope.selectedSubscriptionPlan || $scope.selectedSubscriptionPlan !== subscriptionPlanType) {
                        if (subscriptionPlanType === SUBSCRIPTION_PLAN.subscriptionTypes.lab) {
                            $mdDialog.show(
                                $mdDialog
                                    .confirm()
                                    .title('Just Lab?')
                                    .textContent('Only select this option if you have no field techs don’t need quoting and invoicing systems')
                                    .ok('Continue')
                                    .cancel('Add field')
                            )
                                .then(function () {
                                    selectSubscriptionPlan(subscriptionPlanType)
                                })
                                .catch(function () {
                                    selectSubscriptionPlan(SUBSCRIPTION_PLAN.subscriptionTypes.pro)
                                })
                        } else {
                            selectSubscriptionPlan(subscriptionPlanType)
                        }
                    }
                };

                $scope.updateSubscription = function () {
                    if ($scope.selectedSubscriptionPlan) {
                        $scope.subscriptionPlans = [$scope.selectedSubscriptionPlan];
                        $scope.isUpdated = true;
                    }
                };

                $scope.cancelSubscription = function () {
                    if ($scope.selectedSubscriptionPlan) {
                        delete $scope.selectedSubscriptionPlan;

                        $scope.subscriptionPlans = _.cloneDeep(SUBSCRIPTION_PLAN.defaultSubscriptionPlans);
                        $scope.isUpdated = false;
                    }
                };

                function selectSubscriptionPlan(subscriptionPlanType) {
                    if (!_.isEqual($scope.subscriptionPlans, SUBSCRIPTION_PLAN)) {
                        $scope.subscriptionPlans = _.cloneDeep(SUBSCRIPTION_PLAN.defaultSubscriptionPlans);
                    }

                    $scope.selectedSubscriptionPlan = _.find($scope.subscriptionPlans, {type: subscriptionPlanType});
                }


            }
        }
    });
})();
