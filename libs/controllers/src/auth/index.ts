import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, LoginDto, RegisterDto, otpDto } from '@uninus/entities';
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
  @Get('me')
  getUsers() {
    return this.appService.profile;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const login = await this.appService.login(dto);
    return login;
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() body: { email: string }) {
    const { email } = body;
    await this.appService.logout(email);
    return { message: 'logout telah berhasil' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('send')
  sendMail(@Body('email') email: string) {
    return this.appService.sendOtp(email)
  }

  @HttpCode(HttpStatus.OK)
  @Post('verif')
  async verifOtp(@Body('email') email: string, @Body('otp') otp: string) {
    const isValid = this.appService.verifyOtp(email,otp)
    if (await isValid){
      return {message: 'Kode otp valid, email telah diverifikasi'}
    }else {
      return {message: 'Kode otp tidak valid'}
    }
  }
}
