import { Controller } from "@nestjs/common";

import { CollegeService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";
import {
  ISelectDepartmentRequest,
  ISelectFacultyRequest,
  ISelectRequest,
  TCreateFacultyRequest,
  TCreateDepartmentRequest,
  TUpdateFacultyRequest,
  TUpdateDepartmentRequest,
} from "@uninus/entities";

@Controller()
export class CollegeController {
  constructor(private readonly appService: CollegeService) {}

  @MessagePattern("get_degree")
  async getDegreeProgram(payload: ISelectRequest) {
    return await this.appService.getDegreeProgram(payload);
  }

  @MessagePattern("get_faculty")
  async getFaculty(payload: ISelectFacultyRequest) {
    return await this.appService.getFaculty(payload);
  }
  @MessagePattern("create_faculty")
  async createFaculty(payload: TCreateFacultyRequest) {
    return await this.appService.createFaculty(payload);
  }
  @MessagePattern("update_faculty")
  async updateFaculty(payload: TUpdateFacultyRequest) {
    return await this.appService.updateFaculty(payload);
  }
  @MessagePattern("delete_faculty")
  async deleteFaculty(payload: { id: number }) {
    return await this.appService.deleteFaculty(payload);
  }
  @MessagePattern("get_department")
  async getDepartment(payload: ISelectDepartmentRequest) {
    return await this.appService.getDepartment(payload);
  }

  @MessagePattern("create_department")
  async createDepartment(payload: TCreateDepartmentRequest) {
    return await this.appService.createDepartment(payload);
  }

  @MessagePattern("update_department")
  async updateDepartment(payload: TUpdateDepartmentRequest) {
    return await this.appService.updateDepartment(payload);
  }
  @MessagePattern("delete_department")
  async deleteDepartment(payload: { id: string }) {
    return await this.appService.deleteDepartment(payload);
  }
}
