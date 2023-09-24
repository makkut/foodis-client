import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { IMeta } from "./meta.interface";

const getTitle = (title: string) => `${title} | Russian Foodies`;

const Meta: FC<PropsWithChildren<IMeta>> = ({
  title,
  description,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {description && (
          <>
            <meta name="description" content={description} />
            <meta name="og:title" content={getTitle(title)} />
            <meta name="og:description" content={description} />
          </>
        )}
      </Head>
      {children}
    </>
  );
};

export default Meta;
