import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreatepatientsrxService } from './createpatientsrx.service';
import { UpdatePatientsRxDTO } from './dto/updatePatientrx.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('createpatientsrx')
export class CreatepatientsrxController {
  constructor(public readonly createPatientService: CreatepatientsrxService) {}
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.createPatientService.getAll(page, limit);
  }

  @Post()
  async create(@Body() createPatientRxDto: any) {
    return await this.createPatientService.create(createPatientRxDto);
  }
  @Post('/create-new')
  async createNew(@Body() createPatientRxDto: any) {
    return await this.createPatientService.createNew(createPatientRxDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePatDtp: UpdatePatientsRxDTO,
  ) {
    return await this.createPatientService.update(id, updatePatDtp);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/get-patient-by-id/:id')
  async getPatientById(@Param('id') id: number) {
    return await this.createPatientService.getPatientById(id);
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/get-patient-data')
  async get(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string) {
    return await this.createPatientService.getAllPaginateData(fromDate, toDate);
  }
}
