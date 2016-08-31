var myApp = angular.module("myApp", ["ngRoute"]);

myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {

// API key
var key = 'd7d5b0e0c696e06913b109afaf41e260';

var baseURL = 'http://api.petfinder.com/';

//set empty variable to store the random animal;
$scope.pickAnimal = '';

$scope.randomAnimals;  //populates drop down menu
$scope.randomAn;  //stores anon function that retrieves random animal choice

$scope.pickAnimal;    //stores random animal
$scope.animal; //stores resonse.data.petfiner.pet ??
$scope.count; //stores response.data of second GET request
$scope.favorites;  //holds results of animal data function
$scope.pickAnimal; //store random animal
$scope.animalData();
//$scope.showAnimal;
$scope.data; //empty object variable that holds
$scope.addFav; ////function that will take in info and put into a object that will be sent to the server;


//set empty variable to store the random animal;
$scope.pickAnimal = '';

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


$scope.addFav =  function (animalId, animalType, description, image, name) {

  var favorite = {
    animalId: animalId,
    animalType: animalType,
    //used to limit the characters;
    description: description.substring(0, 100),
    image: image,
    name: name
  };
  console.log(favorite);

  $http({
    method: 'POST',
    url: '/favorites',
    data: favorite
  }).then(function (response) {
    updateCount();
    console.log('POST works!');
  });
};


  //$scope.showAnimal = false;

  //animal array
  $scope.randomAnimals = [

    { type: '(select one)', value: '' },
    { type: 'Barn Animals', value: 'barnyard' },
    { type: 'Bird', value: 'bird' },
    { type: 'Cat', value: 'cat' },
    { type: 'Dog', value: 'dog' },
    { type: 'Horse', value: 'horse' },
    { type: 'Pig', value: 'pig' },
    { type: 'Reptile', value: 'reptile' },
    { type: 'Small & Furry', value: 'smallfurry' },


  ]

  //update favorite count
  updateCount();

  //define function that will include random animal choice and query items;
  $scope.ranAn = function () {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.pickAnimal;
    query += '&output=basic';
    query += '&format=json';

    var request = baseUrl + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    //api call;
    $http.jsonp(request).then(
        function (response) {
            console.log(response.data);
            $scope.animal = response.data.petfinder.pet;
            console.log(response.data.petfinder.pet);

          });
  };




  $scope.retrieveFavorites().then(function() {
    $scope.favorites = $scope.animalData();
  });

  $scope.storeAnimal = function() {
     //$scope.showAnimal = true;
     var animalType = $scope.animalList;
     petFinder(animalType);
   }


  $scope.data = {};

  myApp.controller('favoritesController', ['$scope', '$http', function ($scope, $http) {
    console.log('favoritesController');

    $scope.retrieveFavorites().then(function() {
         $scope.favorites = $scope.animalData();
       });

    $http({
      method: 'GET',
      url: '/favorites/favorite'
    }).then(function (response) {
      console.log('response object ', response);
      $scope.favorites = response.data;
      console.log('favorites ', $scope.favorites);
      updateCount();
    });

    function updateCount(){
      $http({
        method: 'GET',
        url: '/favorites/count'
      }).then(function (response) {
        console.log(response);
        $scope.count = response.data;
        console.log($scope.count[0].count);
      });
    }

  }]);



  function petFinder(animalType) {

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
      //
      // $scope.addAnimal = function() {
      //   $scope.createFavorite($scope.animal.id.$t, $scope.animal.name.$t,
      //     $scope.animal.description.$t,
      //   $scope.retrieveFavorites().then(function() {
      //     $scope.favorites = $scope.animalData();
      //   };
      //}

    }]);


    myApp.controller('FavoritesController', ['$scope', '$http', function($scope, $http) {
      console.log('favorite controller');

      $scope.retrieveFavorites().then(function() {
         $scope.favorites = $scope.animalData();
       });

    }]);
