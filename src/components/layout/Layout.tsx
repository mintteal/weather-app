import React from 'react';
import Head from 'next/head';
import { Sidebar } from '../index';

interface ISite {
  home?: boolean;
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ home, title, children }: ISite) => {
  return (
    <>
      <Head>
        <title>TWS {title}</title>
        <meta name='description' content='A weather service app made with Next.js' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Sidebar home={home} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
