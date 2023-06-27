import "./global.css";
import { FC, PropsWithChildren, ReactElement } from 'react';

export const metadata = {
  title: 'PMB',
  description: 'PMB Docs',
};

const RootLayout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
