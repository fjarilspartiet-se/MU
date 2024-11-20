// pages/index.tsx
import { GetStaticProps } from 'next';
import MainLayout from '../components/MainLayout';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'sv' }) => {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
};
