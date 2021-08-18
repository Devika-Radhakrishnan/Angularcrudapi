
var myApp = angular.module("myApp", ["ngRoute"]);


myApp.config([
  "$routeProvider",

  function ($routeProvider) {
    $routeProvider

      .when("/menu", {
        templateUrl: "partials/menu.html",
      })
      .when("/form", {
        templateUrl: "partials/form.html",
      })
      .when("/table", {
        templateUrl: "partials/table.html",
      })
      .otherwise("/", {
        templateUrl: "index.html",
      });
  },
]);

myApp.controller("studentController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.user = {
      id: 0,
      name: "",
      email: "",
      number: "",
      // addresses:[
      //     {
      //         id=0,
      //         zipcode="",
      //         isAsian:false
      //     }

      // ]
    };
    $scope.users = [];
    //Buttons Settings
    $scope.submit = true;
    $scope.update = false;
    $scope.cancel = false;
    $scope.userid = true;
    $scope.IsHidden = true;
    //Getting Users List
    //$http GET function
    $scope.getUser = function () {
      $http({
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
      }).then(
        function successCallback(response,data, status, headers, config) {
          $scope.users.push(response.data);
            if (response.status === 200 ) {
              $scope.ShowHide = function () { 
                $scope.IsHidden = false;
              };
            };
        },
        function errorCallback(response) {
          $scope.message = "";
          if (response.status === 404) {
            $scope.errorMessage = "User not found!";
          } else if (response.status === 500) {
            $scope.errorMessage = "500 error internal error problem";
          } else {
            $scope.errorMessage = "some issue have been occured";
          }
        }
      );
    };
    //Create New User
    $scope.createUser = function () {
      //$http POST function
      $http({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/users",
        data: $scope.user,
      }).then(
        function successCallback(response) {
          $scope.users.push(response.data);
          $scope.getUser();
    
          alert("User has created Successfully,i m in post");
        },
        function errorCallback(response) {
          alert("Error. while created user Try Again!");
        }
      );
    };
    //Update User
    $scope.updateUser = function () {
      //$http PUT function
      $http({
        method: "PUT",
        url: "https://jsonplaceholder.typicode.com/users/" + $scope.user.id,
        data: $scope.user,
      }).then(
        function successCallback(response) {
          alert("User has updated Successfully");
        },
        function errorCallback(response) {
          alert("Error. while updating user Try Again!");
        }
      );
    };

    //Delete User
    $scope.deleteUser = function (user) {
      //$http DELETE function
      $http({
        method: "DELETE",
        url: "https://jsonplaceholder.typicode.com/users/" + user.id,
      }).then(
        function successCallback(response) {
          alert("User has deleted Successfully");
          var index = $scope.users.indexOf(user);
          $scope.users.splice(index, 1);
        },
        function errorCallback(response) {
          alert("Error. while deleting user Try Again!");
        }
      );
    };

    //Set $scope on Edit button click
    $scope.editUser = function (user) {
      $scope.user = user;
      $scope.submit = false;
      $scope.update = true;
      $scope.cancel = true;
      $scope.userid = false;
    };

    //cancel Uodate
    $scope.cancelUpdate = function () {
      $scope.user = null;
      $scope.submit = true;
      $scope.update = false;
      $scope.cancel = false;
      $scope.userid = true;
    };

    $scope.getAllUsers = function getAllUsers() {
      $scope.createUser();
      $scope.getUser();
    };
    //  $scope.users = response.data;
  },
]);





