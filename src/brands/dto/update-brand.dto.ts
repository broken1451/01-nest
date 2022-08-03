// import { PartialType } from '@nestjs/mapped-types';
// import { CreateBrandDto } from './create-brand.dto';

import { IsString, MinLength } from "class-validator";


// @nestjs/mapped-types nos ayuda a extender un DTO basado en otro DTO con la excepcion de que el PartialType hace que todas las propiedades del DTO del cual estoy expandiendo todas sean opciones
// export class UpdateBrandDto extends PartialType(CreateBrandDto) {}

export class UpdateBrandDto{

    @IsString()
    @MinLength(1)
    name: string;
}
