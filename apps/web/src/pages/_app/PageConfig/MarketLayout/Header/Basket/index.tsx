import { Image } from '@mantine/core';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import Link from 'next/link';
import { useGetBasket } from 'resources/basket/basket.api';
import { useSignOut } from 'resources/account/account.api';
import { useStyles } from './styles';

export const Basket = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { data: basket } = useGetBasket(1);
  const { mutate: logOut } = useSignOut();
  const { pathname } = router;
  const cartRoute = pathname.split('/').includes(RoutePath.Cart.substring(1));

  const basketImage = cartRoute ? '../images/bluebasket.svg' : '../images/basket.svg';

  return (
    <Link href={RoutePath.CartMyCart}>
      <div className={classes.wrapper}>
        <button className={classes.button} type="button">
          <Image src={basketImage} />
          <div className={classes.countProducts}>{basket?.productsCount || 0}</div>
        </button>
        <button onClick={() => logOut()} className={classes.button} type="button">
          <Image src="../images/logout.svg" />
        </button>
      </div>
    </Link>
  );
};
