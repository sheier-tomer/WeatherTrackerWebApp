import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <div className='footer'>
        <a 
          className='github-link' 
          href='https://github.com/sheier-tomer/WeatherTrackerWebApp' 
          target='_blank' 
          rel='noopener noreferrer'>
            View on GitHub
        </a>
    </div>
  );
}
