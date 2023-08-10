export interface ISelectRequest {
  search: string;
}

export interface ISelectEducationHistoryRequest {
  search: string;
  npsn: string;
}

export interface IProvinceRequest {
  search: string;
}

export interface ISelectFacultyRequest extends ISelectRequest {
  degree_program_id: string;
}

export interface ISelectDepartmentRequest extends ISelectRequest {
  faculty_id: string;
  degree_program_id: string;
}

export type TProvinceResponse = {
  province: Array<{
    id: number;
    name: string;
  }>;
};

export interface ICityRequest extends ISelectRequest {
  province_id: string;
}

export interface ICountryRequest extends ISelectRequest {
  citizenship_id: string;
  citizenship?: string;
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
  sub_district: Array<{
    id: number;
    name: string;
  }>;
};

export type TDegreeProgramResponse = {
  degree_program: Array<{
    id: number;
    name: string;
  }>;
};

export type TFacultyResponse = {
  faculty: Array<{
    id: number;
    name: string;
  }>;
};

export type TDepartmentResponse = {
  department: Array<{
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

export type TSelectionResponse = {
  selection: Array<{
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
  education_history: Array<{
    id: number;
    npsn: string;
    name: string;
    province: string;
    district_city: string;
    sub_district: string;
    street_address: string;
  }>;
};

export interface ICountryRequest {
  search: string;
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

export interface IYearGraduationRequest {
  search: string;
}

export type TYearGraduationResponse = {
  year: Array<{
    id: number;
    name: number;
  }>;
};

export type TScholarshipResponse = {
  scholarship: Array<{
    id: number;
    name: string;
  }>;
};

export type TSchoolTypeResponse = {
  school_type: Array<{
    id: number;
    name: string;
  }>;
};
