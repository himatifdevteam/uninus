import { Montserrat } from "next/font/google";
import { AuthProvider, QueryProvider, RecoilProvider } from "@uninus/web/providers";
import "./global.css";

export const metadata = {
  title: "Welcome to web/pegawai",
  description: "Generated by create-nx-workspace",
};

const monserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" key="root-layout-pegawai">
      <body className={monserrat.className}>
        <AuthProvider>
          <QueryProvider>
            <RecoilProvider>
              <main key="landing-pegawai">{props.children}</main>
              <div key="modal-landing" id="modal-landing" />
            </RecoilProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
