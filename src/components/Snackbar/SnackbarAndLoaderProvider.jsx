import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, useCallback, createContext } from 'react';

import { Alert, Backdrop, Snackbar, CircularProgress } from '@mui/material';

import CircularWithValueLabel from '../Loaders/LoaderWithLabel';
const SnackbarAndLoaderContext = createContext();

export const useSnackbarAndLoader = () => useContext(SnackbarAndLoaderContext);

export const SnackbarAndLoaderProvider = ({ children }) => {
  const [snackbars, setSnackbars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showSnackbar = useCallback((message, severity = 'info') => {
    const id = new Date().getTime();
    setSnackbars((prev) => [...prev, { id, message, severity, open: true }]);
  }, []);

  const handleCloseSnackbar = useCallback((id) => {
    setSnackbars((prev) =>
      prev.map((snackbar) => (snackbar.id === id ? { ...snackbar, open: false } : snackbar))
    );
  }, []);

  const showLoader = useCallback(() => {
    setLoading(true);
  }, []);

  const showLabelLoader = useCallback(() => {
    setOpen(true);
  }, []);

  const hideLoader = useCallback(() => {
    setLoading(false);
  }, []);

  const hideLabelLoader = useCallback(() => {
    setOpen(false);
  }, []);

  const bgColor = (color) => {
    switch (color) {
      case 'error':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#17a2b8';
      case 'success':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const contextValue = useMemo(
    () => ({
      showSnackbar,
      showLoader,
      hideLoader,
      showLabelLoader,
      hideLabelLoader,
    }),
    [showSnackbar, showLoader, hideLoader, showLabelLoader, hideLabelLoader]
  );
  return (
    <SnackbarAndLoaderContext.Provider value={contextValue}>
      {children}
      {snackbars
        .filter((snackbar) => snackbar.open)
        .map((snackbar, index) => (
          <Snackbar
            key={snackbar.id}
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={() => handleCloseSnackbar(snackbar.id)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            style={{ top: `${index * 60 + 20}px`, transition: 'top 0.3s ease-out' }}
          >
            <Alert
              onClose={() => handleCloseSnackbar(snackbar.id)}
              severity={snackbar.severity}
              className="font-weight-600"
              sx={{
                backgroundColor: bgColor(snackbar.severity),
                color: '#fff',
                '& .MuiAlert-icon': {
                  color: '#fff',
                },
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        ))}
      <Backdrop open={loading} style={{ zIndex: 1300, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Backdrop open={open} style={{ zIndex: 1300, color: '#fff' }}>
        <CircularWithValueLabel color="inherit" runner={open} />
      </Backdrop>
    </SnackbarAndLoaderContext.Provider>
  );
};

SnackbarAndLoaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
