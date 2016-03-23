'use strict';

/**
 * @ngdoc overview
 * @name tramappApp
 * @description
 * # tramappApp
 *
 * Main module of the application.
 */
angular
  .module('tramappApp', [
    'ngAnimate',
    'ngRoute',
    'leaflet-directive'
  ])

  .config(function ($routeProvider) {



    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })





  });
