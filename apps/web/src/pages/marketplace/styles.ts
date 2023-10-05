import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    gap: '1.75rem',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  products: {
    width: '100%',
  },
  sortContainer: {
    margin: '1.25rem 0px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  countItems: {
    color: '#201F22',
    fontSize: '1rem',
    fontWeight: 700,
  },
  productsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },
}));
