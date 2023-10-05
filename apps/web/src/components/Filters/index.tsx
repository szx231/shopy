import { Image, Group } from '@mantine/core';
import { InputNumber } from 'components/InputNumber';
import { useStyles } from './styles';

export const Filters = ({ resetAllHandler }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h4 className={classes.title}>Filters</h4>
        <Group align="baseline" spacing="xs">
          <div className={classes.reset}>Reset All</div>
          <button onClick={() => resetAllHandler()} className={classes.button} type="button">
            <Image alt="resetBtn" src="../images/reset.svg" />
          </button>
        </Group>
      </div>
      <h3 className={classes.priceTitle}>Price</h3>
      <div className={classes.priceRangeContainer}>
        <InputNumber labelText="fromPrice" />
        <InputNumber labelText="toPrice" />
      </div>
    </div>
  );
};
