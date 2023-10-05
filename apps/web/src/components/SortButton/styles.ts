import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  button: {
    border: 'none',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    cursor: 'pointer',
  },
  text: {
    color: '#201F22',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.313rem',
    whiteSpace: 'nowrap',
  },
}));
