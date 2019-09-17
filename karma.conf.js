module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-ng-html2js-preprocessor'

        ],
        preprocessors: {
            'scripts/**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-aria/angular-aria.js',
            'node_modules/angular-messages/angular-messages.js',
            'node_modules/angular-material/angular-material.min.js',
            'node_modules/lodash/lodash.js',
            'scripts/subscription-plan/subscription-plan.module.js',
            'scripts/subscription-plan/subscription-plan.constant.js',
            'scripts/**/*.html',
            'scripts/subscription-plan/components/add-more-stuff/add-more-stuff.directive.js',
            'scripts/**/*.test.js',
        ],
        reporter: ['dots'],
        browsers: ['ChromeHeadless'],
        singleRun: true
    })
};
