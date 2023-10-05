import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  input: {
    border: 'none',
    outline: 'none',
    color: '#201F22',
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    maxWidth: '5rem',
  },
  label: {
    color: '#A3A3A3',
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    cursor: 'pointer',
    display: 'inline-block',
    width: 'fit-content',
  },
  container: {
    position: 'relative',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    border: '.063rem solid #ECECEE',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    // maxWidth: '8.125rem',
    // overflow: 'hidden',
    '&:focus-within': {
      border: '0.063rem solid #2B77EB',
    },
    maxHeight: '2.25rem',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));
