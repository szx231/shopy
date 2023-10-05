import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '32px',
  },
  button: {
    cursor: 'pointer',
    color: '#A3A3A3',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
    border: 'none',
    backgroundColor: 'transparent',
  },
  buttonChecked: {
    color: ' #201F22',
    padding: '0.125rem 1.25rem',
    backgroundColor: '#ECECEE',
    borderRadius: '1.25rem',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px',
  },
}));
