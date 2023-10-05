import { FC } from 'react';
import { Button } from '@mantine/core';
import config from 'config';
import { useStyles } from './styles';

type SummaryProp = {
  totalPrice: number;
};

export const Summary: FC<SummaryProp> = ({ totalPrice }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <h4 className={classes.title}>Summary</h4>
      <div className={classes.border} />
      <div className={classes.priceWrapper}>
        <div className={classes.totalPrice}>Total price</div>
        <div className={classes.price}>{`$${totalPrice}`}</div>
      </div>
      <form action={`${config.API_URL}/stripe/pay`} method="post">
        <Button type="submit" fullWidth size="md" radius="md">
          Proceed to Ckeckout
        </Button>
      </form>
    </div>
  );
};
