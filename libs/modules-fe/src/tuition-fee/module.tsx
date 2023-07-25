'use client';
import { ReactElement, FC, useState, useEffect, useMemo } from 'react';
import { HeroBanner, LoadingSpinner } from '@uninus/components';
import { dataSarjana, dataMagister } from './store';
import { TTableMagister, TTableSarjana } from './types';
import DataTable, { TableColumn } from 'react-data-table-component';
import { lazily } from 'react-lazily';
const { MainLayout } = lazily(() => import('../layouts'));

export const TuitionFeeModule: FC = (): ReactElement => {
  const [columsOne, setColumsOne] = useState([{}]);
  const [columsTwo, setColumsTwo] = useState([{}]);
  const [pending, setPending] = useState<boolean>(true);

  const columnsSarjana: TableColumn<TTableSarjana>[] = useMemo(
    () => [
      { name: 'Fakultas', selector: (row) => row.fakultas, minWidth: '280px' },
      {
        name: 'Program Studi',
        selector: (row) => row.program_studi,
        minWidth: '400px',
      },
      { name: 'UKT/Semester', selector: (row) => row.ukt },
    ],
    []
  );

  const columnsMagister: TableColumn<TTableMagister>[] = useMemo(
    () => [
      {
        name: 'Program Magister(S2) dan Doktor(S3)',
        selector: (row) => row.program_studi,
        sortable: true,
        minWidth: '400px',
      },
      {
        name: 'UKT/Semester',
        selector: (row) => row.ukt,
      },
    ],
    []
  );

  const customStyles = {
    rows: {
      style: {
        width: '100%',
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColumsOne(columnsSarjana);
      setColumsTwo(columnsMagister);
      setPending(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [columnsSarjana, columnsMagister]);

  return (
    <MainLayout>
      <main className="w-full bg-slate-2">
        <HeroBanner
          heroImages="/illustrations/foto-mahasiswa-bareng-2.webp"
          heroTitleBottomRight="RINCIAN BIAYA KULIAH"
          backgrounColor="bg-grayscale-8"
          blur
        />
        <section className="px-2 lg:px-16 py-12 flex flex-col justify-center items-center ">
          <div className="w-full rounded-lg flex gap-10 justify-between mb-10 items-center p-2 lg:p-6 bg-primary-green">
            <figure className="flex items-center justify-center text-2xl lg:text-5xl p-2 lg:p-6 font-bold rounded-lg bg-primary-white text-primary-green">
              S1
            </figure>
            <h1 className="w-full flex justify-center uppercase text-base lg:text-2xl xl:text-3xl xl:mr-14 font-bold text-primary-white">
              satuan dana pendidikan program sarjana
            </h1>
          </div>

          <section className="rounded-lg w-full">
            <DataTable
              columns={columsOne}
              data={dataSarjana}
              customStyles={customStyles}
              striped
              fixedHeader
              fixedHeaderScrollHeight="400px"
              progressPending={pending}
              progressComponent={<LoadingSpinner className="w-10 h-10" />}
            />
          </section>

          <div className="w-full rounded-lg flex justify-between gap-5 mt-20 mb-10 items-center p-2 lg:p-6 bg-primary-green">
            <figure className="flex w-36 lg:w-64 items-center justify-center text-xl lg:text-4xl p-2 lg:p-4  font-bold rounded-lg bg-primary-white text-primary-green">
              S2 & S3
            </figure>
            <h1 className="w-full flex justify-center uppercase text-xs lg:text-xl xl:text-2xl font-bold text-primary-white">
              satuan dana pendidikan program magister dan doktor
            </h1>
          </div>

          <section className="rounded-lg w-full">
            <DataTable
              columns={columsTwo}
              data={dataMagister}
              customStyles={customStyles}
              striped
              progressPending={pending}
              progressComponent={<LoadingSpinner className="w-10 h-10" />}
            />
          </section>
        </section>
      </main>
    </MainLayout>
  );
};
