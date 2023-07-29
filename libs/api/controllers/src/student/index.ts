import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TReqToken, UpdateStudentZodSchema } from '@uninus/entities';
import { JwtAuthGuard } from '@uninus/api/guard';
import { ZodValidationPipe } from '@uninus/api/validator';
import { StudentService, UpdateStudentSwagger } from '@uninus/api/services';
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('student')
@ApiTags('Student')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Data Student' })
  @ApiResponse({
    status: 400,
    description: 'Data tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  getData(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    return this.appService.getStudent(sub);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Data Student' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtAuthGuard)
  updateData(
    @Request() reqToken: TReqToken,
    @UploadedFile() avatar: Express.Multer.File,
    @Body(new ZodValidationPipe(UpdateStudentZodSchema))
    studentData: UpdateStudentSwagger
  ) {
    const { sub } = reqToken.user;
    return this.appService.updateStudent(sub, avatar, studentData);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete By Id' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @UseGuards(JwtAuthGuard)
  deleteDataById(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }

  @Put('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update By Id' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtAuthGuard)
  updateDataById(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
    @Body(new ZodValidationPipe(UpdateStudentZodSchema))
    studentData: UpdateStudentSwagger
  ) {
    return this.appService.updateStudent(id, avatar, studentData);
  }

  @Get('/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Data By Id' })
  @ApiResponse({
    status: 400,
    description: 'Data tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  getDataById(@Param('id') id: string) {
    return this.appService.getStudent(id);
  }
}
