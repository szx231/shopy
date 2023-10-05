import { FC, ReactElement } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import { Summary } from 'components/Summary';
import { useGetBasket } from 'resources/basket/basket.api';
import { convertCentMoneyToInteger } from 'utils/convertCentMoneyToInteger';
import { useGetOrder } from 'resources/order/order.api';
import { Header } from './Header';
import { useStyles } from './styles';

interface MarketLayoutProps {
  children: ReactElement;
}

const MarketLayout: FC<MarketLayoutProps> = ({ children }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const { pathname } = router;
  const { data: basket } = useGetBasket(1);
  const { data: order } = useGetOrder(1);
  const totalPrice = basket?.results
    .reduce((acc, product) => acc + convertCentMoneyToInteger(product.price) * product.quantity, 0);

  const myCartRoute = pathname.split('/')[2] === RoutePath.CartMyCart.split('/')[2];
  const historyRoute = pathname.split('/')[2] === RoutePath.CartHistory.split('/')[2];

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.myCartWrapper}>
        <div className={classes.rightContainer}>
          <div className={classes.buttonWrapper}>
            <Link href={RoutePath.CartMyCart}>
              <button style={{ color: myCartRoute ? '#201F22' : '#A3A3A3' }} className={classes.button} type="button">
                My cart
              </button>
            </Link>
            <Link href={RoutePath.CartHistory}>
              <button style={{ color: historyRoute ? '#201F22' : '#A3A3A3' }} className={classes.button} type="button">
                History
              </button>
            </Link>
          </div>
          <div>{children}</div>
        </div>
        {myCartRoute && !!basket?.results?.length && (
          <div style={{ visibility: !myCartRoute ? 'hidden' : 'visible' }}>
            {totalPrice && <Summary totalPrice={totalPrice} /> }
          </div>
        )}
        {historyRoute && !!order?.results?.length && (
          <div style={{ visibility: !myCartRoute ? 'hidden' : 'visible' }}>
            <Summary totalPrice={totalPrice || 0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketLayout;
