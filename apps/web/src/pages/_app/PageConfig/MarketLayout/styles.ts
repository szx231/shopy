import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    padding: '32px 48px',
  },
  buttonWrapper: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  button: {
    fontSize: '1.25rem',
    fontWeight: 600,
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  myCartWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '4.875rem',
  },
  rightContainer: {
    width: '-webkit-fill-available',
  },
}));
