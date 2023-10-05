import { Image } from '@mantine/core';
import { FC } from 'react';
import { useStyles } from './styles';

interface SortRangeLabelProps {
  fromPrice: number,
  toPrice: number,
  resetPriceRange: () => void,
}

export const SortRangeLabel:FC<SortRangeLabelProps> = ({ fromPrice, toPrice, resetPriceRange }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div>{`$${fromPrice}-$${toPrice}`}</div>
      <button onClick={resetPriceRange} className={classes.button} type="button">
        <Image src="../images/resetLabel.svg" />
      </button>
    </div>
  );
};
