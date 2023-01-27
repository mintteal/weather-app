import React from 'react';
import Head from 'next/head';
import { Sidebar } from '../index';

interface ISite {
  title?: string;
  children?: React.ReactNode;
}

const Layout = ({ title = 'Weather App', children }: ISite) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content='A weather app made with Next.js' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Sidebar />
      <main>
        <h2>Content</h2>
        {children}
      </main>
    </>
  );
};

export default Layout;
