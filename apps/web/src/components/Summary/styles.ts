import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    padding: '1.25rem',
    borderRadius: '.75rem',
    backgroundColor: '#FFF',
    border: '0.063rem solid #ECECEE',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    minWidth: '19.688rem',
  },
  title: {
    margin: 0,
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  priceWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    color: '#767676',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
  },
  price: {
    color: '#201F22',
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: '1.25rem',
  },
  border: {
    width: '100%',
    height: '.063rem',
    backgroundColor: '#CFCFCF',
  },
}));
