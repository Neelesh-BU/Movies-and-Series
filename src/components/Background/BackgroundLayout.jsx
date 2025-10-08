import React from 'react';
import './BackgroundLayout.scss';

const BackgroundLayout = ({ children }) => {
  return (
    <div className="background-layout">
      {children}
    </div>
  );
};

export default BackgroundLayout;
