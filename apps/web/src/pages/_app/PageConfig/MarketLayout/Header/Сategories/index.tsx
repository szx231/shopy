import { useRouter } from 'next/router';
import { RoutePath } from 'routes';
import { useStyles } from './styles';

export const Categories = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { pathname } = router;

  const handleMarketplaceClick = () => {
    router.push(RoutePath.Marketplace);
  };

  const handleYourProductsClick = () => {
    router.push(RoutePath.YourProducts);
  };

  return (
    <div className={classes.wrapper}>
      <button
        onClick={handleMarketplaceClick}
        className={pathname === RoutePath.Marketplace ? classes.buttonChecked : classes.button}
        type="button"
      >
        Marketplace
      </button>
      <button
        onClick={handleYourProductsClick}
        className={pathname === RoutePath.YourProducts ? classes.buttonChecked : classes.button}
        type="button"
      >
        Your Products
      </button>
    </div>
  );
};
