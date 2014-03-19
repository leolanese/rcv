require.config({
    "baseUrl": "js/lib",

    paths: {
        "app": "../app",

        "jquery": ['//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min', './jquery-1.8.2.min'],
        "knockout": "http://cdnjs.cloudflare.com/ajax/libs/knockout/3.0.0/knockout-min",
        'mapping': './knockout.mapping-latest.debug',
        "knockout-amd-helpers": "https://rawgithub.com/rniemeyer/knockout-amd-helpers/master/build/knockout-amd-helpers",
        "text": "https://rawgithub.com/rniemeyer/knockout-amd-helpers/master/ext/require/text",

        'core': './core',
        'row' : './row.min'
    },

    deps: ['knockout', 'mapping'],

    callback: function (ko, mapping) {
        window.ko.mapping = mapping;
    },

    // we are telling RequireJS that core has a dependency on jQuery .. so it must load jQuery first.
    shim: {

        'core': {
            deps: ['jquery', 'knockout','mapping','knockout-amd-helpers','text' ]
        },

        'row': {
            deps: ['core']
        },

        'one': {
            deps: ['core']
        },

        'two': {
            deps: ['one', 'core', 'three']
        }

    }

});

require(['knockout'], function (ko) {
    // manually set the global ko property
    window.ko = ko;

    // then bring in knockout validation
    require(["core", 'row', 'one', 'two'], function() {
        var ViewModel = function () {
            var self = this;

            self.field = ko.observable("Required Value").extend({ required: true });
        };

        ko.bindingHandlers.module.baseDir = "";

    });

});
