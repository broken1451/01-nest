import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';

import { Response } from 'express';
import { CarsService } from './cars.service';
import { CreateCarDTO } from './dto/create-car.dto';
import { UpdateCarDTO } from './dto/update-car.dto';

// PRINCIPIO DRY  ===> DON NOT REPEAT YOURSELF

// Controlan rutas, son los encargados de escuchar la
// solicitud y emitir una respuesta en postman.
// Ej: Rutas CRUD
@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {

  constructor(private readonly carService: CarsService) { }

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  // @Get('/:id')
  // getCarById(@Param('id') id, @Query('test') test){
  @Get('/:id') // http://localhost:3000/cars/3 <-- id (ParseIntPipe transforma la data en entero)
  // getCarById(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
  // getCarById(@Param('id', new ParseUUIDPipe({version:'4', errorHttpStatusCode:409,})) id: string, @Res() res: Response) {
  getCarById(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    //  return this.carService.findOneById(Number(id))
    const car = this.carService.findOneById(id)

    // if (!car) {
    //   return res.status(404).json({
    //     ok: false,
    //     msg: 'El auto con ese id no existe'
    //   });
    // }
    return res.status(HttpStatus.OK).json({
      ok: true,
      car
    });
  }

  @Post()
  // @UsePipes(ValidationPipe) 
  createCar(@Body() createCarDTO: CreateCarDTO) {
    const newCar = this.carService.create(createCarDTO)
    return {
      ok: true,
      newCar
    }
  }

  @Patch('/:id') // http://localhost:3000/cars/3 <-- id, /:id segemento por la url
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() updateCarDTO: UpdateCarDTO) {
    const carUpdate = this.carService.update(id, updateCarDTO)
    return {
      ok: true,
      carUpdate
    }
  }

  @Delete('/:id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    const carDeleted = this.carService.delete(id);
    return {
      ok: true,
      carDeleted
    }
  }
}
