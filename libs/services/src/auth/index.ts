import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  TLoginResponse,
  TProfileRequest,
  TProfileResponse,
  TRegisterRequest,
  TRegisterResponse,
  TReqToken,
  getEmailMessageTemplate,
} from '@uninus/entities';
import { PrismaService } from '@uninus/models';
import {
  compareOtp,
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateOtp,
  generateToken,
  clearOtp,
} from '@uninus/utilities';

import { EmailService } from '../email';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async getProfile(reqUser: TProfileRequest): Promise<TProfileResponse> {
    const { email } = reqUser;

    const profile = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        role_id: true,
        createdAt: true,
        avatar: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profil tidak ditemukan');
    }

    return profile;
  }

  async register(data: TRegisterRequest): Promise<TRegisterResponse> {
    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: data.email.toLowerCase(),
      },
    });

    if (isEmailExist) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const password = await encryptPassword(data.password);

    const createdUser = await this.prisma.users.create({
      data: {
        fullname: data.fullname,
        email: data.email.toLowerCase(),
        password,
        role_id: data.role_id,
        avatar:
          'https://res.cloudinary.com/dyominih0/image/upload/v1688846789/MaleProfileDefault_hxtqcy.png',
        students: {
          create: {
            phone_number: data.phone_number,
          },
        },
      },
    });

    if (!createdUser) {
      throw new BadRequestException('Gagal Mendaftar');
    }
    const isCreateOtp = await generateOtp(createdUser?.email, createdUser?.id);

    if (!isCreateOtp) {
      throw new BadRequestException('Gagal membuat otp');
    }
    const msg = 'verifikasi akun anda';

    const html = getEmailMessageTemplate(
      data.fullname,
      isCreateOtp?.token,
      msg
    );

    const sendEmail = this.emailService.sendEmail(
      data.email.toLowerCase(),
      'Verifikasi Email',
      html
    );

    if (!sendEmail) {
      throw new BadRequestException('Gagal mengirimkan kode verifikasi');
    }

    return {
      message: 'Akun Berhasil dibuat!, check email untuk verifikasi',
    };
  }

  async login(email: string, password: string): Promise<TLoginResponse> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email.toLowerCase(),
      },
      select: {
        id: true,
        email: true,
        fullname: true,
        password: true,
        refresh_token: true,
        role_id: true,
        createdAt: true,
        avatar: true,
        isVerified: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }

    if (!user.isVerified) {
      throw new UnauthorizedException('Email belum terverifikasi');
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password salah');
    }
    const { access_token, refresh_token } = await generateToken({
      sub: user.id,
      email: user.email,
      role: user.role?.name || '',
    });
    const expiresIn = 15 * 60 * 1000;
    const now = Date.now();
    const expirationTime = now + expiresIn;

    if (now > expirationTime) {
      throw new UnauthorizedException('Access Token telah berakhir');
    }
    return {
      message: 'Berhasil Login',
      token: {
        access_token,
        exp: expirationTime,
        refresh_token,
      },
      id: user.id,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        role: user.role?.name || '',
        createdAt: user.createdAt,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    };
  }

  async logout(refreshToken: string): Promise<{ message: string }> {
    const result = await this.prisma.users.updateMany({
      where: {
        refresh_token: refreshToken,
      },
      data: {
        refresh_token: null,
      },
    });

    if (!result) {
      throw new UnauthorizedException('Gagal logout');
    }

    return {
      message: 'Berhasil logout',
    };
  }

  async refreshToken(
    reqToken: TReqToken
  ): Promise<{ access_token: string; exp: number }> {
    const expiresIn = 15 * 60 * 1000;
    const access_token = await generateAccessToken(reqToken.user);

    const now = Date.now();
    const expirationTime = now + expiresIn;

    if (now > expirationTime) {
      throw new UnauthorizedException('Access Token telah berakhir');
    }

    return {
      access_token,
      exp: expirationTime,
    };
  }

  async verifyOtp(email: string, otp: string) {
    await clearOtp();

    const isVerified = await compareOtp(email, otp);
    if (!isVerified) {
      throw new NotFoundException('Email atau OTP tidak valid');
    }

    const user = await this.prisma.users.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Gagal verifikasi OTP');
    }
    return {
      message: 'Berhasil verifikasi OTP',
    };
  }

  async resendOtp(email: string) {
    await clearOtp();
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }

    const isCreateOtp = await generateOtp(user?.email, user?.id);

    if (!isCreateOtp) {
      throw new BadRequestException('Gagal membuat otp');
    }
    const msg = 'verifikasi akun anda';

    const html = getEmailMessageTemplate(
      user?.fullname,
      isCreateOtp?.token,
      msg
    );

    const sendEmail = this.emailService.sendEmail(
      email.toLowerCase(),
      'Verifikasi Email',
      html
    );

    if (!sendEmail) {
      throw new BadRequestException('Gagal mengirimkan kode verifikasi');
    }

    return {
      message: 'Berhasil kirim OTP',
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    const msg = 'memperbarui kata sandi anda';

    if (!user) {
      throw new NotFoundException('Akun tidak ditemukan');
    }

    const isCreateOtp = await generateOtp(user?.email, user?.id);
    if (!isCreateOtp) {
      throw new BadRequestException('Gagal membuat otp');
    }
    const html = getEmailMessageTemplate(
      user?.fullname ?? '',
      isCreateOtp?.token,
      msg
    );

    const sendEmail = this.emailService.sendEmail(
      email.toLowerCase(),
      'Reset Password',
      html
    );
    if (!sendEmail) {
      throw new BadRequestException('Gagal mengirimkan kode verifikasi');
    }
    return {
      message: 'Berhasil kirim OTP',
    };
  }

  async verifyOtpPassword(email: string, otp: string) {
    await clearOtp();

    const isVerified = await compareOtp(email, otp);
    if (!isVerified) {
      throw new NotFoundException('Email atau OTP tidak valid');
    }

    return {
      message: 'Berhasil verifikasi OTP',
    };
  }

  async resetPassword(args: { email: string; password: string }) {
    const newPassword = await encryptPassword(args.password);

    const isEmailExist = await this.prisma.users.findUnique({
      where: {
        email: args.email.toLowerCase(),
      },
    });

    if (!isEmailExist) {
      throw new NotFoundException('Email tidak ditemukan');
    }

    const user = await this.prisma.users.update({
      where: {
        email: args.email,
      },
      data: {
        password: newPassword,
      },
    });

    if (!user) {
      throw new BadRequestException('Gagal mengganti password');
    }
    return {
      message: 'Berhasil mengganti password',
    };
  }
}
