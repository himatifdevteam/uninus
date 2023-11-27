import { Body, Controller, Post, Request, UseGuards, UsePipes } from "@nestjs/common";
import {
  TReqToken,
  VSRegister,
  VSLogin,
  VSVerifyOtp,
  VSResendOtp,
  VSForgotPassword,
  VSNewPassword,
  VSLogout,
  TVSHeaders,
  TRegisterRequest,
  TLoginRequest,
  TLogoutRequest,
  TVerifyOtpRequest,
  TResendOtpRequest,
  TForgotPasswordRequest,
  TResetPasswordRequest,
  VSHeaders,
} from "@uninus/entities";
import { RtGuard } from "@uninus/api/guard";
import { ZodValidationPipe } from "@uninus/api/pipes";
import { AuthService } from "@uninus/api/services";
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  LogoutDto,
  ResendOtpDto,
  NewPasswordDto,
  VerifyOtpDto,
  RefreshTokenDto,
} from "@uninus/api/dto";
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from "@nestjs/swagger";
import { RequestHeaders } from "@uninus/api/decorators";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @ApiOperation({ summary: "Register" })
  @ApiBody({ type: RegisterDto })
  @Post("register")
  async register(
    @Body(new ZodValidationPipe(VSRegister))
    payload: TRegisterRequest,
  ) {
    return await this.appService.register(payload);
  }

  @ApiOperation({ summary: "Login" })
  @ApiBody({ type: LoginDto })
  @ApiHeader({
    name: "app-origin",
    description: "Application Origin",
    required: true,
  })
  @Post("login")
  async login(
    @RequestHeaders(new ZodValidationPipe(VSHeaders)) headers: TVSHeaders,
    @Body(new ZodValidationPipe(VSLogin)) payload: TLoginRequest,
  ) {
    const app_origin = headers["app-origin"];
    return await this.appService.login({ app_origin, ...payload });
  }

  @ApiOperation({ summary: "Logout" })
  @ApiBody({ type: LogoutDto })
  @UsePipes(new ZodValidationPipe(VSLogout))
  async logout(@Body(new ZodValidationPipe(VSLogout)) payload: TLogoutRequest) {
    return await this.appService.logout(payload);
  }

  @ApiOperation({ summary: "Refresh Token" })
  @ApiBody({ type: RefreshTokenDto })
  @Post("refresh")
  @UseGuards(RtGuard)
  async refresh(@Request() { user }: TReqToken) {
    return this.appService.refreshToken({ user });
  }

  @ApiOperation({ summary: "Verify OTP" })
  @ApiBody({ type: VerifyOtpDto })
  @Post("/otp/verify")
  async verifyOtp(@Body(new ZodValidationPipe(VSVerifyOtp)) payload: TVerifyOtpRequest) {
    return this.appService.verifyOtp(payload);
  }

  @ApiOperation({ summary: "Resend OTP" })
  @ApiBody({ type: ResendOtpDto })
  @Post("/otp/resend")
  async resendOtp(
    @Body(new ZodValidationPipe(VSResendOtp))
    payload: TResendOtpRequest,
  ) {
    return this.appService.resendOtp(payload);
  }

  @ApiOperation({ summary: "Forgot Password" })
  @ApiBody({ type: ForgotPasswordDto })
  @Post("/password/forgot")
  async forgotPassword(
    @Body(new ZodValidationPipe(VSForgotPassword))
    payload: TForgotPasswordRequest,
  ) {
    return this.appService.forgotPassword(payload);
  }

  @ApiOperation({ summary: "Reset Password" })
  @ApiBody({ type: NewPasswordDto })
  @Post("/password/reset")
  async resetPassword(
    @Body(new ZodValidationPipe(VSNewPassword))
    payload: TResetPasswordRequest,
  ) {
    return this.appService.resetPassword(payload);
  }
}
