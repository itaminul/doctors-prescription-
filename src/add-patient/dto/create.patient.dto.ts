import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class AddPatientDto {
  @IsOptional()
  @IsNumber()
  id?: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsOptional()
  @IsNumber()
  SL_No: number;
  @IsOptional()
  @IsString()
  AGE: string;
  @IsOptional()
  @IsNumber()
  PATIENT_STATUS: number;  
  @IsOptional()
  @IsString()
  GENDER: string;
  @IsOptional()
  @IsString()
  REG_NO: string;
  @IsOptional()
  @IsString()
  MOBILE_NO: string;
  @IsOptional()
  @IsString()
  ENTRY_DATE: Date;  
  @IsOptional()
  @IsNumber()
  activeStatus: number;
}
