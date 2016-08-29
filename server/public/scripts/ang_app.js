var myApp = angular.module("myApp", ["ngRoute"]);


myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/nav', {
      templateUrl: '/views/partials/nav.html',
      controller: 'HomeController'
    })
    .when('/favorites', {
      templateUrl: '/views/partials/favorites.html',
      controller: 'FavoritesController'
    })
    .otherwise({
      redirectTo: '/views/index.html'
    })
}]);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http) {

  $scope.showAnimal = false;


  $scope.retrieveFavorites().then(function() {
    $scope.favorites = $scope.animalData();
  });

  $scope.storeAnimal = function() {
    $scope.showAnimal = true;
    var animalType = $scope.animalList;
    petFinder(animalType);
  }


  $scope.data = {};




  function petFinder(animalType) {
    // API key
    var key = 'd7d5b0e0c696e06913b109afaf41e260';

    var baseURL = 'http://api.petfinder.com/';
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + animalType;
    query += '&output=full';
    query += '&format=json';

      var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
          function(response) {
            $scope.animal = response.data.petfinder.pet;
          }
        );
      }

      petFinder();

      $scope.addAnimal = function() {
        $scope.createFavorite($scope.animal.id.$t, $scope.animal.name.$t,
          $scope.animal.description.$t,
        $scope.retrieveFavorites().then(function() {
          $scope.favorites = $scope.animalData();
        });
      }

    }]);


    myApp.controller('FavoritesController', ['$scope', '$http', function($scope, $http) {
      console.log('favorite controller');

      $scope.retrieveFavorites().then(function() {
        $scope.favorites = $scope.animalData();
      });

    }]);
