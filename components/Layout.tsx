import { ReactNode } from 'react';
import Head from 'next/head';

const Layout = ({
    children,
    title = 'hideo54.com',
    description = 'hideo54のホームページ',
    imageUrl = 'https://img.hideo54.com/icons/main.png',
    twitterCardType = 'summary',
}: {
    children?: ReactNode;
    title?: string;
    description?: string;
    imageUrl?: string;
    twitterCardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
    Header?: JSX.Element;
}) => (
    <>
        <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <meta name='description' content={description} />
            <meta key='og:site_name' property='og:site_name' content='hideo54.com' />
            <meta key='og:title' property='og:title' content={title} />
            <meta key='og:description' property='og:description' content={description} />
            {imageUrl &&
                <meta property='og:image' content={imageUrl} />
            }
            <meta key='twitter:card' name='twitter:card' content={twitterCardType} />
            <meta key='twitter:site' name='twitter:site' content='@hideo54' />
            <title>{title}</title>
            <link rel='icon' type='image/png' href='https://img.hideo54.com/icons/main.png' />
            <link rel='apple-touch-icon' href='https://img.hideo54.com/icons/main.png' />
        </Head>
        <main>
            {children}
        </main>
    </>
);

export default Layout;
