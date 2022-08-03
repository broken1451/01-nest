import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';

import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto/index';
// todos los servicios son providers, no todos los providers son servicios
@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // }
    ];

    constructor() { }

    public findAll() {
        return this.cars
    }

    public findOneById(id: string) {
        const car = this.cars.find(car => car.id === String(id))
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

    public create(createCarDTO: CreateCarDTO) {
        const newCar: Car = {
            id: uuid(),
            // brand: createCarDTO.brand,
            // model: createCarDTO.model
            ...createCarDTO
        }
        this.cars.push(newCar)
        return newCar;
    }

    public update(id: string, updateCarDto: UpdateCarDTO) {
        // console.log({ id, updateCarDto });
        let carDB: Car = this.findOneById(id);
        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException('CAR ID IS NO VALID INSIDE BODY');
        }
        this.cars = this.cars.map((car) => {

            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto, // esta linea  pisa los valores de carDB
                    id
                }
                return carDB
            }
            return car
        })
        return carDB;
    }

    delete(id: string) {
        // console.log({ id });
        let carDB: Car = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);

        return carDB;
    }


    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars; 
    }
}
