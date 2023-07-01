import { BadRequestException, Injectable } from '@nestjs/common';
import { profileProperties, studentProperties } from '@uninus/entities';
import { Prisma, PrismaService } from '@uninus/models';
import { parseRequest } from '@uninus/utilities';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}
  async getStudent(id: string) {
    const student = await this.prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        students: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!student) {
      throw new BadRequestException('data tidak ditemukan', {
        cause: new Error(),
      });
    }
    const { password, refresh_token, role_id, createdAt, ...studentCleanData } =
      student;

    return studentCleanData;
  }

  async createStudent(
    id: string,
    payload: Prisma.StudentsCreateWithoutUserInput
  ) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }

    const student = await this.prisma.students.create({
      data: {
        ...parseRequest(studentProperties, payload),
        user_id: id,
        profile: {
          create: {
            ...parseRequest(profileProperties, payload),
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return student;
  }

  async updateStudent(
    id: string,
    payload: Prisma.StudentsUpdateWithoutUserInput
  ) {
    const student = await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        students: {
          update: {
            ...parseRequest(studentProperties, payload),
            profile: {
              update: { ...parseRequest(profileProperties, payload) },
            },
          },
        },
      },
      include: {
        students: {
          include: {
            profile: true,
          },
        },
      },
    });
    if (!student) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    return {
      student,
    };
  }

  async deleteStudent(id: string) {
    const student = await this.prisma.students.delete({
      where: {
        user_id: id,
      },
      include: {
        profile: true,
      },
    });
    if (!student) {
      throw new BadRequestException('User tidak ditemukan', {
        cause: new Error(),
      });
    }
    return {
      student,
    };
  }
}
