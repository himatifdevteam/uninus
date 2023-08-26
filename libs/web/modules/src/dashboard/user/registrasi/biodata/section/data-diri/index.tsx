import {
  Accordion,
  UploadField,
  TextField,
  RadioButton,
  SelectOption,
  Button,
  SelectField,
} from "@uninus/web/components";
import { dataDiri, occupationS2S3, formBiodataOne, disabilitiesDataDiri } from "../../store";
import { ChangeEvent, FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import {
  useCityGet,
  useProvinceGet,
  useStudentData,
  useSubdistrictGet,
} from "@uninus/web/services";
import {
  useCitizenGet,
  useCountryGet,
  useDisabilitiesGet,
  useGenderGet,
  useReligionGet,
  useStatusGet,
  useOccupationGet,
  useOccupationPositionGet,
  useSalaryGet,
} from "./hooks";
import { GroupBase, SelectInstance } from "react-select";
import { TSelectOption } from "@uninus/web/components";
import { useBiodataUpdate } from "../../hooks";
import { ToastContainer, toast } from "react-toastify";
import { TVSDataDiri, VSDataDiri } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { match } from "ts-pattern";

export const DataDiriSection: FC = (): ReactElement => {
  const [isDisabled, setIsdisabled] = useState<boolean>(false);
  const [disValue, setDisValue] = useState<string | null>(null);
  const [occValue, setOccValue] = useState<string | null>(null);
  const { getStudent } = useStudentData();

  const student = useMemo(() => {
    return getStudent;
  }, [getStudent]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(VSDataDiri),
    mode: "all",
  });

  const [locationMeta] = useState({
    search: "",
    province_id: "",
    city_id: "",
  });

  const { data: getProvincies } = useProvinceGet(locationMeta);

  const provinceOptions = useMemo(
    () =>
      getProvincies?.province?.map((province) => ({
        label: province?.name,
        value: province?.id.toString(),
      })),
    [getProvincies?.province],
  );

  const { data: getCity } = useCityGet({
    province_id: watch("province_id"),
    search: "",
  });

  const cityOptions = useMemo(
    () =>
      getCity?.city?.map((city) => ({
        label: city?.name,
        value: city?.id.toString(),
      })),
    [getCity?.city],
  );

  const { data: getSubdistrict } = useSubdistrictGet({
    city_id: watch("city_id"),
    search: "",
  });

  const subDistrictOptions = useMemo(
    () =>
      getSubdistrict?.subdistrict?.map((subdistrict) => ({
        label: subdistrict?.name,
        value: subdistrict?.id.toString(),
      })),
    [getSubdistrict?.subdistrict],
  );

  const provinceId = watch("province_id");

  useEffect(() => {
    setValue("city_id", null);
  }, [provinceId, setValue]);

  const [religion] = useState({
    search: "",
  });

  const { data: getReligion } = useReligionGet(religion);

  const religionOptions = useMemo(
    () =>
      getReligion?.religion?.map((religion) => ({
        label: religion?.name,
        value: religion?.id.toString(),
      })),
    [getReligion?.religion],
  );

  const [status] = useState({
    search: "",
  });

  const { data: getStatus } = useStatusGet(status);

  const statusOptions = useMemo(
    () =>
      getStatus?.maritalStatus?.map((status) => ({
        label: status?.name,
        value: status?.id.toString(),
      })),
    [getStatus?.maritalStatus],
  );

  const [disabilities] = useState({
    search: "",
  });

  const { data: getDisabilities } = useDisabilitiesGet(disabilities);

  const disabilitiesOptions = useMemo(
    () =>
      getDisabilities?.disabilities?.map((disabilities) => ({
        label: disabilities?.name,
        value: disabilities?.id.toString(),
      })),
    [getDisabilities?.disabilities],
  );

  const [gender] = useState({
    search: "",
  });

  const { data: getGender } = useGenderGet(gender);

  const genderOptions = useMemo(
    () =>
      getGender?.gender?.map((gender) => ({
        label: gender?.name,
        value: gender?.id.toString(),
      })),
    [getGender?.gender],
  );

  const [citizen] = useState({
    search: "",
  });

  const { data: getCitizen } = useCitizenGet(citizen);

  const citizenOptions = useMemo(
    () =>
      getCitizen?.citizenship?.map((citizen) => ({
        label: citizen?.name,
        value: citizen?.id.toString(),
      })),
    [getCitizen?.citizenship],
  );

  const { data: getCountry } = useCountryGet({
    citizenship_id: watch("citizenship_id"),
    search: "",
  });

  const countryOptions = useMemo(
    () =>
      getCountry?.country?.map((country) => ({
        label: country?.name,
        value: country?.id.toString(),
      })),
    [getCountry?.country],
  );

  const [occupation] = useState({
    search: "",
  });

  const { data: getOccupation } = useOccupationGet(occupation);

  const occupationOptions = useMemo(
    () =>
      getOccupation?.occupation?.map((occupation) => ({
        label: occupation?.name,
        value: occupation?.id.toString(),
      })),
    [getOccupation?.occupation],
  );

  useEffect(() => {
    setValue("occupation_id", undefined);
  }, [setValue, occValue]);

  const { data: getOccupationPosition } = useOccupationPositionGet({
    search: "",
    occupation_id: watch("occupation_id"),
  });

  const occupationPositionOptions = useMemo(
    () =>
      getOccupationPosition?.occupation_position?.map((occupationPosition) => ({
        label: occupationPosition?.name,
        value: occupationPosition?.id.toString(),
      })),
    [getOccupationPosition?.occupation_position],
  );

  const [salary] = useState({
    search: "",
  });

  const { data: getSalary } = useSalaryGet(salary);

  const salaryOptions = useMemo(
    () =>
      getSalary?.salary?.map((salary) => ({
        label: salary?.name,
        value: salary?.id.toString(),
      })),
    [getSalary?.salary],
  );

  useEffect(() => {
    reset({
      avatar: student?.avatar,
      citizenship_id: student?.citizenship_id,
      city_id: student?.city_id,
      religion_id: student?.religion_id,
      marital_status_id: student?.marital_status_id,
      gender_id: student?.gender_id,
      disabilities_id: student?.disabilities_id,
      occupation_id: student?.occupation_id,
      occupation_position_id: student?.occupation_position_id,
      salary_id: student?.salary_id,
      degree_program_id: student?.degree_program_id,
      fullname: student?.fullname,
      email: student?.email,
      phone_number: student?.phone_number,
      address: student?.address,
      province_id: student?.province_id,
      subdistrict_id: student?.subdistrict_id,
      country_id: student?.country_id,
      birth_date: student?.birth_date,
      birth_place: student?.birth_place,
    });

    if (student?.disabilities_id) {
      setDisValue("Ya");
    } else {
      setDisValue("Tidak");
    }
    if (student?.occupation_id) {
      setOccValue("Sudah");
    } else {
      setOccValue("Belum");
    }
  }, [student, reset, getStudent]);

  useEffect(() => {
    if (disValue === "Tidak") {
      setValue("disabilities_id", undefined);
    }
  }, [disValue, setValue]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDisValue(e.target.value);
  };

  const handleOccupation = (e: ChangeEvent<HTMLInputElement>): void => {
    setOccValue(e.target.value);
  };

  const citizenref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const provinceref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const subdisref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);
  const countryref = useRef<SelectInstance<TSelectOption, true, GroupBase<TSelectOption>>>(null);

  const citizenshipId = watch("citizenship_id");

  useEffect(() => {
    if (citizenref.current) {
      citizenref.current.clearValue();
    }

    if (provinceref.current) {
      provinceref.current.clearValue();
    }

    if (subdisref.current) {
      subdisref.current.clearValue();
    }

    if (countryref.current) {
      countryref.current.clearValue();
    }
  }, [citizenshipId]);

  const { mutate } = useBiodataUpdate();

  const onSubmit = handleSubmit((data) => {
    try {
      mutate(
        match({
          disable: disValue,
          occ: occValue,
          degreeId: student?.degree_program_id,
        })
          .with(
            {
              disable: "Tidak",
              occ: "Sudah",
              degreeId: 1,
            },
            () => {
              return {
                ...data,
              };
            },
          )
          .otherwise(() => {
            return {
              ...data,
            };
          }),
        {
          onSuccess: () => {
            setIsdisabled(true);
            setTimeout(() => {
              toast.success("Berhasil mengisi formulir", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 500);
          },
          onError: () => {
            setTimeout(() => {
              toast.error("Gagal mengisi formulir", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }, 500);
          },
        },
      );
    } catch (error) {
      toast.error(error as string, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });

  console.log(errors?.nik?.message);

  return (
    <Accordion
      key="data-diri-section"
      title="Data Diri Pendaftar"
      titleClassName="lg:text-lg text-md font-extrabold text-secondary-green-4"
      className="w-full h-auto mt-[2rem] flex flex-col items-center lg:items-baseline lg:ml-[3vw] xl:ml-[5vw] gap-5"
    >
      <form key="data-diri-form" onSubmit={onSubmit} noValidate>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex flex-col gap-7">
          <UploadField
            name="image"
            className="grid lg:flex lg:items-center lg:gap-6 w-full justify-center lg:justify-start items-center h-full gap-y-6 lg:gap-y-0"
            classNameField="w-70% lg:w-auto"
            control={control}
            variant="default"
            defaultImage="/illustrations/dummy-avatar.webp"
            previewImage="w-[150px] h-[150px] bg-cover object-cover rounded-full "
            preview={true}
          />
        </div>

        <section
          key="form-biodata"
          className="flex flex-wrap w-full gap-x-1 justify-center items-center lg:flex lg:justify-between lg:items-center gap-y-4 mt-8 lg:mt-6 lg:w-55% md:w-80% md:flex md:flex-wrap md:justify-between text-left"
        >
          {formBiodataOne.map((biodata, idx) => (
            <TextField
              key={idx}
              placeholder={biodata.placeholder}
              name={biodata.name}
              label={biodata.item}
              labelclassname="text-xl font-semibold"
              variant="sm"
              required
              disabled
              inputWidth="w-70% lg:w-[17vw] xl:w-[15vw] md:w-[21vw]"
              inputHeight="h-10"
              type={biodata.type}
              control={control}
            />
          ))}
          <TextField
            name="email"
            variant="sm"
            type="email"
            placeholder="email@gmail.com"
            labelclassname="text-sm font-semibold"
            label="Email"
            required
            inputWidth="w-70% lg:w-[17vw] xl:w-[20vw] text-base md:w-[21vw]"
            inputHeight="h-10"
            control={control}
            disabled
          />
          <TextField
            inputHeight="h-10"
            name="nik"
            variant="sm"
            type="text"
            placeholder="Nomor dapat dilihat dari KK atau KTP"
            labelclassname="text-sm font-semibold"
            label="NIK"
            required
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
            control={control}
            disabled={isDisabled || !!student?.nik}
            message={errors?.nik?.message}
            status={errors?.nik?.message ? "error" : "none"}
          />
          <TextField
            inputHeight="h-10"
            name="nisn"
            variant="sm"
            type="text"
            placeholder="Nomor Induk Siswa Nasional"
            labelclassname="text-sm font-semibold"
            label="NISN"
            required
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
            control={control}
            disabled={isDisabled || !!student?.nisn}
            message={errors?.nisn?.message}
            status={errors?.nisn?.message ? "error" : "none"}
          />
          <div className="lg:w-full">
            <TextField
              inputHeight="h-10"
              name="no_kk"
              required
              variant="sm"
              type="text"
              placeholder="Nomor dapat dilihat di KK"
              labelclassname="text-sm font-semibold"
              label="No Kartu Keluarga"
              inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
              control={control}
              disabled={isDisabled || !!student?.no_kk}
            />
          </div>
          <SelectOption
            labels="Jenis Kelamin"
            name="gender_id"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.gender_id
                ? genderOptions?.find((gender) => Number(gender.value) === student?.gender_id)
                    ?.label
                : "Jenis Kelamin"
            }
            className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={genderOptions || []}
            isClearable={true}
            isSearchable={false}
            control={control}
            disabled={isDisabled || !!student?.gender_id}
            status={"error"}
            size={"lg"}
          />
          <SelectOption
            name="religion_id"
            labels="Agama"
            labelClassName="font-bold text-xs py-2"
            className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            placeholder={
              student?.religion_id
                ? religionOptions?.find(
                    (religion) => Number(religion.value) === student?.religion_id,
                  )?.label
                : "Agama"
            }
            options={religionOptions || []}
            isClearable={true}
            isSearchable={true}
            control={control}
            isMulti={false}
            disabled={isDisabled || !!student?.religion_id}
            status={"error"}
            size={"lg"}
          />
          <TextField
            inputHeight="h-10"
            name="birth_place"
            variant="sm"
            type="text"
            required
            placeholder="Masukan Kota tempat lahir"
            labelclassname="text-sm font-semibold"
            label="Tempat Lahir"
            inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw]"
            control={control}
            disabled={isDisabled || !!student?.birth_place}
          />
          <TextField
            inputHeight="h-10"
            name="birth_date"
            variant="sm"
            required
            type="date"
            labelclassname="text-xl font-semibold"
            label="Tanggal Lahir"
            inputWidth="lg:w-[27vw] xl:w-[25vw] md:w-[33vw] w-[70vw]"
            control={control}
            disabled={isDisabled || !!student?.birth_date}
          />
          <div className="mr-2">
            <SelectOption
              name="marital_status_id"
              labels="Status"
              labelClassName="font-bold text-xs py-2"
              placeholder={
                student?.marital_status_id
                  ? statusOptions?.find(
                      (status) => Number(status.value) === student?.marital_status_id,
                    )?.label
                  : "Status"
              }
              className=" rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
              options={statusOptions || []}
              isSearchable={false}
              control={control}
              isMulti={false}
              isClearable={true}
              disabled={isDisabled || !!student?.marital_status_id}
              status={"error"}
              size={"lg"}
            />
          </div>
          <SelectOption
            name="citizenship_id"
            labels="Kewarganegaraan"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.citizenship_id
                ? citizenOptions?.find(
                    (citizen) => Number(citizen.value) === student?.citizenship_id,
                  )?.label
                : "Kewarganegaraan"
            }
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={citizenOptions || []}
            isClearable={true}
            isSearchable={true}
            control={control}
            isMulti={false}
            required={true}
            disabled={isDisabled || !!student?.citizenship_id}
            status={"error"}
            size={"lg"}
          />
          <SelectOption
            name="country_id"
            labels="Asal Negara"
            labelClassName="font-bold text-xs py-2"
            placeholder={
              student?.country_id
                ? countryOptions?.find((country) => Number(country.value) === student?.country_id)
                    ?.label
                : "Asal Negara"
            }
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={countryOptions || []}
            isClearable={true}
            isSearchable={true}
            ref={countryref}
            control={control}
            isMulti={false}
            required={false}
            disabled={isDisabled || !!student?.country_id || !watch("citizenship_id")}
            status={"error"}
            size={"lg"}
          />
          <SelectOption
            name="province_id"
            labels="Provinsi"
            placeholder={
              student?.province_id
                ? provinceOptions?.find(
                    (province) => Number(province.value) === student?.province_id,
                  )?.label
                : "Provinsi"
            }
            labelClassName="font-bold text-xs py-2"
            className="bg-slate-3 rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            options={provinceOptions || []}
            isSearchable={true}
            isClearable={true}
            control={control}
            ref={citizenref}
            isMulti={false}
            disabled={isDisabled || !!student?.province_id || countryOptions?.length !== 1}
            status={"error"}
            size={"lg"}
          />
          <SelectOption
            name="city_id"
            labels="Kota/Kabupaten"
            placeholder={
              student?.city_id
                ? cityOptions?.find((city) => Number(city.value) === student?.city_id)?.label
                : "Kota/Kabupaten"
            }
            className="rounded-md text-primary-black  w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold text-xs py-2"
            options={cityOptions || []}
            isSearchable={true}
            isClearable={true}
            ref={provinceref}
            control={control}
            isMulti={false}
            disabled={
              isDisabled ||
              !!student?.city_id ||
              !watch("province_id") ||
              countryOptions?.length !== 1
            }
            status={"error"}
            size={"lg"}
          />
          <SelectOption
            name="subdistrict_id"
            labels="Kecamatan"
            placeholder={
              student?.subdistrict_id
                ? subDistrictOptions?.find(
                    (subdistrict) => Number(subdistrict.value) === student?.subdistrict_id,
                  )?.label
                : "Kecamatan"
            }
            className="rounded-md text-primary-black w-70% lg:w-auto xl:w-[25vw] md:w-[33vw]"
            labelClassName="font-bold text-xs py-2"
            options={subDistrictOptions || []}
            isSearchable={true}
            ref={subdisref}
            control={control}
            isMulti={false}
            isClearable={true}
            disabled={
              isDisabled ||
              !!student?.subdistrict_id ||
              !watch("city_id") ||
              countryOptions?.length !== 1
            }
            status={"error"}
            size={"lg"}
          />

          <div className="px-6 md:px-0 lg:px-0 w-full">
            <TextField
              name="address"
              variant="sm"
              type="text"
              labelclassname="text-xl font-semibold"
              label="Alamat Domisili"
              control={control}
              required
              isTextArea
              textAreaCols={30}
              inputHeight="h-20"
              inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
              className="resize-none bg-grayscale-2  "
              disabled={isDisabled || !!student?.address}
            />
          </div>
          {student?.degree_program_id !== 1 && (
            <section key="education">
              <div className="w-full">
                <h1 className="text-left font-bold text-xl pl-6 md:pl-0">Pekerjaan</h1>
              </div>
              <div className="w-full lg:w-[30%] px-6 md:px-0">
                <RadioButton
                  name="bekerja"
                  label="Sudah"
                  fieldName="Status Bekerja"
                  control={control}
                  options={[
                    { label: "Sudah", value: "Sudah" },
                    { label: "Belum", value: "Belum" },
                  ]}
                  size="lg"
                  variant="primary"
                  onChange={handleOccupation}
                  buttonValue={occValue}
                  disabled={
                    isDisabled ||
                    !!(student?.occupation_id && occValue === "Sudah") ||
                    !!student?.nik
                  }
                />
              </div>

              <SelectOption
                name="occupation_id"
                labels="Pekerjaan"
                className="rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
                placeholder={
                  student?.occupation_id
                    ? getOccupation?.occupation?.find(
                        (occupation) => occupation.id === student?.occupation_id,
                      )?.name
                    : "Pekerjaan"
                }
                labelClassName="text-left font-bold text-xs py-2"
                options={occupationOptions || []}
                isClearable={true}
                isSearchable={true}
                required={false}
                control={control}
                isMulti={false}
                disabled={
                  occValue === "Sudah" && student?.occupation_id
                    ? true
                    : occValue === "Belum" && student?.occupation_id
                    ? true
                    : occValue === "Sudah"
                    ? false
                    : occValue === "Belum"
                    ? true
                    : false
                }
                status={"error"}
                size={"lg"}
              />

              <SelectOption
                name="occupation_position_id"
                labels="Jabatan"
                className="rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
                placeholder={
                  student?.occupation_position_id
                    ? getOccupationPosition?.occupation_position?.find(
                        (occupation_position) =>
                          occupation_position.id === student?.occupation_position_id,
                      )?.name
                    : "Pilih Jabatan"
                }
                labelClassName="text-left font-bold text-xs py-2"
                options={occupationPositionOptions || []}
                isClearable={true}
                isSearchable={true}
                required={false}
                control={control}
                isMulti={false}
                disabled={
                  occValue === "Belum" || isDisabled || !watch("occupation_id")
                    ? true
                    : false ||
                      occupationPositionOptions?.length === 0 ||
                      student?.occupation_position_id
                    ? true
                    : false
                }
                status={"error"}
                size={"lg"}
              />
              <TextField
                inputHeight="h-10"
                name="company_name"
                variant="sm"
                required
                type="text"
                placeholder="Nama Instansi"
                labelclassname="text-left text-sm font-semibold"
                label="Nama Instansi"
                inputWidth="w-70% lg:w-[27vw] xl:w-[25vw] text-base md:w-[33vw] "
                control={control}
                disabled={occValue === "Belum" || isDisabled || !!student?.company_name}
              />
              <div className="px-6 md:px-0 lg:px-0 w-full">
                <TextField
                  name="company_address"
                  variant="sm"
                  type="text"
                  labelclassname="text-left text-xl font-semibold"
                  label="Alamat Instansi"
                  control={control}
                  isTextArea
                  textAreaCols={30}
                  inputHeight="h-20"
                  inputWidth="md:w-[50vw] lg:w-55% w-[70vw]"
                  className="resize-none bg-grayscale-2  "
                  disabled={occValue === "Belum" || isDisabled || !!student?.company_address}
                />
              </div>
              <SelectField
                name="salary_id"
                label="Penghasilan Per Bulan"
                placeholder={
                  student?.salary_id
                    ? getSalary?.salary?.find((salary) => salary.id === student?.salary_id)?.name
                    : "Pilih Pendapatan"
                }
                options={salaryOptions || []}
                control={control}
                disabled={occValue === "Belum" || isDisabled || !!student?.salary_id}
              />
            </section>
          )}
          <div className="w-full lg:w-[30%] px-6 md:px-0">
            <RadioButton
              name="difabel"
              label="Ya"
              fieldName="Berkebutuhan Khusus"
              control={control}
              options={[
                { label: "Ya", value: "Ya" },
                { label: "Tidak", value: "Tidak" },
              ]}
              size="lg"
              variant="primary"
              onChange={handleOnChange}
              buttonValue={disValue}
              disabled={
                isDisabled || !!(student?.disabilities_id && disValue === "Ya") || !!student?.nik
              }
            />
          </div>

          <SelectOption
            name="disabilities_id"
            labels="Kategori Difabel"
            className=" rounded-md text-primary-black lg:w-auto w-70% xl:w-[25vw] md:w-[33vw]"
            placeholder={
              student?.disabilities_id
                ? disabilitiesOptions?.find(
                    (disabilities) => Number(disabilities.value) === student?.disabilities_id,
                  )?.label
                : "Kategori Difabel"
            }
            labelClassName="font-bold text-xs py-2"
            options={disabilitiesOptions || []}
            isClearable={true}
            isSearchable={true}
            required={false}
            control={control}
            isMulti={false}
            disabled={
              disValue === "Ya" && student?.disabilities_id
                ? true
                : disValue === "Tidak" && student?.disabilities_id
                ? true
                : disValue === "Ya"
                ? false
                : disValue === "Tidak"
                ? true
                : false
            }
            status={"error"}
            size={"lg"}
          />
        </section>
        <div className="flex w-full justify-center lg:justify-end py-4 mt-8">
          <Button
            type="submit"
            variant="filled"
            size="md"
            width="w-50% lg:w-25% xl:w-15%"
            disabled={isDisabled || !!student?.nik}
          >
            Submit
          </Button>
        </div>
      </form>
    </Accordion>
  );
};
