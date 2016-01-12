"use strict";



namespace MyApp.Controllers {
    export class CarController{
        public cars: any[] = [];
        public makes: any[] = [];
        public search;
        public items;


        constructor(
            private $routeParams: ng.route.IRouteParamsService,
            private carService: MyApp.Services.CarService,
            private $location: ng.ILocationService,
            private $http: ng.IHttpService
        ){
            this.makes = carService.getMakes();
            this.cars = carService.getCars();
        }
    }
    angular.module("MyApp").controller("CarController",CarController);
}
