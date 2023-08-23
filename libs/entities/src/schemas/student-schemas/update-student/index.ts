import { z } from "zod";

export const VSUpdateStudent = z.object({
  avatar: z.any().optional(),
  fullname: z.string().optional(),
  nik: z.string().min(16).max(16).optional(),
  nisn: z.string().min(10).max(10).optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  gender_id: z.number().int().optional(),
  phone_number: z.string().optional(),
  religion_id: z.number().int().optional(),
  citizenship_id: z.number().int().optional(),
  marital_status_id: z.number().int().optional(),
  country_id: z.number().int().optional(),
  address: z.string().optional(),
  subdistrict_id: z.number().int().optional(),
  province_id: z.number().int().optional(),
  city_id: z.number().int().optional(),
  education_type_id: z.number().int().optional(),
  graduation_year: z.string().optional(),
  education_major_id: z.number().optional(),
  education_npsn: z.string().optional(),
  salary_id: z.number().optional(),
  occupation_id: z.number().optional(),
  occupation_position_id: z.number().optional(),
  company_name: z.string().optional(),
  company_address: z.string().optional(),
  father_name: z.string().optional(),
  mother_name: z.string().optional(),
  guardian_name: z.string().optional(),
  father_status_id: z.number().optional(),
  mother_status_id: z.number().optional(),
  guardian_status_id: z.number().optional(),
  parent_address: z.string().optional(),
  parent_subdistrict_id: z.number().optional(),
  parent_province_id: z.number().optional(),
  parent_city_id: z.number().optional(),
  father_education_id: z.number().int().optional(),
  mother_education_id: z.number().int().optional(),
  guardian_education_id: z.number().int().optional(),
  father_occupation_id: z.number().int().optional(),
  mother_occupation_id: z.number().int().optional(),
  guardian_occupation_id: z.number().int().optional(),
  father_salary_id: z.number().int().optional(),
  mother_salary_id: z.number().int().optional(),
  guardian_salary_id: z.number().int().optional(),
  guardian_address: z.string().optional(),
  guardian_subdistrict_id: z.number().optional(),
  guardian_province_id: z.number().optional(),
  guardian_city_id: z.number().optional(),
  faculty_id: z.number().int().optional(),
  education_programs_id: z.number().int().optional(),
  study_program_id: z.number().int().optional(),
  selection_type_id: z.number().int().optional(),
});

export type TVSUpdateStudent = z.infer<typeof VSUpdateStudent>;
