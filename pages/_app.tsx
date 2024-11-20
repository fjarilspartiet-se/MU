// pages/_app.tsx
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { UserProvider } from '../context/UserContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      messages={pageProps.messages}
      locale={router.locale || 'sv'}
      defaultTranslations={pageProps.messages}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </NextIntlClientProvider>
  );
}
