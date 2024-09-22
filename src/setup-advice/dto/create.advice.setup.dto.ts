import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateSetupAdviceDto {
    @IsOptional()
    @IsNumber()
    id: number  
    @IsOptional()
    @IsNumber()
    adviceId: number
    @IsNotEmpty()
    @IsString()
    name: string
    @IsOptional()
    @IsString()
    description: string
    @IsOptional()
    @IsNumber()
    slNo: number
}