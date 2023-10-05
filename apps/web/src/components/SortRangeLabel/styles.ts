import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '0.5rem',
    alignItems: 'center',
    borderRadius: '1.938rem',
    border: '1px solid #ECECEE',
    backgroundColor: '#FFF',
    padding: '0.625rem 1.25rem',
    color: '#201F22',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
  button: {
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
}));
