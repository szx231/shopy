import { Image } from '@mantine/core';
import Link from 'next/link';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

export const Logo = () => {
  const { classes } = useStyles();

  return (
    <Link href={RoutePath.Marketplace}>
      <button className={classes.wrapper} type="button">
        <Image width={40} height={40} src="../images/coube.svg" />
        <Image src="../images/textLogo.svg" />
      </button>
    </Link>
  );
};
