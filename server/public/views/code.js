var myApp = angular.module('myApp', []);


myApp.controller('APIController', ['$scope', '$http', function($scope, $http) {
 var key = '4af0798b031e2bc75209c88894b5f15c';
 var baseURL = 'http://api.petfinder.com/';
 $scope.breed = '';

 $scope.getRandomDog = function() {
   var query = 'pet.getRandom';
   query += '?key=' + key;
   query += '&animal=dog';
   query += '&output=basic';
   query += '&format=json';

   var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

   console.log(request);

   $http.jsonp(request).then(
     function(response) {
       console.log(response.data);
       $scope.animal = response.data.petfinder.pet;
       $scope.breed = $scope.animal.animal.$t;
      //  $scope.getBreeds();
     }
   )
 }

 // $scope.getBreeds = function() {
 //   var query = 'breed.list';
 //   query += '?key=' + key;
 //   query += '&animal=' + $scope.breed.toLowerCase();
 //   query += '&format=json';
 //
 //   var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
 //
 //   console.log(request);
 //
 //   $http.jsonp(request).then(
 //     function(response) {
 //       console.log('breeds: ', response.data);
 //       $scope.breeds = response.data.petfinder.breeds.breed;
 //     }
 //   )
 // }

}]);

// Second animal
myApp.controller('secondController', ['$scope', '$http', function($scope, $http) {
 var key = '4af0798b031e2bc75209c88894b5f15c';
 var baseURL = 'http://api.petfinder.com/';
 $scope.breed = '';

 $scope.getRandomFurry = function() {
   var query = 'pet.getRandom';
   query += '?key=' + key;
   query += '&animal=smallfurry';
   query += '&output=basic';
   query += '&format=json';

   var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

   console.log(request);

   $http.jsonp(request).then(
     function(response) {
       console.log(response.data);
       $scope.animal = response.data.petfinder.pet;
      //  $scope.breed = $scope.animal.animal.$t;
      //  $scope.getBreeds();
     }
   )
 }

 $scope.getBreeds = function() {
   var query = 'breed.list';
   query += '?key=' + key;
   query += '&animal=' + $scope.breed.toLowerCase();
   query += '&format=json';

   var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

   console.log(request);

   $http.jsonp(request).then(
     function(response) {
       console.log('breeds: ', response.data);
       $scope.breeds = response.data.petfinder.breeds.breed;
     }
   )
 }

}]);
