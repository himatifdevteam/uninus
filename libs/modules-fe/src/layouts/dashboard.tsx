'use client';
import { FC, PropsWithChildren, ReactElement, Suspense } from 'react';
import { LazyLoading, SideBar } from '@uninus/components';
import { useLogout } from '../auth';
import { signOut, useSession } from 'next-auth/react';
import { lazily } from 'react-lazily';
import { useRouter } from 'next/navigation';
const { DashboardContent } = lazily(() => import('./dashboardcontent'));

export const DashboardLayout: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const { data: session, status } = useSession();
  const { mutate } = useLogout();
  const handleLogout = async () => {
    mutate({
      onSuccess: () => signOut(),
    });
  };
  const router = useRouter();

  if (status === 'loading') {
    return <LazyLoading />;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  return (
    <main className="flex w-full min-h-full overflow-x-hidden ">
      <SideBar
        profileName="mawar saidah"
        profileEmail="mwrsdh@gmail.com"
        onLogout={handleLogout}
      />
      <Suspense fallback={<LazyLoading />}>
        <DashboardContent>{children}</DashboardContent>
      </Suspense>
    </main>
  );
};
