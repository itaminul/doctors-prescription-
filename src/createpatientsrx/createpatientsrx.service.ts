import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patientsrx } from 'src/entitys/patientsrx';
import { Rxexaminations } from 'src/entitys/rxexaminations';
import { Rxmedicine } from 'src/entitys/rxmedicine';
import {
  Brackets,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreatePatientsRxDTO } from './dto/patientrx.dto';
import { UpdatePatientsRxDTO } from './dto/updatePatientrx.dto';
import { RxInvestigations } from 'src/entitys/rxinvestigations';
import { RxAdvice } from 'src/entitys/rxadvice';
import { Rxcomplains } from 'src/entitys/rxcomplains';
import { Medicine } from 'src/entitys/medicine';
import { Set_investigations } from 'src/entitys/set_investigations';
import { Complains } from 'src/entitys/complains';
import { SetAdvice } from 'src/entitys/setAdvice';
import { SetExamination } from 'src/entitys/setExamination';
import { pat_patients_info } from 'src/entitys/pat_patients_info';
import { SetPlain } from 'src/entitys/setPlan';
import { RxPlain } from 'src/entitys/rxPlan';
import { SetOnExamination } from 'src/entitys/setOnExamination';
import { RxOnExamination } from 'src/entitys/rxonExamination';
import { SetPackage } from 'src/entitys/setPackage';
import { RxPackage } from 'src/entitys/rxPackages';

@Injectable()
export class CreatepatientsrxService {
  constructor(
    @InjectRepository(Patientsrx)
    public readonly patientRxRepository: Repository<Patientsrx>,
    @InjectRepository(Rxmedicine)
    public readonly rxMedicineRepository: Repository<Rxmedicine>,
    @InjectRepository(Rxexaminations)
    public readonly rxExaminationsRepository: Repository<Rxexaminations>,
    @InjectRepository(RxInvestigations)
    public readonly rxInvestigationsRepository: Repository<RxInvestigations>,
    @InjectRepository(RxAdvice)
    public readonly rxAdviceRepository: Repository<RxAdvice>,
    @InjectRepository(Rxcomplains)
    public readonly rxComplainRepositor: Repository<Rxcomplains>,
    @InjectRepository(Medicine)
    public readonly medicineRepositor: Repository<Medicine>,
    @InjectRepository(Set_investigations)
    public readonly setInvestigationRepository: Repository<Set_investigations>,
    @InjectRepository(Complains)
    public readonly setComplainRepository: Repository<Complains>,
    @InjectRepository(SetAdvice)
    public readonly setAdviceRepository: Repository<SetAdvice>,
    @InjectRepository(SetExamination)
    public readonly setExaminationRepository: Repository<SetExamination>,
    @InjectRepository(pat_patients_info)
    public readonly patientSetupRepository: Repository<pat_patients_info>,
    @InjectRepository(SetPlain)
    public readonly setPlainRepository: Repository<SetPlain>,
    @InjectRepository(RxPlain)
    public readonly rxPlainRepository: Repository<RxPlain>,
    @InjectRepository(SetOnExamination)
    public readonly setOnExamination: Repository<SetOnExamination>,
    @InjectRepository(RxOnExamination)
    public readonly rxOnExaminationRepository: Repository<RxOnExamination>,
    @InjectRepository(SetPackage)
    public readonly setPackageRepository: Repository<SetPackage>,
    @InjectRepository(RxPackage)
    public readonly rxPackageRepository: Repository<RxPackage>,
  ) {}

