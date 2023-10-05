import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    borderRadius: '0.75rem',
    border: '0.063rem solid #ECECEE',
    background: '#FFF',
    padding: '1.25rem',
    height: 'fit-content',
    maxWidth: '19.688rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: '0rem',
  },
  reset: {
    color: '#A3A3A3',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    alignItems: 'flex-start',
    cursor: 'pointer',
  },
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  priceTitle: {
    color: ' #201F22',
    fontSize: '1rem',
    fontWeight: 700,
    margin: 0,
    marginTop: '2rem',
    marginBottom: '0.75rem',
  },
  priceRangeContainer: {
    display: 'flex',
    gap: '12px',
  },
}));
