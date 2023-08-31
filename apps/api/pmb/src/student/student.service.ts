import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "@uninus/api/models";
import { CloudinaryService } from "@uninus/api/services"
import { excludeSchema } from "@uninus/api/utilities";
import {
  IGetStudentRequest,
  IGetStudentResponse,
  IDeleteStudentRequest,
  IDeleteStudentResponse,
  IUpdateStudentResponse,
  IUpdateStudentRequest,
  TGraduationStatusRequest,
  TGraduationStatusReponse,
} from "@uninus/entities";

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService, private cloudinaryService: CloudinaryService) {}

  async getStudent(args: IGetStudentRequest): Promise<IGetStudentResponse> {
    const student = await this.prisma.users.findUnique({
      where: {
        id: args.id,
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: {
          include: {
            pmb: {
              include: {
                student_grade: true,
              },
            },
          }
        },
      },
    });

    if (!student) {
      throw new BadRequestException("Data tidak ditemukan", {
        cause: new Error(),
      });
    }
    const { avatar, email, fullname, students } = student;

    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt", "pmb"]);
    return {
      avatar,
      email,
      fullname,
      first_deparment_id: students?.pmb?.first_deparment_id,
      second_deparment_id: students?.pmb?.second_deparment_id,
      selection_path_id: students?.pmb?.selection_path_id,
      degree_program_id: students?.pmb?.degree_program_id,
      student_grade: students?.pmb?.student_grade,
      average_grade: students?.pmb?.average_grade,
      utbk: students?.pmb?.utbk,
      ...studentData,
    };
  }

  async updateStudent(args: IUpdateStudentRequest): Promise<IUpdateStudentResponse> {
    const {
      id,
      fullname,
      avatar,
      email,
      first_deparment_id,
      second_deparment_id,
      selection_path_id,
      degree_program_id,
      utbk,
      student_grade,
      average_grade,
      ...updateStudentPayload
    } = args;

    if (student_grade) {
      for await (const data of student_grade) {
        const updateStudentGrade = await this.prisma.users.update({
          where: {
            id,
          },
          data: {
            students: {
              update: {
                pmb: {
                  update: {
                    student_grade: {
                      updateMany: {
                        where: {
                          subject: data.subject,
                          semester: data.semester,
                        },
                        data: {
                          grade: data.grade,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        });
        if (!updateStudentGrade) {
          throw new BadRequestException("Gagal update nilai", {
            cause: new Error(),
          });
        }
      }
    }
    const student = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        fullname,
        students: {
          update: {
            ...updateStudentPayload,
            pmb: {
              update: {
                first_deparment_id,
                second_deparment_id,
                selection_path_id,
                degree_program_id,
                utbk,
                registration_status_id: 2,
                ...(average_grade && { average_grade: Number(average_grade.toFixed(1)) }),
              },
            },
          },
        },
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: {
          include: {
            pmb: {
              include: {
                student_grade: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
    }
    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt", "pmb"]);
    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.fullname,
      first_deparment_id: student.students?.pmb?.first_deparment_id,
      second_deparment_id: student.students?.pmb?.second_deparment_id,
      selection_path_id: student.students?.pmb?.selection_path_id,
      degree_program_id: student.students?.pmb?.degree_program_id,
      student_grade: student.students?.pmb?.student_grade,
      average_grade: student.students?.pmb?.average_grade,
      utbk: student.students?.pmb?.utbk,
      ...studentData,
    };
  }

  async deleteStudent(args: IDeleteStudentRequest): Promise<IDeleteStudentResponse> {
    const student = await this.prisma.users.delete({
      where: {
        id: args.id,
      },
      select: {
        avatar: true,
        email: true,
        fullname: true,
        students: true,
      },
    });
    if (!student) {
      throw new BadRequestException("User tidak ditemukan", {
        cause: new Error(),
      });
    }

    const studentData = excludeSchema(student?.students, ["id", "user_id", "createdAt"]);

    return {
      avatar: student.avatar,
      email: student.email,
      fullname: student.email,
      ...studentData,
    };
  }

  async checkGraduationStatus({
    registration_number,
  }: TGraduationStatusRequest): Promise<TGraduationStatusReponse> {
    const graduationStatus = await this.prisma.pMB.findFirst({
      where: {
        registration_number,
      },
      include: {
        student:{
          include: {
            user: true,
            department: true
          }
        },
        selection_path: true,
        registration_status: true
      },
    });

    if (!graduationStatus) {
      throw new BadRequestException("Nomor registrasi tidak ditemukan", {
        cause: new Error(),
      });
    }

    const { registration_status_id } = graduationStatus;
    if ((registration_status_id as number) < 5) {
      return {
        message: "Sedang Dalam Proses Seleksi",
      };
    }

    return {
      registration_number: graduationStatus.registration_number,
      fullname: graduationStatus.student?.user.fullname,
      department: graduationStatus.student?.department?.name,
      selection_path: graduationStatus.selection_path?.name,
      registration_status: graduationStatus.registration_status.name,
    };
  }
}
