import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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

    constructor() { }

    public findAll() {
        return this.cars
    }

    public findOneById(id: number) {
        const car = this.cars.find(car => car.id === id)
        if (!car) {
            // throw new NotFoundException({
            //     status: 404,
            //     msg: `Car with id ${id} not found`
            // });
            // manejo de excpciones(Exception filters)
            throw new NotFoundException(`Car with id ${id} not found`);
            
        }
        return car
    }
}
