import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SelectService } from '@uninus/api/services';

@Controller('select')
@ApiTags('Select')
export class SelectController {
  constructor(private readonly appService: SelectService) {}

  @Get('degree-program')
  @ApiOperation({ summary: 'Get Degree Program' })
  @ApiResponse({
    status: 400,
    description: 'Degree Program Not Found',
  })
  getDegreeProgram(@Query('search') search: string) {
    return this.appService.getDegreeProgram({ search });
  }

  @Get('faculty')
  @ApiOperation({ summary: 'Get Faculty' })
  @ApiResponse({
    status: 400,
    description: 'Faculty Not Found',
  })
  getFaculty(
    @Query('search') search: string,
    @Query('degree_program_id') degree_program_id: string
  ) {
    return this.appService.getFaculty({ search, degree_program_id });
  }

  @Get('department')
  @ApiOperation({ summary: 'Get Program Studi' })
  @ApiResponse({
    status: 400,
    description: 'Department Not Found',
  })
  getDepartment(
    @Query('search') search: string,
    @Query('faculty_id') faculty_id: string
  ) {
    return this.appService.getDepartment({ search, faculty_id });
  }

  @Get('religion')
  @ApiOperation({ summary: 'Get Religion' })
  @ApiResponse({
    status: 400,
    description: 'Religion Not Found',
  })
  getReligion(@Query('search') search: string) {
    return this.appService.getReligion({ search });
  }

  @Get('marital-status')
  @ApiOperation({ summary: 'Get Marital Status' })
  @ApiResponse({
    status: 400,
    description: 'Marital Status Not Found',
  })
  getMaritalStatus(@Query('search') search: string) {
    return this.appService.getMaritalStatus({ search });
  }

  @Get('gender')
  @ApiOperation({ summary: 'Get Gender' })
  @ApiResponse({
    status: 400,
    description: 'Gender Not Found',
  })
  getGender(@Query('search') search: string) {
    return this.appService.getGender({ search });
  }

  @Get('citizenship')
  @ApiOperation({ summary: 'Get Citizenship' })
  @ApiResponse({
    status: 400,
    description: 'Citizenship Not Found',
  })
  getCitizenship(@Query('search') search: string) {
    return this.appService.getCitizenship({ search });
  }

  @Get('registration-status')
  @ApiOperation({ summary: 'Get Registration Status' })
  @ApiResponse({
    status: 400,
    description: 'Registration Status Not Found',
  })
  getRegistrationStatus(@Query('search') search: string) {
    return this.appService.getSelection({ search });
  }

  @Get('salary')
  @ApiOperation({ summary: 'Get Salary' })
  @ApiResponse({
    status: 400,
    description: 'SSalary Not Found',
  })
  getSalary(@Query('search') search: string) {
    return this.appService.getSalary({ search });
  }

  @Get('education-history')
  @ApiOperation({ summary: 'Get Bachelor Degree' })
  @ApiResponse({
    status: 400,
    description: 'Education History Not Found',
  })
  getEducationHistory(@Query('search') search: string) {
    return this.appService.getEducationHistory({ search });
  }

  @Get('country')
  @ApiOperation({ summary: 'Get Country' })
  @ApiResponse({
    status: 400,
    description: 'Country Not Found',
  })
  getCountry(@Query('search') search: string) {
    return this.appService.getCounty({ search });
  }
}
