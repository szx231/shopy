import { useStyles } from './styles';
import { Logo } from './Logo';
import { Categories } from './Сategories';
import { Basket } from './Basket';

export const Header = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Logo />
      <Categories />
      <Basket />
    </div>
  );
};
