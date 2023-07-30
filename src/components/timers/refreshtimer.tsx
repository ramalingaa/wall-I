import React, { useState, useEffect } from 'react';
import "./refreshtimer.css"

const RefreshTimer = (props:any) => {


  return (
            <div className="refreshtimer-container">
                <p className="refreshtimer-text">{props?.timer.toString().padStart(2,"0")}</p>
            </div>
  );
};

export default RefreshTimer;
