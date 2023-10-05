import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    marginTop: '2rem',
    display: 'flex',
    gap: '4.875rem',
    justifyContent: 'space-between',
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
  },
  table: {
    width: '100%',
    borderСollapse: 'separate',
    borderSpacing: 0,
  },
  theadTd: {
    color: '#767676',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
    padding: '0.75rem 0rem',
    '&:not(:first-child)': {
      textAlign: 'right',
    },
  },
  thead: {
    marginBottom: '0.75rem',
    '&:first-child': {
      textAlign: 'left',
    },
  },
  imageProduct: {
    borderRadius: '0.5rem',
    objectFit: 'contain',
  },
  tbody: {
    marginTop: '0.75rem',
    '& tr > td': {
      padding: '1rem 0rem',
      borderBottom: '0.063rem solid #CFCFCF',
    },
    '& tr:last-child > td': {
      border: 'none',
    },
  },
  descriptionWrapper: {
    display: 'flex',
    gap: '1.563rem',
    alignItems: 'center',
  },
  name: {
    color: '#201F22',
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 'normal',
  },
  price: {
    color: '#201F22',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
  },
  quantityWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: '#201F22',
    fontFamily: 'Roboto',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.4rem',
    justifyContent: 'end',
  },
  resetButton: {
    cursor: 'pointer',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0rem',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  removeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    justifyContent: 'end',
    cursor: 'pointer',
  },
  bottomBorder: {
    width: '100%',
    height: '0.063rem',
    backgroundColor: '#CFCFCF',
  },
  date: {
    color: '#201F22',
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: '1.25rem',
  },
  removeButton: {
    border: 'none',
    backgroundColor: 'transparent',
  },
}));
