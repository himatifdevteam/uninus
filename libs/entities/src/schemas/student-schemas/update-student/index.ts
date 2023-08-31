import { z } from "zod";

export const VSUpdateStudent = z.object({
  avatar: z.any().optional(),
  fullname: z.string().optional(),
  nik: z.string().min(16).max(16).optional(),
  nisn: z.string().min(10).max(10).optional(),
  no_kk: z.string().optional(),
  gender_id: z.number().int().optional(),
  religion_id: z.number().int().optional(),
  birth_place: z.string().optional(),
  birth_date: z.string().optional(),
  phone_number: z.string().optional(),
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
  father_status_id: z.number().optional(),
  father_education_id: z.number().int().optional(),
  father_occupation_id: z.number().int().optional(),
  father_position_id: z.number().int().optional(),
  father_salary_id: z.number().int().optional(),
  mother_name: z.string().optional(),
  mother_status_id: z.number().optional(),
  mother_education_id: z.number().int().optional(),
  mother_occupation_id: z.number().int().optional(),
  mother_position_id: z.number().int().optional(),
  mother_salary_id: z.number().int().optional(),
  guardian_name: z.string().optional(),
  guardian_status_id: z.number().optional(),
  guardian_education_id: z.number().int().optional(),
  guardian_occupation_id: z.number().int().optional(),
  guardian_position_id: z.number().int().optional(),
  guardian_salary_id: z.number().int().optional(),
  guardian_address: z.string().optional(),
  guardian_subdistrict_id: z.number().int().optional(),
  guardian_province_id: z.number().int().optional(),
  guardian_city_id: z.number().int().optional(),
  parent_address: z.string().optional(),
  parent_subdistrict_id: z.number().int().optional(),
  parent_province_id: z.number().int().optional(),
  parent_city_id: z.number().int().optional(),
  scholarship_id: z.number().int().optional(),
  disabilities_id: z.number().int().optional(),
  faculty_id: z.number().int().optional(),
  department_id: z.number().int().optional(),
  academic_year: z.number().int().optional(),
  degree_program_id: z.number().int().optional(),
  first_deparment_id: z.number().int().optional(),
  second_deparment_id: z.number().int().optional(),
  selection_path_id: z.number().int().optional(),
  utbk_pu: z.number().optional(),
  utbk_kk: z.number().optional(),
  utbk_ppu: z.number().optional(),
  utbk_kmbm: z.number().optional(),
  average_utbk: z.number().optional(),
  average_grade: z.number().optional(),
  student_grade: z
    .array(
      z.object({
        subject: z.string(),
        semester: z.string(),
        grade: z.number(),
      }),
    )
    .optional(),
});

export type TVSUpdateStudent = z.infer<typeof VSUpdateStudent>;
