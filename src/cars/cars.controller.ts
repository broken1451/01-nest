import { Controller, Get, HttpCode, Param, Query, Res } from '@nestjs/common';

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
  @Get('/:id')
  getCarById(@Param('id') id: string, @Res() res: Response) {
    const car = this.carService.findOneById(Number(id))
    if (!car) {
      return res.status(404).json({
        ok: false,
        msg: 'El auto con ese id no existe'
      });
    }
    return res.status(200).json({
      ok: true,
      car
    });
  }

}
