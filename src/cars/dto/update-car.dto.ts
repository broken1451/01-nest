// data transfer object

import { IsOptional, IsString, IsUUID, MinLength } from "class-validator";

const value: unknown= ""
export class UpdateCarDTO {
    // los dtos es como esperamos mover la data en la aplicacion

    @IsString({ message: `The brand most be a cool string` })
    @IsUUID('4')
    @IsOptional()
    readonly id?: string;
    
    @IsString({ message: `The brand most be a cool string` })
    @IsOptional()
    readonly brand?: string;

    @IsString({ message: `The model most be a cool string` })
    @MinLength(3, { message: `El campo minimo debe de ser 3 caracteres` })
    @IsOptional()
    readonly model?: string;

}