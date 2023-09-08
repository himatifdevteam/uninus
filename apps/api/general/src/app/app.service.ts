import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaService } from "@uninus/api/models";
import {
  TCitizenshipResponse,
  TDepartmentResponse,
  TFacultyResponse,
  TGenderResponse,
  TMaritalStatusResponse,
  TReligionResponse,
  TSalaryResponse,
  TSelectionResponse,
  ISelectRequest,
  TEducationHistoryResponse,
  TDegreeProgramResponse,
  ISelectFacultyRequest,
  ISelectDepartmentRequest,
  TOccupationResponse,
  TDisabilitiesResponse,
  TYearGraduationResponse,
  ISelectEducationHistoryRequest,
  TScholarshipResponse,
  TOccupationPositionResponse,
  IOccupationPositionRequest,
  TSchoolTypeResponse,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  TDeleteQuestionResponse,
  TParentStatusResponse,
  TTotalRegistransResponse,
  TParentEducationResponse,
  IEducationMajorRequest,
  TEducationMajorResponse,
  IEducationTypeRequest,
  ISelectionRequest,
  TCountryResponse,
  ICountryRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  TProvinceResponse,
  ICityRequest,
  TCityResponse,
  ISubDistrictRequest,
  TSubDistrictResponse,
} from "@uninus/entities";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getDegreeProgram({ search, id }: ISelectRequest): Promise<TDegreeProgramResponse> {
    const degreeProgram = await this.prisma.degreeProgram.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: {
          ...(search && { contains: search }),
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!degreeProgram) {
      throw new RpcException(new NotFoundException("Data Program Pendidikan Tidak Ditemukan!"));
    }

    return { degree_program: degreeProgram };
  }

  async getFaculty({
    search,
    degree_program_id,
    id,
  }: ISelectFacultyRequest): Promise<TFacultyResponse> {
    const faculty = await this.prisma.faculty.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },

        ...(degree_program_id && {
          degreeProgram_id: Number(degree_program_id),
        }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!faculty) {
      throw new RpcException(new NotFoundException("Data Fakultas Tidak Ditemukan!"));
    }

    return { faculty };
  }

  async getDepartment({
    search,
    faculty_id,
    degree_program_id,
    id,
  }: ISelectDepartmentRequest): Promise<TDepartmentResponse> {
    const department = await this.prisma.department.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(faculty_id && { faculty_id: Number(faculty_id) }),
        ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!department) {
      throw new RpcException(new NotFoundException("Data Program Studi Tidak Ditemukan!"));
    }

    return { department };
  }

  async getReligion({ search, id }: ISelectRequest): Promise<TReligionResponse> {
    const religion = await this.prisma.religion.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!religion) {
      throw new RpcException(new NotFoundException("Data Agama Tidak Ditemukan!"));
    }

    return { religion };
  }

  async getMaritalStatus({ search, id }: ISelectRequest): Promise<TMaritalStatusResponse> {
    const maritalStatus = await this.prisma.maritalStatus.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!maritalStatus) {
      throw new RpcException(new NotFoundException("Data Status Pernikahan Tidak Ditemukan!"));
    }

    return { maritalStatus };
  }

  async getGender({ search, id }: ISelectRequest): Promise<TGenderResponse> {
    const gender = await this.prisma.gender.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!gender) {
      throw new RpcException(new NotFoundException("Data Jenis Kelamin Tidak Ditemukan!"));
    }

    return { gender };
  }

  async getCitizenship({ search, id }: ISelectRequest): Promise<TCitizenshipResponse> {
    const citizenship = await this.prisma.citizenship.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!citizenship) {
      throw new RpcException(new NotFoundException("Data Kewarganegaraan Tidak Ditemukan!"));
    }

    return { citizenship };
  }

  async getSelectionPath({
    search,
    id,
    degree_program_id,
  }: ISelectionRequest): Promise<TSelectionResponse> {
    const selection = await this.prisma.selectionPath.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        degree_program_id: degree_program_id && Number(degree_program_id),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!selection) {
      throw new RpcException(new NotFoundException("Data Jalur Seleksi Tidak Ditemukan!"));
    }

    return { selection };
  }

  async getSalary({ search, id }: ISelectRequest): Promise<TSalaryResponse> {
    const salary = await this.prisma.salary.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!salary) {
      throw new RpcException(new NotFoundException("Data Gaji Tidak Ditemukan!"));
    }

    return { salary };
  }

  async getEducation({
    search,
    npsn,
    id,
  }: ISelectEducationHistoryRequest): Promise<TEducationHistoryResponse> {
    const education = await this.prisma.education.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        npsn: { ...(npsn && { contains: npsn }) },
      },
      select: {
        id: true,
        npsn: true,
        name: true,
        province: true,
        sub_district: true,
        district_city: true,
        street_address: true,
      },
    });

    if (!education || education.length === 0) {
      throw new RpcException(new NotFoundException("Data Pendidikan Tidak Ditemukan!"));
    }

    return { education: education };
  }

  async getOccupation({ search, id }: ISelectRequest): Promise<TOccupationResponse> {
    const occupation = await this.prisma.occupation.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!occupation) {
      throw new RpcException(new NotFoundException("Data Pekerjaan Tidak Ditemukan!"));
    }

    return { occupation };
  }

  async getOccupationPosition({
    search,
    occupation_id,
    id,
  }: IOccupationPositionRequest): Promise<TOccupationPositionResponse> {
    const occupationPosition = await this.prisma.occupationPosition.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(occupation_id && { occupation_id: Number(occupation_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!occupationPosition) {
      throw new RpcException(new NotFoundException("Data Jabatan Tidak Ditemukan!"));
    }

    return { occupation_position: occupationPosition };
  }

  async getDisabilites({ search, id }: ISelectRequest): Promise<TDisabilitiesResponse> {
    const disabilities = await this.prisma.disabilities.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!disabilities) {
      throw new RpcException(new NotFoundException("Data Disabilitas Tidak Ditemukan!"));
    }

    return { disabilities };
  }

  async getYearGraduate(): Promise<TYearGraduationResponse> {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 40;

    const year = Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      const id = index + 1;
      return { id: +id, name: year };
    });

    return { year };
  }

  async getScholarship({ search, id }: ISelectRequest): Promise<TScholarshipResponse> {
    const scholarship = await this.prisma.scholarship.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!scholarship) {
      throw new RpcException(new NotFoundException("Data Beasiswa Tidak Ditemukan!"));
    }

    return { scholarship };
  }

  async getEducationType({
    search,
    id,
    degree_program_id,
  }: IEducationTypeRequest): Promise<TSchoolTypeResponse> {
    const educationTypes = await this.prisma.educationTypes.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(degree_program_id && { degree_program_id: Number(degree_program_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!educationTypes) {
      throw new RpcException(new NotFoundException("Data Jenis Sekola Tidak Ditemukan!"));
    }

    return { school_type: educationTypes };
  }

  async getAllQuestion() {
    const questions = await this.prisma.questions.findMany();
    if (!questions) {
      throw new RpcException(new NotFoundException("Soal tidak tersedia"));
    }
    return questions;
  }

  async createQuestion(data: TCreateQuestionRequest) {
    const { question } = data;

    const existingQuestion = await this.prisma.questions.findFirst({
      where: { question },
    });

    if (existingQuestion) {
      throw new RpcException(new ConflictException("Soal sudah tersedia"));
    }

    const newQuestion = await this.prisma.questions.create({
      data: data,
    });

    return newQuestion;
  }

  async updateQuestion(id: number, data: TUpdateQuestionRequest) {
    const existingQuestion = await this.prisma.questions.findFirst({
      where: {
        question: data.question,
      },
    });

    if (existingQuestion && existingQuestion.id !== id) {
      throw new RpcException(new ConflictException("Soal sudah tersedia"));
    }

    await this.prisma.questions.update({
      where: { id },
      data: data,
    });

    return this.prisma.questions.findUnique({ where: { id } });
  }

  async deleteQuestion(id: number): Promise<TDeleteQuestionResponse> {
    const question = await this.prisma.questions.findUnique({
      where: {
        id,
      },
    });
    if (!question) {
      throw new RpcException(new NotFoundException("Soal tidak ditemukan"));
    }

    await this.prisma.questions.delete({ where: { id } });
    return {
      message: "Question deleted",
    };
  }

  async getParentStatus({ search, id }: ISelectRequest): Promise<TParentStatusResponse> {
    const parentStatus = await this.prisma.parentStatus.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!parentStatus) {
      throw new RpcException(new NotFoundException("Data Status Orang Tua Tidak Ditemukan!"));
    }

    return { parent_status: parentStatus };
  }

  async getParentEducation({ search, id }: ISelectRequest): Promise<TParentEducationResponse> {
    const parentEducation = await this.prisma.parentEducation.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!parentEducation) {
      throw new RpcException(new NotFoundException("Data Pendidikan Orang Tua Tidak Ditemukan!"));
    }

    return { parent_education: parentEducation };
  }

  async getEducationMajor({
    search,
    education_type_id,
    id,
  }: IEducationMajorRequest): Promise<TEducationMajorResponse> {
    const schoolMajorTypes = await this.prisma.educationMajor.findMany({
      where: {
        ...(id && { id: Number(id) }),
        name: { ...(search && { contains: search }), mode: "insensitive" },
        ...(education_type_id && { education_type_id: Number(education_type_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!schoolMajorTypes) {
      throw new RpcException(new NotFoundException("Data Jurusan Sekolah Tidak Ditemukan!"));
    }

    return { education_major: schoolMajorTypes };
  }

  async getTotalRegistrans({
    filterType,
    startDate,
    endDate,
  }: IRegistransRequest): Promise<TTotalRegistransResponse> {
    let whereClause: {
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {};

    if (filterType) {
      switch (filterType) {
        case "weekly": {
          const now = new Date();
          const today = now.getUTCDay();
          const weekStart = new Date(now);
          weekStart.setUTCDate(now.getUTCDate() - today);
          weekStart.setUTCHours(0, 0, 0, 0);
          const weekEnd = new Date(weekStart);
          weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
          weekEnd.setUTCHours(23, 59, 59, 999);

          whereClause = {
            createdAt: {
              gte: weekStart,
              lte: weekEnd,
            },
          };
          break;
        }

        case "monthly": {
          const currentDate = new Date();
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59,
            999,
          );

          whereClause = {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          };
          break;
        }

        case "yearly": {
          const currentYear = new Date().getFullYear();
          const startOfYear = new Date(currentYear, 0, 1);
          const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

          whereClause = {
            createdAt: {
              gte: startOfYear,
              lte: endOfYear,
            },
          };
          break;
        }

        case "range": {
          if (!startDate || !endDate) {
            throw new RpcException(
              new BadRequestException(
                "start date dan end date wajib diisi ketika memilih filter range",
              ),
            );
          }

          whereClause = {
            createdAt: {
              gte: new Date(`${startDate}T00:00:00Z`),
              lte: new Date(`${endDate}T23:59:59Z`),
            },
          };
          break;
        }

        default: {
          throw new RpcException(new BadRequestException("Filter Tidak Valid"));
        }
      }
    }

    const [total_registrans, accepted_registrans, usersByDate] = await Promise.all([
      this.prisma.users.count({
        select: {
          _all: true,
        },
        where: whereClause,
      }),
      this.prisma.pMB.findMany({
        where: {
          registration_status: {
            name: {
              contains: "lulus",
              mode: "insensitive",
            },
          },
        },
      }),
      this.prisma.users.findMany({
        where: whereClause,
      }),
    ]);

    if (!accepted_registrans && !usersByDate.length) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }

    return {
      total_registrans: total_registrans._all,
      paids: 0,
      unpaids: 0,
      accepted_registrans: accepted_registrans.length,
    };
  }

  async getInterestEducationPrograms({ filterType }: IInterestEducationPrograms) {
    let whereClause: {
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    } = {};

    if (filterType) {
      switch (filterType) {
        case "weekly": {
          const now = new Date();
          const today = now.getUTCDate();
          const weekStart = new Date(now);
          weekStart.setUTCDate(now.getUTCDate() - today);
          weekStart.setUTCHours(0, 0, 0, 0);
          const weekEnd = new Date(weekStart);
          weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
          weekEnd.setUTCHours(23, 59, 59, 999);

          whereClause = {
            createdAt: {
              gte: weekStart,
              lte: weekEnd,
            },
          };

          break;
        }

        case "monthly": {
          const currentDate = new Date();
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59,
            999,
          );

          whereClause = {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          };
          break;
        }

        case "yearly": {
          const currentYear = new Date().getFullYear();
          const startOfYear = new Date(currentYear, 0, 1);
          const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

          whereClause = {
            createdAt: {
              gte: startOfYear,
              lte: endOfYear,
            },
          };
          break;
        }

        default: {
          throw new RpcException(new BadRequestException("Filter Tidak Valid"));
        }
      }
    }
    const [bachelorCount, magisterCount, doctorCount] = await Promise.all([
      this.prisma.pMB.count({
        where: {
          ...whereClause,
          degree_program_id: 1,
        },
      }),
      this.prisma.pMB.count({
        where: {
          ...whereClause,
          degree_program_id: 2,
        },
      }),
      this.prisma.pMB.count({
        where: {
          ...whereClause,
          degree_program_id: 3,
        },
      }),
    ]);

    if (bachelorCount === 0 && magisterCount === 0 && doctorCount === 0) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }

    const result = {
      bachelor: bachelorCount,
      magister: magisterCount,
      doctor: doctorCount,
    };

    return result;
  }

  async getProvince({ search, id }: ISelectRequest): Promise<TProvinceResponse> {
    const province = await this.prisma.province.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!province) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return {
      province,
    };
  }

  async getCity({ id, province_id, search }: ICityRequest): Promise<TCityResponse> {
    const city = await this.prisma.city.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
        ...(province_id && { province_id: Number(province_id) }),
      },
    });
    if (!city) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return {
      city,
    };
  }

  async getSubDistrict({
    id,
    city_id,
    search,
  }: ISubDistrictRequest): Promise<TSubDistrictResponse> {
    const subDistrict = await this.prisma.subDistrict.findMany({
      where: {
        id: id && Number(id),
        name: {
          ...(search && { contains: search.toUpperCase() }),
        },
        ...(city_id && { city_id: Number(city_id) }),
      },
    });
    if (!subDistrict) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }
    return {
      subdistrict: subDistrict,
    };
  }

  async getCountry({ search, citizenship_id, id }: ICountryRequest): Promise<TCountryResponse> {
    const country = await this.prisma.country.findMany({
      where: {
        id: id && Number(id),
        name: { ...(search && { contains: search.toUpperCase() }) },
        ...(citizenship_id && { citizenship_id: Number(citizenship_id) }),
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!country) {
      throw new RpcException(new NotFoundException("Data tidak ditemukan"));
    }

    return { country };
  }
}
