import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    borderRadius: '0.75rem',
    border: '0.063rem solid #ECECEE',
    backgroundColor: '#FFF',
    // width: '19.875rem',
    // height: '23.375rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '1rem',
    width: '17.438rem',
    height: '17.438rem',
  },
  img: {
    height: '10.938rem',
    objectFit: 'contain',
    borderRadius: '0.75rem',
    width: '-webkit-fill-available',
  },
  imgWrapper: {
    position: 'relative',
  },
  defaultButton: {
    width: '100%',
    padding: '1.25rem',
    borderRadius: '0.5rem',
    color: '#FFF',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: '1.313rem',
    transition: 'color 0.3s ease-in-out',
    maxHeight: '2.5rem',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#5692EF',
    },
  },
  title: {
    margin: 0,
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: '1.063rem',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.375rem',
  },
  name: {
    margin: 0,
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  cost: {
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  descriptionWrapper: {
    padding: '0px 1rem 1rem 1rem',
  },
  price: {
    margin: 0,
    color: '#A3A3A3',
    fontSize: '.875rem',
    fontWeight: 500,
  },
  orangeStatus: {
    color: '#F79009',
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    padding: '0.125rem 0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(254, 244, 230)',
    position: 'absolute',
    bottom: 'calc(0% + 1.25rem)',
    right: 'calc(0% + 1.25rem)',
  },
  greenStatus: {
    color: 'rgba(23, 178, 106, 1)',
    fontSize: '.875rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
    padding: '0.125rem 0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(232, 247, 240)',
    position: 'absolute',
    bottom: 'calc(0% + 1.25rem)',
    right: 'calc(0% + 1.25rem)',
  },
  trashWrapper: {
    padding: '0.375rem',
    borderRadius: '0.5rem',
    background: '#FFF',
    position: 'absolute',
    right: 'calc(0% + 1.25rem)',
    top: 'calc(0% + 1.25rem)',
    cursor: 'pointer',
    border: 'none',
  },
}));
