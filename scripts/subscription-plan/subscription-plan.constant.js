(function () {
    'use strict';

    angular.module('subscriptionPlanModule').constant('SUBSCRIPTION_PLAN', (function () {
        var subscriptionTypes = {
            lab: 'LAB',
            field: 'FIELD',
            pro: 'PRO'
        };

            return {
                subscriptionTypes: subscriptionTypes,

                defaultSubscriptionPlans: [
                    {
                        type: subscriptionTypes.lab,
                        description: 'Water testing for your store',
                        price: 45,
                        labCount: 1
                    },
                    {
                        type: subscriptionTypes.field,
                        description: 'Perfect for you pool servicing business',
                        price: 59,
                        techCount: 1,
                        adminCount: 1
                    },
                    {
                        type: subscriptionTypes.pro,
                        description: 'You have a shop and service team',
                        price: 104,
                        labCount: 1,
                        techCount: 1,
                        adminCount: 1
                    }
                ],

                discountPercentageByTechsCount: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 10,
                    6: 15,
                    7: 20,
                    8: 25,
                    9: 30,
                    10: 35
                },

                stuffPrices: {
                    admin: 10,
                    tech: 49
                }
            };
        })()
    );
})();
