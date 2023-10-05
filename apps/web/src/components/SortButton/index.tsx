import React, { useState } from 'react';
import { Image } from '@mantine/core';
import { useAppDispatch } from 'store/hooks';
import { filtersChangeValue } from 'store/Filters';
import { useStyles } from './styles';

export const SortButton = () => {
  const { classes } = useStyles();
  const [toggleSort, setToggleSort] = useState('Sort by newest');
  const dispatch = useAppDispatch();

  const toggle = () => {
    const newToggleSort = toggleSort === 'Sort by newest' ? 'Sort by oldest' : 'Sort by newest';
    const valueToStore = newToggleSort === 'Sort by newest' ? 'newest' : 'oldest';
    setToggleSort(newToggleSort);
    dispatch(filtersChangeValue({ key: 'sortBy', value: valueToStore }));
  };

  return (
    <button className={classes.button} onClick={toggle} type="button">
      <Image src="../images/swap.svg" />
      <span className={classes.text}>{toggleSort}</span>
      <Image
        style={{ transform: toggleSort === 'Sort by newest' ? 'rotate(0deg)' : 'rotate(180deg)' }}
        src="../images/arrowDown.svg"
      />
    </button>
  );
};
