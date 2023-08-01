import { EGender, ECitizenship, EReligion } from '../enum';
import { EOccupation } from '../enum/job';
import { TFIle } from './file';
export interface IGetStudentRequest {
  id: string;
}

export interface IStudentData {
  email: string;
  fullname: string;
  nik?: string | null;
  nisn?: string | null;
  birth_place?: string | null;
  birth_date?: string | null;
  gender?: EGender;
  phone_number?: string | null;
  religion?: EReligion;
  citizenship?: ECitizenship;
  marital_status?: string | null;
  country?: string | null;
  address?: string | null;
  postal_code?: string | null;
  subdistrict?: string | null;
  province?: string | null;
  city?: string | null;
  school_type?: string | null;
  graduation_year?: string | null;
  school_major?: string | null;
  school_name?: string | null;
  school_npsn?: string | null;
  school_address?: string | null;
  school_postal_code?: string | null;
  school_subdistrict?: string | null;
  school_province?: string | null;
  school_city?: string | null;
  school_phone_number?: string | null;
  father_name?: string | null;
  mother_name?: string | null;
  guardian_name?: string | null;
  father_status?: string | null;
  mother_status?: string | null;
  guardian_status?: string | null;
  parent_address?: string | null;
  parent_postal_code?: string | null;
  parent_subdistrict?: string | null;
  parent_province?: string | null;
  parent_city?: string | null;
  father_education?: string | null;
  mother_education?: string | null;
  guardian_education?: string | null;
  father_occupation?: EOccupation;
  father_occupation_position?: string | null;
  mother_occupation?: EOccupation;
  mother_occupation_position?: string | null;
  guardian_occupation?: EOccupation;
  guardian_occupation_position?: string | null;
  father_income?: string | null;
  mother_income?: string | null;
  guardian_income?: string | null;
  guardian_address?: string | null;
  guardian_postal_code?: string | null;
  guardian_subdistrict?: string | null;
  guardian_province?: string | null;
  guardian_city?: string | null;
  faculty_type?: string | null;
  education_programs?: string | null;
  study_program?: string | null;
  selection_type?: string | null;
  family_card?: string | null;
  pass_photo?: string | null;
  ktp_card?: string | null;
  school_report_card?: string | null;
  birth_certificate?: string | null;
  additional_documents?: string | null;
  ijazah_card?: string | null;
  kipk_card?: string | null;
  academic_year?: string | null;
  registration_wave?: string | null;
  registration_status?: string | null;
}

export interface IGetStudentResponse extends IStudentData {
  avatar: string | null;
}

export interface IDeleteStudentRequest extends IGetStudentRequest {
  id: string;
}

export interface IDeleteStudentResponse extends IStudentData {
  avatar: string | null;
}

export interface IUpdateStudentResponse extends IStudentData {
  avatar: string | null;
}
export interface IUpdateStudentRequest
  extends IGetStudentRequest,
    IStudentData {
  avatar: TFIle;
}
