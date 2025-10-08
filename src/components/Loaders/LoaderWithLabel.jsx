import * as React from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function CircularProgressWithLabel({ ...props }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" size="80px" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" sx={{ color: '#fff', fontSize: '20px' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
export default function CircularWithValueLabel({ ...prop }) {
  const [progress, setProgress] = React.useState(1);
  const intervalId = useRef(null);

  const handelProgressEnd = () => {
    setProgress(99);
    clearInterval(intervalId.current);
  };

  React.useEffect(() => {
    if (prop.runner) {
      intervalId.current = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 95 ? handelProgressEnd() : prevProgress + 5
        );
      }, 800);
    }
    return () => {
      clearInterval(intervalId.current);
      setProgress(0);
    };
  }, [prop.runner]);

  return <CircularProgressWithLabel color="inherit" value={progress} />;
}
