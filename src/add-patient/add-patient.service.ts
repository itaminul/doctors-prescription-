import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pat_patients_info } from 'src/entitys/pat_patients_info';
import { Repository } from 'typeorm';
import { AddPatientDto } from './dto/create.patient.dto';

@Injectable()
export class AddPatientService {
  constructor(
    @InjectRepository(pat_patients_info)
    public readonly addPatientRepository: Repository<pat_patients_info>,
  ) {}

  async create(@Body() createPatientDTO: AddPatientDto) {
    try {
      const dateResult = await this.addPatientRepository.query(
        'SELECT CURRENT_DATE() as today',
      );
      const todayDateString = dateResult[0].today;
      const maxPatient = await this.addPatientRepository
        .createQueryBuilder('pat_patients_info')
        .select('MAX(pat_patients_info.SL_NO)', 'max')
        .where('DATE(pat_patients_info.ENTRY_DATE) = CURRENT_DATE()')
        .getRawOne();

      const maxSlNo = maxPatient.max;
      const adOne = maxSlNo + Number(1);
      const newPatient = this.addPatientRepository.create({
        ...createPatientDTO,
        SL_NO: adOne,
        ENTRY_DATE: todayDateString,
      });

      // Save the patient record
      return await this.addPatientRepository.save(newPatient);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createOld(addPatientsDTO: AddPatientDto) {
    const { ...addPataDTO } = addPatientsDTO;
    const getData = this.addPatientRepository.create(addPataDTO);
    const saveData = await this.addPatientRepository.save(getData);
    return saveData;
  }
}
