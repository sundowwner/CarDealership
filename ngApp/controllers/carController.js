"use strict";
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var CarController = (function () {
            function CarController($routeParams, carService, $location, $http) {
                this.$routeParams = $routeParams;
                this.carService = carService;
                this.$location = $location;
                this.$http = $http;
                this.cars = [];
                this.makes = [];
                this.makes = carService.getMakes();
                this.cars = carService.getCars();
            }
            return CarController;
        })();
        Controllers.CarController = CarController;
        angular.module("MyApp").controller("CarController", CarController);
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
