import { NextPage } from 'next';
import { ReactElement } from 'react';
import { RegisterModule } from '@uninus/web/modules';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Pendaftaran',
};

const RegisterPage: NextPage = (): ReactElement => <RegisterModule />;
export default RegisterPage;
