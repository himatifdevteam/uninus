import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  JwtAuthGuard,
  LoginDto,
  RegisterDto,
  TLoginAuth,
  ResetPasswordDto,
} from '@uninus/entities';
import { AuthService } from '@uninus/services';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}
  @Get('/')
  getData(
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Query('order_by') orderBy: 'asc' | 'desc',
    @Query('filter_by') filterBy: string,
    @Query('search') search: string
  ) {
    return this.appService.getUser({
      where: {
        OR: [
          {
            fullname: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        [filterBy]: orderBy,
      },
      page,
      perPage,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.appService.register(registerDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/me')
  async getUsers(@Request() req: TLoginAuth) {
    const { email, nik } = req.user;
    return await this.appService.profile(nik, email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.appService.login(dto.email, dto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() body: { refresh_token: string }) {
    const { refresh_token } = body;
    return await this.appService.logout(refresh_token);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send')
  sendMail(@Body('email') email: string) {
    return this.appService.sendOtp(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('verif')
  async verifOtp(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = this.appService.verifyOtp(email, otp);
    if (await isValid) {
      return { message: 'Kode otp valid, email telah diverifikasi' };
    } else {
      return { message: 'Kode otp tidak valid' };
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto
  ): Promise<{ message: string }> {
    return this.appService.resetPassword(resetPasswordDto);
  }
}
