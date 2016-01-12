var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var CarService = (function () {
            function CarService($resource) {
                this.CarsResource = $resource("/api/cars/");
                this.MakesResource = $resource("/api/makes/");
            }
            CarService.prototype.getCars = function () {
                return this.CarsResource.query();
            };
            CarService.prototype.getMakes = function () {
                return this.MakesResource.query();
            };
            return CarService;
        })();
        Services.CarService = CarService;
        angular.module("MyApp").service("carService", CarService);
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
