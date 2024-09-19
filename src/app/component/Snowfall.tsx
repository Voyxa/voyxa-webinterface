import React, { useEffect } from 'react';

const Snowfall = () => {
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.width = Math.random() * 10 + 5 + 'px'; // Size between 5px and 15px
      snowflake.style.height = snowflake.style.width; // Keep it circular
      snowflake.style.animationDuration = Math.random() * 15 + 15 + 's'; // Duration between 5s and 10s
      snowflake.style.opacity = Math.random() * 0.5 + 0.2; // Opacity between 0.5 and 1
      snowflake.style.animationDelay = Math.random() * 15 + 's'; // Random delay for each snowflake
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 10000); // Match this with the max animation duration
    };

    const interval = setInterval(createSnowflake, 300); // Adjust the interval for more or less snowfall

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Snowfall;
