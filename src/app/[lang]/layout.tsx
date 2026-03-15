import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {marlinGeo, saprona, geistMono} from '@/lib/fonts';
import {Header} from '@/components/Header';
import {ChatBar} from '@/components/chat/ChatBar';
import {Footer} from '@/components/footer/Footer';
import {CustomCursor} from '@/components/animations/CustomCursor';
import {SmoothScrollProvider} from '@/components/providers/SmoothScrollProvider';
import {TransitionProvider} from '@/components/transitions/TransitionProvider';
import Preloader from '@/components/preloader/Preloader';
import type {Metadata} from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({lang: locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{lang: string}>;
}): Promise<Metadata> {
  const {lang} = await params;
  const t = await getTranslations({locale: lang, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        en: '/en/',
        vi: '/vi/',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{lang: string}>;
}) {
  const {lang} = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang);
  const messages = await getMessages();

  return (
    <html lang={lang}>
      <body
        className={`${marlinGeo.variable} ${saprona.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={lang} messages={messages}>
          <SmoothScrollProvider>
            <Preloader />
            <Header />
            <TransitionProvider>
              <main className="pt-16">
                {children}
              </main>
            </TransitionProvider>
            <Footer />
            <ChatBar />
            <CustomCursor />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
