import { Controller } from "@nestjs/common";

import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  ISelectEducationHistoryRequest,
  IOccupationPositionRequest,
  TCreateQuestionRequest,
  TUpdateQuestionRequest,
  IEducationMajorRequest,
  IEducationTypeRequest,
  ISelectionRequest,
  IRegistransRequest,
  IInterestEducationPrograms,
  IInterestDepartment,
  TCreateFacultyRequest,
  TCreateDepartmentRequest,
  TCreateSelectionPathRequest,
  TCreateEducationRequest,
  TCreateScholarshipRequest,
} from "@uninus/entities";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @MessagePattern("get_roles")
  async getRoles(payload: ISelectRequest) {
    return await this.appService.getRoles(payload);
  }

  @MessagePattern("get_degree")
  async getDegreeProgram(payload: ISelectRequest) {
    return await this.appService.getDegreeProgram(payload);
  }

  @MessagePattern("get_faculty")
  async getFaculty(payload: ISelectFacultyRequest) {
    return await this.appService.getFaculty(payload);
  }

  @MessagePattern("get_department")
  async getDepartment(payload: ISelectDepartmentRequest) {
    return await this.appService.getDepartment(payload);
  }

  @MessagePattern("get_religion")
  async getReligion(payload: ISelectRequest) {
    return await this.appService.getReligion(payload);
  }

  @MessagePattern("get_marital_status")
  async getMaritalStatus(payload: ISelectRequest) {
    return await this.appService.getMaritalStatus(payload);
  }

  @MessagePattern("get_gender")
  async getGender(payload: ISelectRequest) {
    return await this.appService.getGender(payload);
  }

  @MessagePattern("get_citizenship")
  async getCitizenship(payload: ISelectRequest) {
    return await this.appService.getCitizenship(payload);
  }

  @MessagePattern("get_selection_path")
  async getSelectionPath(payload: ISelectionRequest) {
    return await this.appService.getSelectionPath(payload);
  }

  @MessagePattern("get_registration_path")
  async getRegistrationPath(payload: ISelectionRequest) {
    return await this.appService.getRegistrationPath(payload);
  }

  @MessagePattern("get_salary")
  async getSalary(payload: ISelectRequest) {
    return await this.appService.getSalary(payload);
  }

  @MessagePattern("get_education_history")
  async getEducationHistory(payload: ISelectEducationHistoryRequest) {
    return await this.appService.getEducation(payload);
  }

  @MessagePattern("get_occupation")
  async getOccupation(payload: ISelectRequest) {
    return await this.appService.getOccupation(payload);
  }

  @MessagePattern("get_occupation_position")
  async getOccupationPosition(payload: IOccupationPositionRequest) {
    return await this.appService.getOccupationPosition(payload);
  }

  @MessagePattern("get_dissabilities")
  async getDissabilities(payload: ISelectRequest) {
    return await this.appService.getDisabilites(payload);
  }

  @MessagePattern("get_year_graduate")
  async getYearGraduate() {
    return await this.appService.getYearGraduate();
  }

  @MessagePattern("get_scholarship")
  async getScholarship(payload: ISelectRequest) {
    return await this.appService.getScholarship(payload);
  }

  @MessagePattern("get_education_type")
  async getSchoolType(payload: IEducationTypeRequest) {
    return await this.appService.getEducationType(payload);
  }

  @MessagePattern("get_question")
  async getQuestion() {
    return await this.appService.getAllQuestion();
  }

  @MessagePattern("create_question")
  async createQuestion(payload: TCreateQuestionRequest) {
    return await this.appService.createQuestion(payload);
  }

  @MessagePattern("update_question")
  async updateQuestion(data: { id: number; payload: TUpdateQuestionRequest }) {
    const id = data.id;
    const payload = data.payload;
    return await this.appService.updateQuestion(id, payload);
  }

  @MessagePattern("delete_question")
  async deleteQuestion(id: number) {
    return await this.appService.deleteQuestion(id);
  }

  @MessagePattern("get_parent_status")
  async getParentStatus(payload: ISelectRequest) {
    return await this.appService.getParentStatus(payload);
  }

  @MessagePattern("get_parent_education")
  async getParentEducation(payload: ISelectRequest) {
    return await this.appService.getParentEducation(payload);
  }

  @MessagePattern("get_education_major")
  async getEducationMajor(payload: IEducationMajorRequest) {
    return await this.appService.getEducationMajor(payload);
  }

  @MessagePattern("get_registrans")
  async getRegistrans(payload: IRegistransRequest) {
    return await this.appService.getTotalRegistrans(payload);
  }

  @MessagePattern("get_interest_education_program")
  async getInterestEducationProgram(payload: IInterestEducationPrograms) {
    return await this.appService.getInterestEducationPrograms(payload);
  }

  @MessagePattern("get_interest_department")
  async getStudyProgramInterest(payload: IInterestDepartment) {
    return await this.appService.getInterestDepartment(payload);
  }

  @MessagePattern("get_registration_status")
  async getRegistrationStatus(payload: ISelectRequest) {
    return await this.appService.getRegistrationStatus(payload);
  }

  @MessagePattern("get_country")
  async getCountry(payload: { search: string; citizenship_id: string; id: number }) {
    return await this.appService.getCountry(payload);
  }

  @MessagePattern("get_subdistrict")
  async getSubdistrict(payload: { id: number; city_id: string; search: string }) {
    return await this.appService.getSubDistrict(payload);
  }

  @MessagePattern("get_city")
  async getCity(payload: { id: number; province_id: string; search: string }) {
    return await this.appService.getCity(payload);
  }

  @MessagePattern("get_province")
  async getProvince(payload: { search: string; id: number }) {
    return await this.appService.getProvince(payload);
  }

  @MessagePattern("create_faculty")
  async createFaculty(payload: TCreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }

  @MessagePattern("create_department")
  async createDepartment(payload: TCreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @MessagePattern("create_selection_path")
  async createSelectionPath(payload: TCreateSelectionPathRequest) {
    return await this.appService.createSelectionPath(payload);
  }

  @MessagePattern("create_education")
  async createEducation(payload: TCreateEducationRequest) {
    return await this.appService.createEducation(payload);
  }

  @MessagePattern("create_scholarship")
  async createScholarship(payload: TCreateScholarshipRequest) {
    return await this.appService.createScholarship(payload);
  }

  @MessagePattern("update_faculty")
  async updateFaculty(data: { id: number; payload: TCreateFacultyRequest }) {
    const id = data.id;
    const payload = data.payload;
    return await this.appService.updateFaculty(id, payload);
  }

  @MessagePattern("update_department")
  async updateDepartment(data: { id: number; payload: TCreateDepartmentRequest }) {
    const id = data.id;
    const payload = data.payload;
    return await this.appService.updateDepartment(id, payload);
  }

  @MessagePattern("update_selection_path")
  async updateSelectionPath(data: { id: number; payload: TCreateSelectionPathRequest }) {
    const id = data.id;
    const payload = data.payload;
    return await this.appService.updateSelectionPath(id, payload);
  }

  @MessagePattern("update_education")
  async updateEducation(data: { id: number; payload: TCreateEducationRequest }) {
    const id = data.id;
    const payload = data.payload;
    return await this.appService.updateEducation(id, payload);
  }

  @MessagePattern("update_scholarship")
  async updateScholarship(data: { id: number; payload: TCreateScholarshipRequest }) {
    const id = data.id;
    const payload = data.payload;
    return await this.appService.updateScholarship(id, payload);
  }

  @MessagePattern("delete_faculty")
  async deleteFaculty(id: number) {
    return await this.appService.deleteFaculty(id);
  }

  @MessagePattern("delete_department")
  async deleteDepartment(id: number) {
    return await this.appService.deleteDepartment(id);
  }

  @MessagePattern("delete_selection_path")
  async deleteSelectionpath(id: number) {
    return await this.appService.deleteSelectionPath(id);
  }

  @MessagePattern("delete_education")
  async deleteEducation(id: number) {
    return await this.appService.deleteEducation(id);
  }

  @MessagePattern("delete_scholarship")
  async deleteScholarship(id: number) {
    return await this.appService.deleteScholarship(id);
  }

  @MessagePattern("get_employee_categories")
  async getCategories(payload: ISelectRequest) {
    return await this.appService.getCategories(payload);
  }
}
