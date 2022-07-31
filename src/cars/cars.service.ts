import { Injectable } from '@nestjs/common';
// todos los servicios son providers, no todos los providers son servicios
@Injectable()
export class CarsService {

    private cars = [
        {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: 2,
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: 3,
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    constructor(){}

    findAll(){
        return this.cars
    }

    findOneById(id:number){
        const car = this.cars.find(car => car.id === id)
        return car
    }
}
