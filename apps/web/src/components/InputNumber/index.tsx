import { useAppDispatch, useAppSelector } from 'store/hooks';
import { filtersChangeValue } from 'store/Filters';
import { useStyles } from './styles';

export const InputNumber = ({ labelText }: { labelText: 'fromPrice' | 'toPrice' }) => {
  const dispatch = useAppDispatch();
  const { fromPrice, toPrice } = useAppSelector((state) => state.Filters);
  const MAX_VALUE = 150000;

  const { classes } = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const onlyNumbers = value.replace(/\D/g, '');

    if (MAX_VALUE > Number(onlyNumbers)) {
      dispatch(filtersChangeValue({ key: labelText, value: onlyNumbers }));
    }
  };

  return (
    <div className={classes.container}>
      <label htmlFor={labelText} className={classes.label}>{`${labelText === 'fromPrice' ? 'from' : 'to'}:`}</label>
      <input
        id={labelText}
        name={labelText}
        className={classes.input}
        value={labelText === 'fromPrice' ? fromPrice : toPrice}
        onChange={handleChange}
      />
    </div>
  );
};
