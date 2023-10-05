import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  pagination: {
    display: 'flex',
    listStyle: 'none',
    gap: '0.5rem',
    alignItems: 'center',
    justifyContent: 'center',
    '& a': {
      border: '0.063rem solid #ECECEE',
      borderRadius: '0.25rem',
      padding: '0.5rem',
      color: '#201F22',
      fontFamily: 'Roboto',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.4rem',
      cursor: 'pointer',
    },
  },
  paginationLinkActive: {
    '& a': {
      backgroundColor: '#2B77EB',
      border: '0.063rem solid #5E96FC',
      color: '#FFF',
      fontFamily: 'Roboto',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.4rem',
    },
  },
  paginationLinkDisabled: {
    filter: 'opacity(0.5)',
  },
}));
