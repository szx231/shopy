import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    border: '.063rem solid #ECECEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.75rem',
    backgroundColor: '#FFF',
    display: 'grid',
    cursor: 'pointer',
    maxWidth: '17.438rem',
    width: '100%',
  },
  content: {
    display: 'grid',
    gap: '.75rem',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  text: {
    color: 'rgba(43, 119, 235, 1)',
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: '1.313rem',
    fontFamily: 'Poppins',
  },
  img: {
    width: '100%',
    objectFit: 'contain',
  },
}));
