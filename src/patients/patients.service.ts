import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pat_patients_info } from 'src/entitys/pat_patients_info';
import { Repository } from 'typeorm';
import { CreatePatientsDTO } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(pat_patients_info)
    public readonly setPatientInformation: Repository<pat_patients_info>,
  ) {}

  async getAll() {
    try {
      const results1 = await this.setPatientInformation.find({
        select: {
          id: true,
          name: true,
        },
      });

      const results = await this.setPatientInformation
        .createQueryBuilder('spi')
        .leftJoin('patientsrx', 'pr', 'spi.id = pr.patientId')
        .where('spi.PATIENT_STATUS = :status', { status: 1 })
        .andWhere('pr.patientId IS NULL')
        .select(['spi.id', 'spi.name', 'spi.SL_NO'])
        .orderBy('spi.id', 'ASC')
        .getMany();
      return results;
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

  async create(@Body() createPatientDTO: CreatePatientsDTO) {
    try {
      const { ...patient } = createPatientDTO;

      const patientData = this.setPatientInformation.create(patient);
      const savePatient = await this.setPatientInformation.save(patientData);
      return savePatient;
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

  async getAllPendingPatients() {
    try {
      const results = await this.setPatientInformation.find({
        where: {
          PATIENT_STATUS: 0,
        },
        select: {
          id: true,
          name: true,
          AGE: true,
          GENDER: true,
        },
      });
      return results;
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

  async getPendingPatientsInformationById(@Param('id') id: number) {
    try {
      const results = await this.setPatientInformation.find({
        where: {
          id: id,
          PATIENT_STATUS: 0,
        },
        select: {
          id: true,
          name: true,
          AGE: true,
          GENDER: true,
        },
      });
      return results;
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

  async getNewTwentityPendingPatients() {
    try {
      const results = await this.setPatientInformation
        .createQueryBuilder('spi')
        .leftJoin('patientsrx', 'pr', 'spi.id = pr.patientId')
        .leftJoin('pat_patients_info', 'pa', 'pr.patientId = pa.id')
        // .where('spi.PATIENT_STATUS = :status', { status: 0 })
        .where('spi.PATIENT_STATUS = :status', { status: 1 })
        // .andWhere('DATE(spi.ENTRY_DATE) = CURDATE()') 
        .andWhere('pr.patientId IS NULL')
        .select(['spi.id', 'spi.name', 'spi.SL_NO', 'spi.AGE', 'spi.GENDER','pa.REG_NO'])
        .orderBy('spi.id', 'DESC')
        .take(20)
        .getMany();



      const results1 = await this.setPatientInformation.find({
        where: {
          PATIENT_STATUS: 1
          
        },
        select: {
          id: true,
          name: true,
          SL_NO: true,
          REG_NO: true,
          AGE: true,
          GENDER: true
        },
        order: {
          SL_NO: 'asc',
        },
        take: 20,
      });
      return results1;
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
  async getPatientsById() {
    try {
      const results = await this.setPatientInformation.find({
        where: {
          PATIENT_STATUS: 0,
        },
        select: {
          id: true,
          name: true,
          AGE: true,
          GENDER: true,
        },
      });
      return results;
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

    async getOnlyPatientById(@Param('id') id: number) {

     
    try {
      console.log("Id", id);
      const ifExist = await this.setPatientInformation.findOne({
        where: {
          id: id,
        },
      });

      if (!ifExist) {
        throw new NotFoundException(`Entity with id ${id} not found`);
      }

      const data = await this.setPatientInformation.findOne({
        where: {
          id: id,
        },
        order: {
          id: 'DESC',
        },
      });

      return data;
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

}
