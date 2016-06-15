'use strict';

angular.module('lenny.services', ['ngResource'])
  .constant("baseURL","https://lenny-learny.herokuapp.com/")
  .factory('pathFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "paths/:id", null);

  }])

  .factory('categoryFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "categories/:id", null);

  }])


  .factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
    return $resource(baseURL + "promotions/:id");

    // implement a function named getPromotion
    // that returns a selected promotion.
    //this.getPromotion = function() {
    //  return   $resource(baseURL+"promotions/:id");
    //};


  }])

  .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {


    return $resource(baseURL+"leadership/:id");

  }])

  .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {


    return $resource(baseURL+"feedback/:id");

  }])

  .factory('favoriteFactory', ['$resource','baseURL', '$localStorage', function ( $resource, baseURL, $localStorage) {
    var favFac = {};
    var favorites = $localStorage.getObject('favorites', '[]');

    favFac.addToFavorites = function (index) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == index)
          return;
      }
      favorites.push({id: index});
      $localStorage.storeObject('favorites', favorites);

    };

    favFac.deleteFromFavorites = function (index) {
      for (var i = 0; i < favorites.length; i++) {
        if (favorites[i].id == index) {
          favorites.splice(i, 1);
          $localStorage.storeObject('favorites', favorites);
        }
      }
    };

    favFac.getFavorites = function () {
      return  favorites
    };

    return favFac;

  }])


  .factory('$localStorage', ['$window', function($window) {
    return {
      store: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key,defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])



;

