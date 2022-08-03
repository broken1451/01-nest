// data transfer object

import { IsString, MinLength } from "class-validator";


export class CreateCarDTO {
    // los dtos es como esperamos mover la data en la aplicacion
    
    @IsString({message:`The brand most be a cool string`})
    readonly brand: string;

    @IsString({ message: `The model most be a cool string` })
    @MinLength(3,{message:`El campo minimo debe de ser 3 caracteres`})
    readonly model: string;

}