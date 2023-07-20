export type TBiodataRequest = {
  avatar?: FileList | string;
  nim?: string;
  nisn?: string;
  identification_type?: string;
  identification_number?: string;
  birth_place?: string;
  birth_date?: string;
  gender?: string;
  EReligion?: string;
  citizenship?: string;
  marital_status?: string;
  country?: string;
  address?: string;
  rt?: string;
  rw?: string;
  postal_code?: string;
  subdistrict?: string;
  province?: string;
  city?: string;
  phone_number?: string;
  kk_number?: string;
  school_type?: string;
  school_major?: string;
  school_name?: string;
  school_address?: string;
  school_postal_code?: string;
  school_subdistrict?: string;
  school_province?: string;
  school_city?: string;
  school_phone_number?: string;
  graduation_year?: string;
  father_name?: string;
  mother_name?: string;
  guardian_name?: string;
  parent_address?: string;
  parent_rt?: string;
  parent_rw?: string;
  parent_postal_code?: string;
  parent_subdistrict?: string;
  parent_province?: string;
  parent_phone_number?: string;
  father_education?: string;
  mother_education?: string;
  guardian_education?: string;
  father_occupation?: string;
  mother_occupation?: string;
  guardian_occupation?: string;
  father_income?: string;
  mother_income?: string;
  guardian_income?: string;
  selection_type?: string;
  program?: string;
  academic_year?: string;
  registration_wave?: string;
};

export type TBiodataResponse = TBiodataRequest;
export type TBiodataUpdateResponse = TBiodataResponse;
export type TBiodataUpdateRequest = TBiodataRequest;
