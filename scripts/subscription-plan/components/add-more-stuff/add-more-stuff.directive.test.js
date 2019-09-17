describe('AddMoreStuffDirective', function () {

    beforeEach(module('subscriptionPlanModule', 'templates'));

    beforeEach(inject(function ($rootScope, $compile, SUBSCRIPTION_PLAN) {
        this.$rootScope = $rootScope;
        this.SUBSCRIPTION_PLAN = SUBSCRIPTION_PLAN;
        this.$rootScope.selectedSubscriptionPlan = _.cloneDeep(SUBSCRIPTION_PLAN.defaultSubscriptionPlans[1]);
        this.element = $compile('<add-more-stuff subscription-plan="selectedSubscriptionPlan"></add-more-stuff>')(this.$rootScope);

        this.$rootScope.$digest();
        this.defaultSubscriptionPlanPrice = this.$rootScope.selectedSubscriptionPlan.price;

        this.addMoreStuffScope = this.element.isolateScope();
    }));

    afterEach(function () {
        this.element.remove();
        this.$rootScope.$destroy();
    });

    it('should update price when tech count is increased', function () {
        ++this.$rootScope.selectedSubscriptionPlan.techCount;
        this.addMoreStuffScope.updateSubscriptionPrice();

        var newPrice = this.defaultSubscriptionPlanPrice + this.SUBSCRIPTION_PLAN.stuffPrices.tech;

        expect(this.$rootScope.selectedSubscriptionPlan.price).toBe(newPrice.toFixed(2));
    });

    it('should update price when admin count is increased', function () {
        ++this.$rootScope.selectedSubscriptionPlan.adminCount;
        this.addMoreStuffScope.updateSubscriptionPrice();

        var newPrice = this.defaultSubscriptionPlanPrice + this.SUBSCRIPTION_PLAN.stuffPrices.admin;

        expect(this.$rootScope.selectedSubscriptionPlan.price).toBe(newPrice.toFixed(2));
    });

    it('should make discount if tech count more than 5', function () {
        var techCount = 5,
            discountInFraction = this.SUBSCRIPTION_PLAN.discountPercentageByTechsCount[techCount] / 100,
            newPriceWithoutDiscount = this.defaultSubscriptionPlanPrice + (techCount - 1) * this.SUBSCRIPTION_PLAN.stuffPrices.tech,
            discountAmount = newPriceWithoutDiscount * discountInFraction,
            newPrice = newPriceWithoutDiscount - discountAmount;

        this.$rootScope.selectedSubscriptionPlan.techCount = techCount;
        this.addMoreStuffScope.updateSubscriptionPrice();

        expect(this.$rootScope.selectedSubscriptionPlan.price).toBe(newPrice.toFixed(2));
    });

    it('should show notification if tech count is 10', function () {
        this.$rootScope.selectedSubscriptionPlan.techCount = 10;
        this.addMoreStuffScope.updateSubscriptionPrice();

        expect(this.addMoreStuffScope.isDiscountNotificationMessageShown).toBe(true);
    });
});
