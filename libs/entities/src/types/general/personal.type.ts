import { ISelectRequest } from "./pmb.type";

export type TCreateEducationRequest = {
  id: number;
  npsn: string;
  name: string;
  province: string;
  district_city: string;
  sub_district: string;
  street_address: string;
  education_type_id: number;
};

export type TUpdateEducationRequest = {
  id?: number;
  npsn: string;
  name: string;
  province: string;
  district_city: string;
  sub_district: string;
  street_address: string;
  education_type_id: number;
};

export type TDeleteEducationRequest = {
  id?: number;
  npsn: string;
};

export interface IYearGraduationRequest {
  search: string;
}

export type TYearGraduationResponse = {
  year: Array<{
    id: number;
    name: number;
  }>;
};

export type TSchoolTypeResponse = {
  school_type: Array<{
    id: number;
    name: string;
  }>;
};

export interface IParentStatusRequest {
  search: string;
}

export type TParentStatusResponse = {
  parent_status: Array<{
    id: number;
    name: string;
  }>;
};

export interface IParentEducationRequest {
  search: string;
}

export type TParentEducationResponse = {
  parent_education: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISalaryRequest {
  search: string;
}

export type TSalaryResponse = {
  salary: Array<{
    id: number;
    name: string;
  }>;
};

export type TEducationHistoryResponse = {
  education: Array<{
    id: number;
    npsn: string;
    name: string;
    province: string;
    district_city: string;
    sub_district: string;
    street_address: string;
  }>;
};

export interface IEducationTypeRequest extends ISelectRequest {
  degree_program_id: string;
}

export type TEducationTypeResponse = {
  school_type: Array<{
    id: number;
    name: string;
  }>;
};

export interface IEducationMajorRequest extends ISelectRequest {
  search: string;
  education_type_id: string;
}

export type TEducationMajorResponse = {
  education_major: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICountryRequest extends ISelectRequest {
  citizenship_id: string;
}

export type TCountryResponse = {
  country: Array<{
    id: number;
    name: string;
  }>;
};

export interface IOccupationRequest {
  search: string;
}

export type TOccupationResponse = {
  occupation: Array<{
    id: number;
    name: string;
  }>;
};

export interface IOccupationPositionRequest extends ISelectRequest {
  occupation_id: string;
}

export type TOccupationPositionResponse = {
  occupation_position: Array<{
    id: number;
    name: string;
  }>;
};

export interface IDisabilitiesRequest {
  search: string;
}

export type TDisabilitiesResponse = {
  disabilities: Array<{
    id: number;
    name: string;
  }>;
};

export interface IReligionRequest {
  search: string;
}

export type TReligionResponse = {
  religion: Array<{
    id: number;
    name: string;
  }>;
};

export interface IMaritalStatusRequest {
  search: string;
}

export type TMaritalStatusResponse = {
  maritalStatus: Array<{
    id: number;
    name: string;
  }>;
};

export interface IGenderRequest {
  search: string;
}

export type TGenderResponse = {
  gender: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICitizenshipRequest {
  search: string;
}

export type TCitizenshipResponse = {
  citizenship: Array<{
    id: number;
    name: string;
  }>;
};

export type TProvinceResponse = {
  province: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICityRequest extends ISelectRequest {
  province_id: string;
}

export type TCityResponse = {
  city: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISubDistrictRequest extends ISelectRequest {
  city_id: string;
}

export type TSubDistrictResponse = {
  subdistrict: Array<{
    id: number;
    name: string;
  }>;
};

export interface ISelectEducationHistoryRequest extends ISelectRequest {
  npsn: string;
}

export interface IProvinceRequest {}
