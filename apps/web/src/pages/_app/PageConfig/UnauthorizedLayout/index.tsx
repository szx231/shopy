import { FC, ReactElement } from 'react';
import { SimpleGrid, MediaQuery } from '@mantine/core';
import Image from 'next/image';
import { useStyles } from './styles';

interface UnauthorizedLayoutProps {
  children: ReactElement;
}

const UnauthorizedLayout: FC<UnauthorizedLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 'sm' }]} style={{ padding: '30px' }}>
      <div className={classes.wrapper}>
        <main className={classes.content}>{children}</main>
      </div>

      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Image
          alt="app info"
          src="../images/welcome-image.svg"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%' }}
        />
      </MediaQuery>
    </SimpleGrid>
  );
};

export default UnauthorizedLayout;
