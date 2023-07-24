import { ResetModule } from '@uninus/modules-fe';
import { NextPage } from 'next';
import { ReactElement } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PMB | Ubah Password',
};

const resetPassword: NextPage = (): ReactElement => <ResetModule />;
export default resetPassword;
