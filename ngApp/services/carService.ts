namespace MyApp.Services {
    export class CarService {
        private CarsResource;
        private MakesResource;

        public getCars()  {
            return this.CarsResource.query();
        }
        public getMakes(){
            return this.MakesResource.query()
        }

        constructor($resource: angular.resource.IResourceService)   {
            this.CarsResource = $resource("/api/cars/");
            this.MakesResource = $resource("/api/makes/");
        }
    }
    angular.module("MyApp").service("carService",CarService);
}
