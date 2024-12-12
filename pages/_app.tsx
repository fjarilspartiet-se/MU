// pages/_app.tsx
import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import { UserProvider } from '../context/UserContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log('App rendering, locale:', router.locale);
  console.log('pageProps:', pageProps);

  return (
    <NextIntlClientProvider
      messages={pageProps.messages}
      locale={router.locale || 'sv'}
      timeZone="Europe/Stockholm"
      onError={(error) => {
        console.error('NextIntl error:', error);
        if (error.code === 'MISSING_MESSAGE') {
          return undefined;
        }
        throw error;
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </NextIntlClientProvider>
  );
}
