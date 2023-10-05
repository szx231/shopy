import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  title: {
    margin: 0,
    textAlign: 'center',
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 700,
    lineHeight: '1.75rem',
  },
  description: {
    margin: 0,
    textAlign: 'center',
    color: '#767676',
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
  },
}));
