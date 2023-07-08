'use client';
import { ReactElement } from 'react';
import { HeroBanner } from '@uninus/components';
import { NextPage } from 'next';
import { dataSarjana, dataMagister } from './store';
import { TTableMagister, TTableSarjana } from './types';
import { MainLayout } from '@uninus/modules-fe';
import DataTable, { TableColumn } from 'react-data-table-component';

export const TuitionFeeModule: NextPage = (): ReactElement => {

  const columns: TableColumn<TTableSarjana>[] = [
    { name: 'Fakultas', selector: (row) => row.fakultas },
    {
      name: 'Program Studi',
      selector: (row) => row.program_studi,
    },
    { name: 'UKT/Semester', selector: (row) => row.ukt, sortable: true },
  ];

  const columnsMagister: TableColumn<TTableMagister>[] = [
    {
      name: 'Program Magister(S2) dan Doktor(S3)',
      selector: (row) => row.program_studi,
      width: '60%',
      sortable: true,
    },
    { name: 'UKT/Semester', selector: (row) => row.ukt, sortable: true },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '38px',
        fontSize: '13px',
        background: '#F1FFF0',
      },
      stripedStyle: {
        background: 'rgb(248 250 252)',
      },
    },

    headCells: {
      style: {
        backgroundColor: '#009647',
        color: '#FFFFFF',
        fontSize: '18px',
      },
    },
  };

  return (
    <MainLayout>
      <main className="w-full bg-slate-2">
        <HeroBanner
          heroImages="/illustrations/foto-mahasiswa-bareng-2.jpg"
          heroTitleBottomRight="RINCIAN BIAYA KULIAH"
          backgrounColor="bg-grayscale-8"
          blur
        />
        <section className="px-16 py-12 flex flex-col justify-center items-center ">
          <div className="w-full rounded-lg flex justify-between mb-10 items-center p-6 font-bebasNeue bg-primary-green">
            <figure className="flex items-center justify-center text-5xl p-6 font-extramedium rounded-lg bg-primary-white text-primary-green">
              S1
            </figure>
            <h1 className="w-full flex justify-center uppercase text-2xl xl:text-3xl xl:mr-14 font-extramedium text-primary-white">
              satuan dana pendidikan program sarjana
            </h1>
          </div>

          <section className="rounded-lg w-full">
            <DataTable
              columns={columns}
              data={dataSarjana}
              customStyles={customStyles}
              striped
            />
          </section>

          <div className="w-full  rounded-lg flex justify-between mt-20 mb-10 items-center p-6 font-bebasNeue bg-primary-green">
            <figure className="flex w-64 items-center justify-center text-4xl p-4  font-extramedium rounded-lg bg-primary-white text-primary-green">
              S2 & S3
            </figure>
            <h1 className="w-full flex justify-center uppercase text-xl xl:text-2xl  font-extramedium text-primary-white">
              satuan dana pendidikan program magister dan doktor
            </h1>
          </div>

          <section className="rounded-lg w-full">
            <DataTable
              columns={columnsMagister}
              data={dataMagister}
              customStyles={customStyles}
              striped
            />
          </section>
        </section>
      </main>
    </MainLayout>
  );
};
