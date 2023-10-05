import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '37px',
  },
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'relative',
  },
  countProducts: {
    width: '1.313rem',
    height: '1.313rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(43, 119, 235, 1)',
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#fff',
  },
}));
