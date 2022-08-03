import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';

import { Response } from 'express';
import { CarsService } from './cars.service';

// Controlan rutas, son los encargados de escuchar la
// solicitud y emitir una respuesta en postman.
// Ej: Rutas CRUD
@Controller('cars')
export class CarsController {

  constructor(private readonly carService: CarsService){}

  @Get()
  getAllCars() {
    return this.carService.findAll();
  }

  // @Get('/:id')
  // getCarById(@Param('id') id, @Query('test') test){
  @Get('/:id') // http://localhost:3000/cars/3 <-- id 
  getCarById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    //  return this.carService.findOneById(Number(id))
    const car = this.carService.findOneById(id)
       
      // if (!car) {
      //   return res.status(404).json({
      //     ok: false,
      //     msg: 'El auto con ese id no existe'
      //   });
      // }
    return res.status(200).json({
      ok: true,
      car
    });
  }

  @Post()
  createCar( @Body() body:any ) {
    return {
      ok: true,
      body
    }
  }

  @Patch('/:id') // http://localhost:3000/cars/3 <-- id 
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() body:any ) {
    return {
      ok: true,
      body
    }
  }

  @Delete('/:id')
  deleteCar(@Param('id', ParseIntPipe) id: number, ) {
    return {
      ok: true,
      method: "Delete",
      id
    }
  }
}
