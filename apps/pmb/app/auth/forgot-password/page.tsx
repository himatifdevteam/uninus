import { NextPage } from 'next';
import { ReactElement } from 'react';
import { ForgotModule } from '@uninus/modules-fe';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Lupa Password',
};

const forgotPassword: NextPage = (): ReactElement => <ForgotModule />;
export default forgotPassword;
