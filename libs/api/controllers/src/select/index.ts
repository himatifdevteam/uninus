import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { SelectService } from "@uninus/api/services";

@Controller()
@ApiTags("Select")
export class SelectController {
  constructor(private readonly appService: SelectService) {}

  @Get("province")
  @ApiOperation({ summary: "Get Province" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getProvince(@Query("search") search: string) {
    return this.appService.getProvince({ search });
  }

  @Get("city")
  @ApiOperation({ summary: "Get City" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "province_id", required: false })
  getCity(@Query("province_id") province_id: string, @Query("search") search: string) {
    return this.appService.getCity({ province_id, search });
  }

  @Get("sub-district")
  @ApiOperation({ summary: "Get Sub District" })
  @ApiResponse({
    status: 400,
    description: "Location Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "city_id", required: false })
  getSubDistrict(@Query("city_id") city_id: string, @Query("search") search: string) {
    return this.appService.getSubDistrict({ city_id, search });
  }

  @Get("degree-program")
  @ApiOperation({ summary: "Get Degree Program" })
  @ApiResponse({
    status: 400,
    description: "Degree Program Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getDegreeProgram(@Query("search") search: string) {
    return this.appService.getDegreeProgram({ search });
  }

  @Get("faculty")
  @ApiOperation({ summary: "Get Faculty" })
  @ApiResponse({
    status: 400,
    description: "Faculty Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  getFaculty(
    @Query("search") search: string,
    @Query("degree_program_id") degree_program_id: string,
  ) {
    return this.appService.getFaculty({ search, degree_program_id });
  }

  @Get("department")
  @ApiOperation({ summary: "Get Department" })
  @ApiResponse({
    status: 400,
    description: "Department Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "faculty_id", required: false })
  @ApiQuery({ name: "degree_program_id", required: false })
  getDepartment(
    @Query("search") search: string,
    @Query("faculty_id") faculty_id: string,
    @Query("degree_program_id") degree_program_id: string,
  ) {
    return this.appService.getDepartment({ search, faculty_id, degree_program_id });
  }

  @Get("religion")
  @ApiOperation({ summary: "Get Religion" })
  @ApiResponse({
    status: 400,
    description: "Religion Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getReligion(@Query("search") search: string) {
    return this.appService.getReligion({ search });
  }

  @Get("marital-status")
  @ApiOperation({ summary: "Get Marital Status" })
  @ApiResponse({
    status: 400,
    description: "Marital Status Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getMaritalStatus(@Query("search") search: string) {
    return this.appService.getMaritalStatus({ search });
  }

  @Get("gender")
  @ApiOperation({ summary: "Get Gender" })
  @ApiResponse({
    status: 400,
    description: "Gender Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getGender(@Query("search") search: string) {
    return this.appService.getGender({ search });
  }

  @Get("citizenship")
  @ApiOperation({ summary: "Get Citizenship" })
  @ApiResponse({
    status: 400,
    description: "Citizenship Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getCitizenship(@Query("search") search: string) {
    return this.appService.getCitizenship({ search });
  }

  @Get("selection-path")
  @ApiOperation({ summary: "Get Selection Path" })
  @ApiResponse({
    status: 400,
    description: "Selection Path Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getSelectionPath(@Query("search") search: string) {
    return this.appService.getSelectionPath({ search });
  }

  @Get("salary")
  @ApiOperation({ summary: "Get Salary" })
  @ApiResponse({
    status: 400,
    description: "Salary Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getSalary(@Query("search") search: string) {
    return this.appService.getSalary({ search });
  }

  @Get("education-history")
  @ApiOperation({ summary: "Get Education History" })
  @ApiResponse({
    status: 400,
    description: "Education History Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "npsn", required: false })
  getEducationHistory(@Query("search") search: string, @Query("npsn") npsn: string) {
    return this.appService.getEducationHistory({ search, npsn });
  }

  @Get("country")
  @ApiOperation({ summary: "Get Country" })
  @ApiResponse({
    status: 400,
    description: "Country Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "citizenship_id", required: false })
  getCountry(@Query("search") search: string, @Query("citizenship") citizenship_id: string) {
    return this.appService.getCountry({ search, citizenship_id });
  }

  @Get("occupation")
  @ApiOperation({ summary: "Get Occupation" })
  @ApiResponse({
    status: 400,
    description: "Occupation Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getOccupation(@Query("search") search: string) {
    return this.appService.getOccupation({ search });
  }

  @Get("occupation-position")
  @ApiOperation({ summary: "Get Occupation Position" })
  @ApiResponse({
    status: 400,
    description: "Occupation Position Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "occupation_id", required: false })
  getOccupationPosition(
    @Query("search") search: string,
    @Query("occupation_id") occupation_id: string,
  ) {
    return this.appService.getOccupationPosition({ search, occupation_id });
  }

  @Get("disabilities")
  @ApiOperation({ summary: "Get Disabilities" })
  @ApiResponse({
    status: 400,
    description: "Disabilities Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getDisablities(@Query("search") search: string) {
    return this.appService.getDisabilites({ search });
  }

  @Get("year-graduate")
  @ApiOperation({ summary: "Get Year Graduate" })
  @ApiResponse({
    status: 400,
    description: "Year Graduate Not Found",
  })
  getYearGraduate() {
    return this.appService.getYearGraduate();
  }

  @Get("scholarship")
  @ApiOperation({ summary: "Get Scholarship" })
  @ApiResponse({
    status: 400,
    description: "Scholarship Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getScholarship(@Query("search") search: string) {
    return this.appService.getScholarship({ search });
  }

  @Get("school-type")
  @ApiOperation({ summary: "Get School Type" })
  @ApiResponse({
    status: 400,
    description: "School Type Not Found",
  })
  @ApiQuery({ name: "search", required: false })
  getSchoolType(@Query("search") search: string) {
    return this.appService.getSchoolType({ search });
  }
}
