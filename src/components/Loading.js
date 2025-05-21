import React from 'react';

const Loading = ({ fullScreen = false }) => {
  const classes = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    : "flex justify-center items-center h-64";

  return (
    <div className={classes}>
      <div className="loading-spinner" />
    </div>
  );
};

export default Loading;
