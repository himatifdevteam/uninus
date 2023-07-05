'use client';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  CheckBox,
  SelectField,
  Modal,
  UploadField,
  AccordionTab,
} from '@uninus/components';

const LandingPage: FC = (): ReactElement => {
  const { control } = useForm({
    defaultValues: {
      checkboxField: false,
      uploadField: '',
    },
  });
  const titles = ['Potongan', 'Metode Seleksi', 'Persyaratan Umum', 'Persyaratan Khusus', 'Periode'];
  const nusantaraUnggul = [
    ['50 % UKT Semester 1'],
    ['UTBK ( Ujian Tulis Berbasis Komputer) Nilai Rapot'],
    ['Siswa Lulusan 2021, 2022 dan 2023'],
    ['Rata - rata > 575', 'Rata - Rata > 85', 'Total 3 Mata Pelajaran :', 'Matematika, Bahasa Inggris dan Bahasa Indonesia'],
    ['Januari 2023 s.d Maret 2023'],
];
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="px-6 py-12">
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="primary"
          size="sm"
          labelSize="sm"
          label="Setuju"
          message="Valid"
        />

        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="error"
          size="md"
          labelSize="md"
          label="Setuju"
          message="Valid"
        />

        <CheckBox
          control={control}
          name={'checkboxField'}
          required
          variant="warning"
          size="lg"
          labelSize="lg"
          label="Setuju"
          message="Valid"
        />
        <div className="flex gap-2">
          <SelectField
            name="peran"
            label="Peran"
            size="sm"
            placeholder="pilih peran"
            status="none"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            value="Dosen"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="sm"
            placeholder="pilih peran"
            status="warning"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="warning sample"
            value="Mahasiswa"
          />
        </div>
        <div className="flex gap-2">
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="error"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="error sample"
            value="Mahasiswa"
          />
          <SelectField
            name="peran"
            label="Peran"
            size="md"
            placeholder="pilih peran"
            status="success"
            options={['Mahasiswa', 'Dosen', 'Staff']}
            message="success sample"
            value="Staff"
          />
        </div>

        <div className="flex gap-4">
          <Button
            href="https://litera.uninus.ac.id/uninus/login.jsp"
            variant="primary"
            size="sm"
            width="w-28"
            height="h-8"
          >
            Litera
          </Button>
          <Button
            href="https://www.facebook.com/"
            variant="error"
            size="md"
            width="w-28"
            height="h-8"
          >
            Facebook
          </Button>
          <Button
            href="https://www.google.com/"
            variant="warning"
            size="lg"
            width="w-28"
            height="h-8"
          >
            Google
          </Button>
        </div>
        <Button
          onClick={handleOpenModal}
          variant="primary"
          size="sm"
          width="w-28"
          height="h-8"
        >
          Modal
        </Button>

        <Modal
          showModal={showModal}
          modalTitle="INI CERITANYA MODAL"
          onClose={handleCloseModal}
          onSubmit={() => alert('Submit Succes')}
          submitText="Save"
          closeText="Cancel"
        />
        <div className="flex gap-2 w-auto">
          <UploadField
            control={control}
            label="Upload"
            variant="lg"
            name="uploadField"
            required
            accept="application/pdf"
          />
          <UploadField
            control={control}
            label="Upload"
            variant="md"
            name="uploadField"
            required
            accept="application/pdf"
          />
          <UploadField
            control={control}
            label="Upload"
            variant="sm"
            name="uploadField"
            required
            accept="application/pdf"
          />
        </div>
      </div>
        <div className='flex relative md:flex-row flex-col gap-4 w-full'>
        <AccordionTab header='Nusantara Unggul' contents={nusantaraUnggul} titles={titles} />
        <AccordionTab header='Nusantara Unggul' contents={nusantaraUnggul} titles={titles} />
        </div>
    </section>
  );
};

export default LandingPage;
