import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    justifyContent: 'space-between',
    height: '100lvh',
  },
  title: {
    margin: 0,
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  uploadImageWrapper: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'center',
    marginBottom: '1.25rem',
  },
  uploadButton: {
    width: '9.063rem',
    display: 'grid',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 500,
    lineHeight: '1.313rem',
    fontSize: '0.875rem',
  },
  productsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  buttonUploadWrapper: {
    display: 'grid',
    justifyContent: 'flex-end',
    width: '50%',
  },
  input: {
    width: '50%',
  },
  overlay: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    boxShadow: 'inset 0 0 0 4000px rgb(40 34 34 / 30%)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    zIndex: 100,
    border: 'none',
    backgroundColor: 'transparent',
  },
  overlayContent: {
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
