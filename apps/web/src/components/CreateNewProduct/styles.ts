import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  container: {
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  title: {
    margin: 0,
    color: '#201F22',
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1.25rem',
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
    width: '100vh',
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
    zIndex: 10,
    border: 'none',
    backgroundColor: 'transparent',
  },
  img: {
    borderRadius: '0.5rem',
    objectFit: 'contain',
  },
  downloadBlur: {
    backdropFilter: 'blur(12px)',
    boxShadow: 'inset 0 0 0 4000px rgb(40 34 34 / 30%)',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
  },
  imageDownloadWrapper: {
    position: 'relative',
  },
  loader: {
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    position: 'absolute',
  },
}));