  async getAllBack() {
    try {
      /* const data1 = await this.patientRxRepository
      .createQueryBuilder('patientsrx')
      .leftJoinAndSelect('patientsrx.patPatientInfo', 'patPatientInfo') 
      .addSelect(['patPatientInfo.id']) // Replace with valid columns
      .leftJoinAndSelect('patientsrx.rxmedicine', 'rxmedicine')
      .leftJoinAndSelect('rxmedicine.medicine', 'medicine')
      .leftJoinAndSelect('patientsrx.rxInvestigations', 'rxInvestigations')
      .leftJoinAndSelect('rxInvestigations.setInvestigations', 'setInvestigations')
      .leftJoinAndSelect('patientsrx.rxexaminations', 'rxexaminations')
      .leftJoinAndSelect('rxexaminations.setExamination', 'setExamination')
      .leftJoinAndSelect('patientsrx.rxComplains', 'rxComplains')
      .leftJoinAndSelect('rxComplains.complains', 'complains')
      .leftJoinAndSelect('patientsrx.rxAdvice', 'rxAdvice')
      .leftJoinAndSelect('rxAdvice.setAdvice', 'setAdvice')
      .addSelect([      
        'setAdvice.name' 
      ])
      .orderBy('patientsrx.id', 'DESC')
      .getMany();

      
      const data2 = await this.patientRxRepository
      .createQueryBuilder('patientsrx')
      .select([
        'patientsrx.id', 
        'patientsrx.RXDATE', 
        'patientsrx.followUp', 
        'patientsrx.rxStatus', 
        'patientsrx.activeStatus',
        'patPatientInfo.name', 
        'complains.name complainName'
      ])
      .leftJoin('pat_patients_info', 'patPatientInfo', 'patientsrx.patientId = patPatientInfo.id')
      .leftJoin('rxmedicine', 'rxmedicine', 'patientsrx.id = rxmedicine.patientsrxId')
      .leftJoin('rxInvestigations', 'rxInvestigations', 'patientsrx.id = rxInvestigations.patientsrxId')
      .leftJoin('rxexaminations', 'rxexaminations', 'patientsrx.id = rxexaminations.patientsrxId')
      .leftJoin('rxComplains', 'rxComplains', 'patientsrx.id = rxComplains.patientsrxId')
      .leftJoinAndSelect('rxComplains.complains', 'complains')
      .leftJoin('rxAdvice', 'rxAdvice', 'patientsrx.id = rxAdvice.patientsrxId')
      .leftJoinAndSelect('rxAdvice.setAdvice', 'setAdvice')
      .orderBy('patientsrx.id', 'DESC')
      .getRawMany();
*/
      const data = await this.patientRxRepository.find({
        relations: {
          patPatientInfo: {
            doctor: true,
          },
          rxmedicine: {
            medicine: true,
          },
          rxInvestigations: {
            setInvestigations: true,
          },
          rxexaminations: {
            setExamination: true,
          },
          rxComplains: {
            complains: true,
          },
          rxAdvice: {
            setAdvice: true,
          },
          rxPlain: {
            setPlain: true,
          },
        },
        order: {
          id: 'DESC',
        },
      });

      /* const formattedData = data.map((patientdata) => ({
        patientId: patientdata.patPatientInfo.id,
        patientsName: patientdata.patPatientInfo.name,
        patientDoctorId: patientdata.patPatientInfo.id,
        // doctorId: patientdata.patPatientInfo.doctor.id,
        // doctorName: patientdata.patPatientInfo.doctor.name,
        rxDate: patientdata.RXDATE,
        followUp: patientdata.followUp,
        medicines: patientdata.rxmedicine.map((medicine) => ({
          patientId: patientdata.patPatientInfo.id,
          rxmedicineId: medicine.id,
          medicineId: medicine.medicine.id,
          medicineName: medicine.medicine.medicineName,
          numberOfTimes: medicine.numberOfTimes,
          morning: medicine.morning,
          lunch: medicine.lunch,
          evening: medicine.evening,
          night: medicine.night,
        })),
        investigations: patientdata.rxInvestigations.map((investigation) => ({
          patientId: patientdata.patPatientInfo.id,
          rxInvestigationId: investigation.id,
          setInvestigationId: investigation.setInvestigations.id,
          investigationName: investigation.setInvestigations.name,
        })),

        examinations: patientdata.rxexaminations.map((examination) => ({
          patientId: patientdata.patPatientInfo.id,
          rxExaminationId: examination.id,
          setExaminationId: examination.setExamination.id,
          examinationName: examination.setExamination.name,
        })),

        comlains: patientdata.rxComplains.map((complain) => ({
          patientId: patientdata.patPatientInfo.id,
          rxComplianId: complain.id,
          setComplainId: complain.complains.id,
          complainName: complain.complains.name,
        })),
        advices: patientdata.rxAdvice.map((advice) => ({
          patientId: patientdata.patPatientInfo.id,
          rxAdviceId: advice.id,
          setAdviceId: advice.setAdvice.id,
          adviceName: advice.setAdvice.name,
        })),
      }));
*/
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

  async getAll(page = 1, limit = 10) {
    try {
      /* const data1 = await this.patientRxRepository
      .createQueryBuilder('patientsrx')
      .leftJoinAndSelect('patientsrx.patPatientInfo', 'patPatientInfo') 
      .addSelect(['patPatientInfo.id']) // Replace with valid columns
      .leftJoinAndSelect('patientsrx.rxmedicine', 'rxmedicine')
      .leftJoinAndSelect('rxmedicine.medicine', 'medicine')
      .leftJoinAndSelect('patientsrx.rxInvestigations', 'rxInvestigations')
      .leftJoinAndSelect('rxInvestigations.setInvestigations', 'setInvestigations')
      .leftJoinAndSelect('patientsrx.rxexaminations', 'rxexaminations')
      .leftJoinAndSelect('rxexaminations.setExamination', 'setExamination')
      .leftJoinAndSelect('patientsrx.rxComplains', 'rxComplains')
      .leftJoinAndSelect('rxComplains.complains', 'complains')
      .leftJoinAndSelect('patientsrx.rxAdvice', 'rxAdvice')
      .leftJoinAndSelect('rxAdvice.setAdvice', 'setAdvice')
      .addSelect([      
        'setAdvice.name' 
      ])
      .orderBy('patientsrx.id', 'DESC')
      .getMany();

      
      const data2 = await this.patientRxRepository
      .createQueryBuilder('patientsrx')
      .select([
        'patientsrx.id', 
        'patientsrx.RXDATE', 
        'patientsrx.followUp', 
        'patientsrx.rxStatus', 
        'patientsrx.activeStatus',
        'patPatientInfo.name', 
        'complains.name complainName'
      ])
      .leftJoin('pat_patients_info', 'patPatientInfo', 'patientsrx.patientId = patPatientInfo.id')
      .leftJoin('rxmedicine', 'rxmedicine', 'patientsrx.id = rxmedicine.patientsrxId')
      .leftJoin('rxInvestigations', 'rxInvestigations', 'patientsrx.id = rxInvestigations.patientsrxId')
      .leftJoin('rxexaminations', 'rxexaminations', 'patientsrx.id = rxexaminations.patientsrxId')
      .leftJoin('rxComplains', 'rxComplains', 'patientsrx.id = rxComplains.patientsrxId')
      .leftJoinAndSelect('rxComplains.complains', 'complains')
      .leftJoin('rxAdvice', 'rxAdvice', 'patientsrx.id = rxAdvice.patientsrxId')
      .leftJoinAndSelect('rxAdvice.setAdvice', 'setAdvice')
      .orderBy('patientsrx.id', 'DESC')
      .getRawMany();
*/

      const take = Math.max(limit, 1); // Minimum limit is 1
      const skip = (Math.max(page, 1) - 1) * take; // Minimum page is 1
      // Fetch data with pagination and total count
      const [data, total] = await this.patientRxRepository.findAndCount({
        relations: {
          patPatientInfo: {
            doctor: true,
          },
          rxmedicine: {
            medicine: true,
          },
          rxInvestigations: {
            setInvestigations: true,
          },
          rxexaminations: {
            setExamination: true,
          },
          rxComplains: {
            complains: true,
          },
          rxAdvice: {
            setAdvice: true,
          },
          rxPlain: {
            setPlain: true,
          },
        },
        order: {
          id: 'DESC',
        },
        take, // Number of records to fetch
        skip, // Number of records to skip
      });
      const datapp = await this.patientRxRepository.find({
        relations: {
          patPatientInfo: {
            doctor: true,
          },
          rxmedicine: {
            medicine: true,
          },
          rxInvestigations: {
            setInvestigations: true,
          },
          rxexaminations: {
            setExamination: true,
          },
          rxComplains: {
            complains: true,
          },
          rxAdvice: {
            setAdvice: true,
          },
          rxPlain: {
            setPlain: true,
          },
          rxOnExamination: {
            setOnExaminations: true,
          },
          rxPackage: {
            setPackage: true,
          },
        },
        order: {
          id: 'DESC',
        },
        take,
        skip,
      });

      const formattedData = data.map((patientdata) => ({
        patientId: patientdata.patPatientInfo?.id || null,
        patientsName: patientdata.patPatientInfo?.name || 'Unknown',
        patientDoctorId: patientdata.patPatientInfo?.id || null,
        rxDate: patientdata.RXDATE || null,
        followUp: patientdata.followUp || null,
        medicines: (patientdata.rxmedicine || []).map((medicine) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxmedicineId: medicine?.id || null,
          medicineId: medicine?.medicine?.id || null,
          medicineName: medicine?.medicine?.medicineName || 'Unknown',
          numberOfTimes: medicine?.numberOfTimes || 0,
          morning: medicine?.morning || 0,
          lunch: medicine?.lunch || 0,
          evening: medicine?.evening || 0,
          night: medicine?.night || 0,
        })),
        investigations: (patientdata.rxInvestigations || []).map(
          (investigation) => ({
            patientId: patientdata.patPatientInfo?.id || null,
            rxInvestigationId: investigation?.id || null,
            setInvestigationId: investigation?.setInvestigations?.id || null,
            investigationName:
              investigation?.setInvestigations?.name || 'Unknown',
          }),
        ),
        examinations: (patientdata.rxexaminations || []).map((examination) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxExaminationId: examination?.id || null,
          setExaminationId: examination?.setExamination?.id || null,
          examinationName: examination?.setExamination?.name || 'Unknown',
        })),
        comlains: (patientdata.rxComplains || []).map((complain) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxComplianId: complain?.id || null,
          setComplainId: complain?.complains?.id || null,
          complainName: complain?.complains?.name || 'Unknown',
        })),
        advices: (patientdata.rxAdvice || []).map((advice) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxAdviceId: advice?.id || null,
          setAdviceId: advice?.setAdvice?.id || null,
          adviceName: advice?.setAdvice?.name || 'Unknown',
        })),

        plain: (patientdata.rxPlain || []).map((plain) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxPlainId: plain?.id || null,
          setPlainId: plain?.setPlain?.id || null,
          plainName: plain?.setPlain?.name || 'Unknown',
        })),

        onexamination: (patientdata.rxOnExamination || []).map((onexa) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxOnExamId: onexa?.id || null,
          setOnExaminations: onexa?.setOnExaminations?.id || null,
          onExamName: onexa?.setOnExaminations?.name || 'Unknown',
        })),

        package: (patientdata.rxPackage || []).map((pack) => ({
          patientId: patientdata.patPatientInfo?.id || null,
          rxPackageId: pack?.id || null,
          setPackage: pack?.setPackage?.id || null,
          packageName: pack?.setPackage?.name || 'Unknown',
        })),
      }));

      return {
        formattedData,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
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

  async getAllPaginateData(fromDate: string, toDate: string) {
    try {
      const startDate = fromDate;
      const endDate = toDate;
      const data = await this.patientRxRepository
        .createQueryBuilder('patientRx')
        .leftJoinAndSelect('patientRx.patPatientInfo', 'patPatientInfo')
        .leftJoinAndSelect('patPatientInfo.doctor', 'doctor')
        .where(
          'STR_TO_DATE(patientRx.RXDATE, "%d/%m/%Y") BETWEEN :startDate AND :endDate',
          {
            startDate,
            endDate,
          },
        )
        .orderBy('patientRx.id', 'DESC')
        .getMany();
      // Check if no data is found
      if (data.length === 0) {
        throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
      }

      const formattedData = data.map((patientdata) => ({
        id: patientdata.id || null,
        patientId: patientdata.patPatientInfo?.id || null,
        patientsName: patientdata.patPatientInfo?.name || 'Unknown',
        REG_NO: patientdata.patPatientInfo?.REG_NO || 'Unknown',        
        rxDate: patientdata.RXDATE || null,
      }));
      return formattedData;
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

  async create(@Body() createPatientDto: CreatePatientsRxDTO) {
    try {
      const {
        rxmedicine,
        rxexaminations,
        rxInvestigations,
        rxadvice,
        rxComplains,
        rxPlain,
        rxOnExamination,
        rxPackage,
        ...patientData
      } = createPatientDto;
      console.log('save data in prescription', createPatientDto);
      const patientDataa = this.patientRxRepository.create(patientData);
      const savePatientRx = await this.patientRxRepository.save(patientDataa);
      const medicineMap = new Map<number, Medicine>();
      const investigationMap = new Map<number, Set_investigations>();
      const complainMap = new Map<number, Complains>();
      const setAdviceMap = new Map<number, SetAdvice>();
      const setExaminationMap = new Map<number, SetExamination>();
      const setPlainMap = new Map<number, SetPlain>();
      const setOnExaminationMap = new Map<number, SetOnExamination>();
      const setPackageMap = new Map<number, SetPackage>();

      /*
        const statuUpdate =  this.patientSetupRepository.save({
      id, ...patientData
       })
       return this.patientSetupRepository.save({ id: 33, ...patientData });
      */

      if (rxmedicine && rxmedicine.length > 0) {
        for (const medicineDto of rxmedicine) {
          let medicine: any;

          if (medicineDto.medicineId) {
            // Check if the medicine is already processed
            if (medicineMap.has(medicineDto.medicineId)) {
              medicine = medicineMap.get(medicineDto.medicineId);
            } else {
              // Find the existing Medicine by ID
              medicine = await this.medicineRepositor.findOne({
                where: { id: medicineDto.medicineId },
              });

              if (!medicine) {
                throw new Error(
                  `Medicine with id ${medicineDto.medicineId} not found`,
                );
              }

              medicineMap.set(medicineDto.medicineId, medicine);
            }
          } else {
            // Create a new Medicine if needed
            medicine = this.medicineRepositor.create(medicineDto);
            medicine = await this.medicineRepositor.save(medicine);
            medicineMap.set(medicine.id, medicine);
          }
          const rmedicine = this.rxMedicineRepository.create({
            ...medicineDto,
            patientsrx: savePatientRx,
            medicine: medicine,
          });

          await this.rxMedicineRepository.save(rmedicine);
        }
      }

      //investigation
      if (rxInvestigations && rxInvestigations.length > 0) {
        for (const rxInvestigationsDto of rxInvestigations) {
          let setInvestigation: any;
          if (rxInvestigationsDto.investigationId) {
            if (investigationMap.has(rxInvestigationsDto.investigationId)) {
              setInvestigation = investigationMap.get(
                rxInvestigationsDto.investigationId,
              );
            } else {
              setInvestigation = await this.setInvestigationRepository.findOne({
                where: { id: rxInvestigationsDto.investigationId },
              });
            }

            if (!setInvestigation) {
              throw new Error(
                `Medicine with id ${rxInvestigationsDto.investigationId} not found`,
              );
            }

            investigationMap.set(
              rxInvestigationsDto.investigationId,
              setInvestigation,
            );
          } else {
            setInvestigation =
              this.rxInvestigationsRepository.create(rxInvestigationsDto);
            setInvestigation =
              await this.setInvestigationRepository.save(setInvestigation);
            investigationMap.set(setInvestigation.id, setInvestigation);
          }
          const investigation = this.rxInvestigationsRepository.create({
            ...rxInvestigationsDto,
            patientsrx: savePatientRx,
            setInvestigations: setInvestigation,
          });
          await this.rxInvestigationsRepository.save(investigation);
        }
      }

      // const investigations = rxInvestigations.map(investigationDto => {

      //     const investigation = this.rxInvestigationsRepository.create({
      //         ...rxInvestigations,
      //         patientsrx: savePatientRx
      //     })
      //     return investigation;
      // })
      // await this.rxInvestigationsRepository.save(investigations);

      //rxComplains
      if (rxComplains && rxComplains.length > 0) {
        for (const rxComplainDto of rxComplains) {
          let setRxComplain: any;
          if (rxComplainDto.complainId) {
            if (complainMap.has(rxComplainDto.complainId)) {
              setRxComplain = complainMap.get(rxComplainDto.complainId);
            } else {
              setRxComplain = await this.setComplainRepository.findOne({
                where: { id: rxComplainDto.complainId },
              });
            }

            if (!complainMap) {
              throw new Error(
                `Complain with id ${rxComplainDto.complainId} not found`,
              );
            }
            complainMap.set(rxComplainDto.complainId, setRxComplain);
          } else {
            setRxComplain = this.rxComplainRepositor.create(rxComplainDto);
            setRxComplain =
              await this.setComplainRepository.save(setRxComplain);
            complainMap.set(setRxComplain.id, setRxComplain);
          }
          const complain = this.rxComplainRepositor.create({
            ...rxComplainDto,
            patientsrx: savePatientRx,
            complains: setRxComplain,
          });

          await this.rxComplainRepositor.save(complain);
        }
      }

      if (rxexaminations && rxexaminations.length > 0) {
        for (const rxExaminationDto of rxexaminations) {
          let setExaminations: any;
          if (rxExaminationDto.examinationId) {
            if (setExaminationMap.has(rxExaminationDto.examinationId)) {
              setExaminations = setExaminationMap.has(
                rxExaminationDto.examinationId,
              );
            } else {
              setExaminations = await this.setExaminationRepository.findOne({
                where: { id: rxExaminationDto.examinationId },
              });
            }
            if (!setExaminationMap) {
              throw new Error(
                `Examinatin id ${rxExaminationDto.examinationId} not found`,
              );
            }
          } else {
            setExaminations =
              this.rxExaminationsRepository.create(rxExaminationDto);
            setExaminations =
              await this.setExaminationRepository.save(setExaminations);
            setExaminationMap.set(setExaminations.id, setExaminations);
          }
          const examination = this.rxExaminationsRepository.create({
            ...rxExaminationDto,
            patientsrx: savePatientRx,
            setExamination: setExaminations,
          });
          await this.rxExaminationsRepository.save(examination);
        }
      }

      //rxadvice
      if (rxadvice && rxadvice.length > 0) {
        for (const rxAdviceDto of rxadvice) {
          let setAdvice: any;
          if (rxAdviceDto.adviceId) {
            if (setAdviceMap.has(rxAdviceDto.adviceId)) {
              setAdvice = setAdviceMap.has(rxAdviceDto.adviceId);
            } else {
              setAdvice = await this.setAdviceRepository.findOne({
                where: { id: rxAdviceDto.adviceId },
              });
            }

            if (!setAdviceMap) {
              throw new Error(`Advice ${rxAdviceDto.adviceId} not found`);
            }
            setAdviceMap.set(rxAdviceDto.adviceId, setAdvice);
          } else {
            setAdvice = this.rxAdviceRepository.create(rxAdviceDto);
            setAdvice = await this.setAdviceRepository.save(setAdvice);
            setAdviceMap.set(setAdvice.id, setAdvice);
          }

          const advices = this.rxAdviceRepository.create({
            ...rxAdviceDto,
            patientsrx: savePatientRx,
            setAdvice: setAdvice,
          });
          await this.rxAdviceRepository.save(advices);
        }
      }

      //rxPlain
      if (rxPlain && rxPlain.length > 0) {
        for (const rxPlainDto of rxPlain) {
          let setPlain: any;
          if (rxPlainDto.plainId) {
            if (setPlainMap.has(rxPlainDto.plainId)) {
              setPlain = setPlainMap.has(rxPlainDto.plainId);
            } else {
              setPlain = await this.setPlainRepository.findOne({
                where: { id: rxPlainDto.plainId },
              });
            }

            if (!setPlainMap) {
              throw new Error(`Advice ${rxPlainDto.plainId} not found`);
            }
            setPlainMap.set(rxPlainDto.plainId, setPlain);
          } else {
            setPlain = this.rxPlainRepository.create(rxPlainDto);
            setPlain = await this.setPlainRepository.save(setPlain);
            setPlainMap.set(setPlain.id, setPlain);
          }

          const plain = this.rxPlainRepository.create({
            ...rxPlainDto,
            patientRx: savePatientRx,
            setPlain: setPlain,
          });
          await this.rxPlainRepository.save(plain);
        }
      }

      //rxOnExamination
      if (rxOnExamination && rxOnExamination.length > 0) {
        for (const rxOnExaminationDto of rxOnExamination) {
          let setOnExam: any;
          if (rxOnExaminationDto.onExaminationId) {
            if (setOnExaminationMap.has(rxOnExaminationDto.onExaminationId)) {
              setOnExam = setOnExaminationMap.has(
                rxOnExaminationDto.onExaminationId,
              );
            } else {
              setOnExam = await this.setOnExamination.findOne({
                where: { id: rxOnExaminationDto.onExaminationId },
              });
            }

            if (!setOnExaminationMap) {
              throw new Error(
                `Advice ${rxOnExaminationDto.onExaminationId} not found`,
              );
            }
            setOnExaminationMap.set(
              rxOnExaminationDto.onExaminationId,
              setOnExam,
            );
          } else {
            setOnExam =
              this.rxOnExaminationRepository.create(rxOnExaminationDto);
            setOnExam = await this.rxOnExaminationRepository.save(setOnExam);
            setOnExaminationMap.set(setOnExam.id, setOnExam);
          }

          const OnExam = this.rxOnExaminationRepository.create({
            ...rxOnExaminationDto,
            patientRx: savePatientRx,
            setOnExaminations: setOnExam,
          });
          await this.rxOnExaminationRepository.save(OnExam);
        }
      }

      //rxPackages
      if (rxPackage && rxPackage.length > 0) {
        for (const rxPackageDto of rxPackage) {
          let setPackage: any;
          if (rxPackageDto.packageId) {
            if (setPackageMap.has(rxPackageDto.packageId)) {
              setPackage = setPackageMap.has(rxPackageDto.packageId);
            } else {
              setPackage = await this.setPackageRepository.findOne({
                where: { id: rxPackageDto.packageId },
              });
            }

            if (!setPackageMap) {
              throw new Error(`Advice ${rxPackageDto.packageId} not found`);
            }

            setPackageMap.set(rxPackageDto.packageId, setPackage);
          } else {
            setPackage = this.rxPackageRepository.create(rxPackageDto);
            setPackage = await this.rxPackageRepository.save(setPackage);
            setPackageMap.set(setPackage.id, setPackage);
          }

          const rxPack = this.rxPackageRepository.create({
            ...rxPackageDto,
            patientRx: savePatientRx,
            setPackage: setPackage,
          });
          await this.rxPackageRepository.save(rxPack);
        }
      }

      return savePatientRx;
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

  async createNew(@Body() createPatientDto: any) {
    try {
      const {
        rxmedicine,
        rxexaminations,
        rxInvestigations,
        rxadvice,
        rxComplains,
        rxPlain,
        ...patientData
      } = createPatientDto;
      console.log('save data in prescription', createPatientDto);
      const patientDataa = this.patientRxRepository.create(patientData);
      const savePatientRx = await this.patientRxRepository.save(patientDataa);
      const medicineMap = new Map<number, Medicine>();
      const investigationMap = new Map<number, Set_investigations>();
      const complainMap = new Map<number, Complains>();
      const setAdviceMap = new Map<number, SetAdvice>();
      const setExaminationMap = new Map<number, SetExamination>();

      /*
        const statuUpdate =  this.patientSetupRepository.save({
      id, ...patientData
       })
       return this.patientSetupRepository.save({ id: 33, ...patientData });
      */

      if (rxmedicine && rxmedicine.length > 0) {
        for (const medicineDto of rxmedicine) {
          let medicine: any;

          if (medicineDto.medicineId) {
            // Check if the medicine is already processed
            if (medicineMap.has(medicineDto.medicineId)) {
              medicine = medicineMap.get(medicineDto.medicineId);
            } else {
              // Find the existing Medicine by ID
              medicine = await this.medicineRepositor.findOne({
                where: { id: medicineDto.medicineId },
              });

              if (!medicine) {
                throw new Error(
                  `Medicine with id ${medicineDto.medicineId} not found`,
                );
              }

              medicineMap.set(medicineDto.medicineId, medicine);
            }
          } else {
            // Create a new Medicine if needed
            medicine = this.medicineRepositor.create(medicineDto);
            medicine = await this.medicineRepositor.save(medicine);
            medicineMap.set(medicine.id, medicine);
          }
          const rmedicine = this.rxMedicineRepository.create({
            ...medicineDto,
            patientsrx: savePatientRx,
            medicine: medicine,
          });

          await this.rxMedicineRepository.save(rmedicine);
        }
      }

      //investigation
      if (rxInvestigations && rxInvestigations.length > 0) {
        for (const rxInvestigationsDto of rxInvestigations) {
          let setInvestigation: any;
          if (rxInvestigationsDto.investigationId) {
            if (investigationMap.has(rxInvestigationsDto.investigationId)) {
              setInvestigation = investigationMap.get(
                rxInvestigationsDto.investigationId,
              );
            } else {
              setInvestigation = await this.setInvestigationRepository.findOne({
                where: { id: rxInvestigationsDto.investigationId },
              });
            }

            if (!setInvestigation) {
              throw new Error(
                `Medicine with id ${rxInvestigationsDto.investigationId} not found`,
              );
            }

            investigationMap.set(
              rxInvestigationsDto.investigationId,
              setInvestigation,
            );
          } else {
            setInvestigation =
              this.rxInvestigationsRepository.create(rxInvestigationsDto);
            setInvestigation =
              await this.setInvestigationRepository.save(setInvestigation);
            investigationMap.set(setInvestigation.id, setInvestigation);
          }
          const investigation = this.rxInvestigationsRepository.create({
            ...rxInvestigationsDto,
            patientsrx: savePatientRx,
            setInvestigations: setInvestigation,
          });
          await this.rxInvestigationsRepository.save(investigation);
        }
      }

      // const investigations = rxInvestigations.map(investigationDto => {

      //     const investigation = this.rxInvestigationsRepository.create({
      //         ...rxInvestigations,
      //         patientsrx: savePatientRx
      //     })
      //     return investigation;
      // })
      // await this.rxInvestigationsRepository.save(investigations);

      //rxComplains
      if (rxComplains && rxComplains.length > 0) {
        for (const rxComplainDto of rxComplains) {
          let setRxComplain: any;
          if (rxComplainDto.complainId) {
            if (complainMap.has(rxComplainDto.complainId)) {
              setRxComplain = complainMap.get(rxComplainDto.complainId);
            } else {
              setRxComplain = await this.setComplainRepository.findOne({
                where: { id: rxComplainDto.complainId },
              });
            }

            if (!complainMap) {
              throw new Error(
                `Complain with id ${rxComplainDto.complainId} not found`,
              );
            }
            complainMap.set(rxComplainDto.complainId, setRxComplain);
          } else {
            setRxComplain = this.rxComplainRepositor.create(rxComplainDto);
            setRxComplain =
              await this.setComplainRepository.save(setRxComplain);
            complainMap.set(setRxComplain.id, setRxComplain);
          }
          const complain = this.rxComplainRepositor.create({
            ...rxComplainDto,
            patientsrx: savePatientRx,
            complains: setRxComplain,
          });

          await this.rxComplainRepositor.save(complain);
        }
      }

      if (rxexaminations && rxexaminations.length > 0) {
        for (const rxExaminationDto of rxexaminations) {
          let setExaminations: any;
          if (rxExaminationDto.examinationId) {
            if (setExaminationMap.has(rxExaminationDto.examinationId)) {
              setExaminations = setExaminationMap.has(
                rxExaminationDto.examinationId,
              );
            } else {
              setExaminations = await this.setExaminationRepository.findOne({
                where: { id: rxExaminationDto.examinationId },
              });
            }
            if (!setExaminationMap) {
              throw new Error(
                `Examinatin id ${rxExaminationDto.examinationId} not found`,
              );
            }
          } else {
            setExaminations =
              this.rxExaminationsRepository.create(rxExaminationDto);
            setExaminations =
              await this.setExaminationRepository.save(setExaminations);
            setExaminationMap.set(setExaminations.id, setExaminations);
          }
          const examination = this.rxExaminationsRepository.create({
            ...rxExaminationDto,
            patientsrx: savePatientRx,
            setExamination: setExaminations,
          });
          await this.rxExaminationsRepository.save(examination);
        }
      }

      //rxadvice
      if (rxadvice && rxadvice.length > 0) {
        for (const rxAdviceDto of rxadvice) {
          let setAdvice: any;
          if (rxAdviceDto.adviceId) {
            if (setAdviceMap.has(rxAdviceDto.adviceId)) {
              setAdvice = setAdviceMap.has(rxAdviceDto.adviceId);
            } else {
              setAdvice = await this.setAdviceRepository.findOne({
                where: { id: rxAdviceDto.adviceId },
              });
            }

            if (!setAdviceMap) {
              throw new Error(`Advice ${rxAdviceDto.adviceId} not found`);
            }
            setAdviceMap.set(rxAdviceDto.adviceId, setAdvice);
          } else {
            setAdvice = this.rxAdviceRepository.create(rxAdviceDto);
            setAdvice = await this.setAdviceRepository.save(setAdvice);
            setAdviceMap.set(setAdvice.id, setAdvice);
          }

          const advices = this.rxAdviceRepository.create({
            ...rxAdviceDto,
            patientsrx: savePatientRx,
            setAdvice: setAdvice,
          });
          await this.rxAdviceRepository.save(advices);
        }
      }

      return savePatientRx;
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

  async update(id: number, updatePatientsRxDTO: UpdatePatientsRxDTO) {
    try {
      const {
        rxmedicine,
        rxexaminations,
        rxInvestigations,
        rxAdvice,
        rxComplains,
        rxPlain,
        rxPackage,
        rxOnExamination,
        ...patientData
      } = updatePatientsRxDTO;
      const patient = await this.patientRxRepository.findOne({
        where: { id },
        relations: [
          'rxmedicine',
          'rxexaminations',
          'rxAdvice',
          'rxComplains',
          'rxInvestigations',
          'rxPlain',
          'rxPackage',
          'rxOnExamination',
        ],
      });

      if (!patient) {
        throw new Error('Patient not found');
      }
      Object.assign(patient, patientData);
      await this.patientRxRepository.save(patient);

      // Medicine update and insertion
      if (rxmedicine) {
        patient.rxmedicine = patient.rxmedicine.filter((medicine) =>
          rxmedicine.some((m) => m.id === medicine.id),
        );
        const updateMedicinesRx = [];

        for (const rxMedicineDto of rxmedicine) {
          let savedMedicine: Medicine;

          if (rxMedicineDto.id) {
            const existingMedicineRx = await this.rxMedicineRepository.findOne({
              where: { id: rxMedicineDto.id, patientsrx: { id: patient.id } },
            });

            if (existingMedicineRx) {
              if (rxMedicineDto.medicineId) {
                const existingMedicine = await this.medicineRepositor.findOne({
                  where: { id: rxMedicineDto.medicineId },
                });

                if (existingMedicine) {
                  Object.assign(existingMedicine, rxMedicineDto.medicine);
                  savedMedicine =
                    await this.medicineRepositor.save(existingMedicine);
                } else {
                  savedMedicine = await this.medicineRepositor.save(
                    this.medicineRepositor.create(rxMedicineDto.medicine),
                  );
                }
              } else {
                savedMedicine = await this.medicineRepositor.save(
                  this.medicineRepositor.create(rxMedicineDto.medicine),
                );
              }
              // Set the relation properly
              existingMedicineRx.medicine = savedMedicine;
              await this.rxMedicineRepository.save(existingMedicineRx);
              updateMedicinesRx.push(existingMedicineRx);
            }
          } else {
            const newRxMedicine = this.rxMedicineRepository.create({
              ...rxMedicineDto,
              patientsrx: patient,
            });

            if (rxMedicineDto.medicineId) {
              const existingMedicine = await this.medicineRepositor.findOne({
                where: { id: rxMedicineDto.medicineId },
              });

              if (existingMedicine) {
                newRxMedicine.medicine = existingMedicine;
              } else {
                const newMedicine = this.medicineRepositor.create(
                  rxMedicineDto.medicine,
                );
                savedMedicine = await this.medicineRepositor.save(newMedicine);
                newRxMedicine.medicine = savedMedicine;
              }
            } else {
              const newMedicine = this.medicineRepositor.create(
                rxMedicineDto.medicine,
              );
              savedMedicine = await this.medicineRepositor.save(newMedicine);
              newRxMedicine.medicine = savedMedicine;
            }

            const savedRxMedicine =
              await this.rxMedicineRepository.save(newRxMedicine);
            updateMedicinesRx.push(savedRxMedicine);
          }
        }

        patient.rxmedicine = updateMedicinesRx;
      }

      //examination start

      if (rxexaminations && rxexaminations.length > 0) {
        patient.rxexaminations = patient.rxexaminations.filter(
          (examination) => {
            rxexaminations.some((e) => e.id === examination.id);
          },
        );
        const updatedExaminations = [];

        for (const rxExaminationDto of rxexaminations) {
          let saveRxExamination: any;
          if (rxExaminationDto.id) {
            const existExamination =
              await this.rxExaminationsRepository.findOne({
                where: {
                  id: rxExaminationDto.id,
                  patientsrx: { id: patient.id },
                },
              });

            if (existExamination) {
              if (rxExaminationDto.examinationId) {
                const existingExamination =
                  await this.setExaminationRepository.findOne({
                    where: { id: rxExaminationDto.examinationId },
                  });

                if (existingExamination) {
                  Object.assign(
                    existExamination,
                    rxExaminationDto.setexamination,
                  );
                  saveRxExamination =
                    await this.setExaminationRepository.save(
                      existingExamination,
                    );
                } else {
                  saveRxExamination = await this.setExaminationRepository.save(
                    this.setExaminationRepository.create(
                      rxExaminationDto.setexamination,
                    ),
                  );
                }
              }

              // Set the relation properly
              existExamination.setExamination = saveRxExamination;
              await this.rxExaminationsRepository.save(existExamination);
              updatedExaminations.push(existExamination);
            }
          } else {
            const newRxExamination = this.rxExaminationsRepository.create({
              ...rxExaminationDto,
              patientsrx: patient,
            });

            if (rxExaminationDto.examinationId) {
              const existingExamination =
                await this.setExaminationRepository.findOne({
                  where: { id: rxExaminationDto.examinationId },
                });

              if (existingExamination) {
                newRxExamination.setExamination = existingExamination;
              } else {
                const newExamination = this.setExaminationRepository.create(
                  rxExaminationDto.setexamination,
                );
                saveRxExamination =
                  await this.setExaminationRepository.save(newExamination);
                newRxExamination.setExamination = saveRxExamination;
              }
            } else {
              const newExamination = this.setExaminationRepository.create(
                rxExaminationDto.setexamination,
              );
              saveRxExamination =
                await this.setExaminationRepository.save(newExamination);
              newRxExamination.setExamination = saveRxExamination;
            }

            const savedRxExamination =
              await this.rxExaminationsRepository.save(newRxExamination);
            updatedExaminations.push(savedRxExamination);
          }
        }

        patient.rxexaminations = updatedExaminations;
      }

      //investigation start

      if (rxInvestigations) {
        patient.rxInvestigations = patient.rxInvestigations.filter(
          (investigatin) =>
            rxInvestigations.some((i) => i.id === investigatin.id),
        );
        const updateInvestigation = [];
        for (const rxInvestigationDto of rxInvestigations) {
          let saveRxInvestigations: any;

          if (rxInvestigationDto.id) {
            const existingInvestigation =
              await this.rxInvestigationsRepository.findOne({
                where: {
                  id: rxInvestigationDto.id,
                  patientsrx: { id: patient.id },
                },
              });
            if (existingInvestigation) {
              if (rxInvestigationDto.investigationId) {
                const existingInvestigation =
                  await this.setExaminationRepository.findOne({
                    where: { id: rxInvestigationDto.investigationId },
                  });

                if (existingInvestigation) {
                  Object.assign(
                    existingInvestigation,
                    rxInvestigationDto.setInvestigation,
                  );
                  saveRxInvestigations =
                    await this.setExaminationRepository.save(
                      existingInvestigation,
                    );
                } else {
                  saveRxInvestigations =
                    await this.setInvestigationRepository.save(
                      this.setInvestigationRepository.create(
                        rxInvestigationDto.setInvestigation,
                      ),
                    );
                }
              }
              // Set the relation properly
              existingInvestigation.setInvestigations = saveRxInvestigations;
              await this.rxInvestigationsRepository.save(existingInvestigation);
              updateInvestigation.push(existingInvestigation);
            }
          } else {
            const newRxInvestigation = this.rxInvestigationsRepository.create({
              ...rxInvestigationDto,
              patientsrx: patient,
            });

            if (rxInvestigationDto.investigationId) {
              const existingInvestigation =
                await this.setExaminationRepository.findOne({
                  where: { id: rxInvestigationDto.investigationId },
                });

              if (existingInvestigation) {
                rxInvestigationDto.setInvestigation = existingInvestigation;
              } else {
                const newRxInvestigation =
                  this.setInvestigationRepository.create(
                    rxInvestigationDto.setInvestigation,
                  );
                saveRxInvestigations =
                  await this.setInvestigationRepository.save(
                    newRxInvestigation,
                  );
                newRxInvestigation.rxInvestigations = saveRxInvestigations;
              }
            } else {
              const newInvestigations = this.setExaminationRepository.create(
                rxInvestigationDto.setInvestigation,
              );
              saveRxInvestigations =
                await this.setInvestigationRepository.save(newInvestigations);
              newRxInvestigation.setInvestigations = saveRxInvestigations;
            }

            const savedRxInvestigation =
              await this.setInvestigationRepository.save(newRxInvestigation);
            updateInvestigation.push(savedRxInvestigation);
          }
        }
        patient.rxInvestigations = updateInvestigation;
      }

      if (rxAdvice && rxAdvice.length > 0) {
        patient.rxAdvice = patient.rxAdvice.filter((advice) =>
          rxAdvice.some((n) => n.id === advice.id),
        );
        const updateAdviceRx = [];
        for (const rxAdviceDto of rxAdvice) {
          let savedAdvice: any;

          if (rxAdviceDto.id) {
            const existingAdviceRx = await this.rxAdviceRepository.findOne({
              where: { id: rxAdviceDto.id, patientsrx: { id: patient.id } },
            });

            if (existingAdviceRx) {
              if (rxAdviceDto.adviceId) {
                const existingAdvice = await this.setAdviceRepository.findOne({
                  where: { id: rxAdviceDto.adviceId },
                });

                if (existingAdvice) {
                  Object.assign(existingAdvice, rxAdviceDto.setupAdvice);
                  savedAdvice =
                    await this.setAdviceRepository.save(existingAdvice);
                } else {
                  savedAdvice = await this.setAdviceRepository.save(
                    this.setAdviceRepository.create(rxAdviceDto.setupAdvice),
                  );
                }
              } else {
                savedAdvice = await this.setAdviceRepository.save(
                  this.setAdviceRepository.create(rxAdviceDto.setupAdvice),
                );
              }

              // Set the relation properly
              existingAdviceRx.setAdvice = savedAdvice;
              await this.rxAdviceRepository.save(existingAdviceRx);
              updateAdviceRx.push(existingAdviceRx);
            }
          } else {
            const newRxAdvice = this.rxAdviceRepository.create({
              ...rxAdviceDto,
              patientsrx: patient,
            });

            if (rxAdviceDto.adviceId) {
              const existingMedicine = await this.setAdviceRepository.findOne({
                where: { id: rxAdviceDto.adviceId },
              });

              if (existingMedicine) {
                newRxAdvice.setAdvice = existingMedicine;
              } else {
                const newMedicine = this.setAdviceRepository.create(
                  rxAdviceDto.setupAdvice,
                );
                savedAdvice = await this.setAdviceRepository.save(newMedicine);
                newRxAdvice.setAdvice = savedAdvice;
              }
            } else {
              const newMedicine = this.setAdviceRepository.create(
                rxAdviceDto.setupAdvice,
              );
              savedAdvice = await this.setAdviceRepository.save(newMedicine);
              newRxAdvice.setAdvice = savedAdvice;
            }

            const savedRxMedicine =
              await this.rxAdviceRepository.save(newRxAdvice);
            updateAdviceRx.push(savedRxMedicine);
          }
        }
        patient.rxAdvice = updateAdviceRx;
      }

      if (rxComplains && rxComplains.length > 0) {
        patient.rxComplains = patient.rxComplains.filter((complains) =>
          rxComplains.some((j) => j.id === complains.id),
        );

        const updateRXComplain = [];
        for (const rxComplainDto of rxComplains) {
          let saveRxComplain: any;
          if (rxComplainDto.id) {
            const checkExistingRxCompalin =
              await this.rxComplainRepositor.findOne({
                where: { id: rxComplainDto.id, patientsrx: { id: patient.id } },
              });

            if (checkExistingRxCompalin) {
              if (rxComplainDto.complainId) {
                const existingComplainSetup =
                  await this.setComplainRepository.findOne({
                    where: { id: rxComplainDto.complainId },
                  });

                if (existingComplainSetup) {
                  Object.assign(existingComplainSetup, rxComplainDto.complains);
                  saveRxComplain = await this.setComplainRepository.save(
                    existingComplainSetup,
                  );
                } else {
                  saveRxComplain = await this.setComplainRepository.save(
                    this.setComplainRepository.create(rxComplainDto.complains),
                  );
                }
              } else {
                saveRxComplain = await this.setComplainRepository.save(
                  this.setComplainRepository.create(rxComplainDto.complains),
                );
              }
              // Set the relation properly
              checkExistingRxCompalin.complains = saveRxComplain;
              await this.rxComplainRepositor.save(checkExistingRxCompalin);
              updateRXComplain.push(checkExistingRxCompalin);
            }
          } else {
            const newRxComplain = this.rxComplainRepositor.create({
              ...rxComplainDto,
              patientsrx: patient,
            });

            if (rxComplainDto.complainId) {
              const existingComplain = await this.setComplainRepository.findOne(
                {
                  where: { id: rxComplainDto.complainId },
                },
              );

              if (existingComplain) {
                newRxComplain.complains = existingComplain;
              } else {
                const newComplain = this.setAdviceRepository.create(
                  rxComplainDto.complains,
                );
                saveRxComplain =
                  await this.setAdviceRepository.save(newComplain);
                newRxComplain.complains = saveRxComplain;
              }
            } else {
              const newComplain = this.setAdviceRepository.create(
                rxComplainDto.complains,
              );
              saveRxComplain = await this.setAdviceRepository.save(newComplain);
              newRxComplain.complains = saveRxComplain;
            }

            const savedRxComplain =
              await this.rxComplainRepositor.save(newRxComplain);
            updateRXComplain.push(savedRxComplain);
          }

          patient.rxComplains = updateRXComplain;
        }
      }

      return this.patientRxRepository.save(patient);
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

  async getPatientById(@Param('id') id: number) {
    try {
      console.log('Id', id);
      const ifExist = await this.patientRxRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!ifExist) {
        throw new NotFoundException(`Entity with id ${id} not found`);
      }

      const data = await this.patientRxRepository.findOne({
        where: {
          id: id,
        },
        relations: {
          patPatientInfo: {
            doctor: true,
          },
          rxmedicine: {
            medicine: true,
          },
          rxInvestigations: {
            setInvestigations: true,
          },
          rxexaminations: {
            setExamination: true,
          },
          rxComplains: {
            complains: true,
          },
          rxAdvice: {
            setAdvice: true,
          },
          rxPackage: {
            setPackage: true,
          },
          rxPlain: {
            setPlain: true,
          },
          rxOnExamination: {
            setOnExaminations: true,
          },
        },
        order: {
          id: 'DESC',
        },
      });

      //https://erp.atilimited.net/api/api-leave-email
      // const formattedData = ({
      //   patientId: data.patPatientInfo.id,
      //   patientsName: data.patPatientInfo.name,
      //    patientDoctorId: data.patPatientInfo.id,
      //   // doctorId: data.patPatientInfo.doctor.id,
      //  // doctorName: data.patPatientInfo.doctor.name,
      //   rxDate: data.RXDATE,
      //   followUp: data.followUp,
      //   medicines: data.rxmedicine.map((medicine) => ({
      //     patientId: data.patPatientInfo.id,
      //     rxmedicineId: medicine.id,
      //     medicineId: medicine.medicine.id,
      //     medicineName: medicine.medicine.medicineName,
      //     numberOfTimes: medicine.numberOfTimes,
      //     morning: medicine.morning,
      //     lunch: medicine.lunch,
      //     evening: medicine.evening,
      //     night: medicine.night,
      //     duration: medicine.duration,
      //     remarks: medicine.remarks,
      //   })),
      //   investigations: data.rxInvestigations.map((investigation) => ({
      //     patientId: data.patPatientInfo.id,
      //     rxInvestigationId: investigation.id,
      //     setInvestigationId: investigation.setInvestigations.id,
      //     investigationName: investigation.setInvestigations.name,
      //   })),

      //   examinations: data.rxexaminations.map((examination) => ({
      //     patientId: data.patPatientInfo.id,
      //     rxExaminationId: examination.id,
      //     setExaminationId: examination.setExamination.id,
      //     examinationName: examination.setExamination.name,
      //   })),

      //   complains: data.rxComplains.map((complain) => ({
      //     patientId: data.patPatientInfo.id,
      //     rxComplianId: complain.id,
      //     setComplainId: complain.complains.id,
      //     complainName: complain.complains.name,
      //   })),
      //   advices: data.rxAdvice.map((advice) => ({
      //     patientId: data.patPatientInfo.id,
      //     rxAdviceId: advice.id,
      //     setAdviceId: advice.setAdvice.id,
      //     adviceName: advice.setAdvice.name,
      //   })),
      // });

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
