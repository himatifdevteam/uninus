"use client";
import { FC, PropsWithChildren, ReactElement, ReactNode } from "react";
import { SideBar } from "@uninus/web/components";
import { useLogout } from "@uninus/web/modules";
import { useSession } from "next-auth/react";
import { Montserrat } from "next/font/google";
import {
  HomeOutlined,
  FormOutlined,
  FileTextOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

type TSideList = Array<{
  label: string;
  link: string;
  icon: ReactNode;
}>;

const DashboardLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const { mutate } = useLogout();
  const { data: session } = useSession();

  const handleLogout = async () => {
    mutate(session?.user?.refresh_token);
  };

  const sideLists: TSideList = [
    {
      label: "Beranda",
      link: "/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "Data Akun",
      link: "/dashboard/data-akun",
      icon: <FileTextOutlined />,
    },
    { label: "Data Pendaftar", link: "/dashboard/data-pendaftar", icon: <FormOutlined /> },
    { label: "Pembayaran", link: "/dashboard/data-bayar", icon: <CreditCardOutlined /> },
  ];

  return (
    <body className={`${monserrat.className}`}>
      <div key="modal-logout" id="modal" />
      <main className="flex w-full min-h-full overflow-x-hidden ">
        <SideBar
          profileName="mawar saidah"
          profileEmail="mwrsdh@gmail.com"
          onLogout={handleLogout}
          sideList={sideLists}
        />

        <section
          key="dashboard"
          className="w-full bg-gray-100 lg:p-10 py-4 bg-grayscale-1 h-screen overflow-y-auto"
        >
          {children}
        </section>
      </main>
    </body>
  );
};

export default DashboardLayout;
