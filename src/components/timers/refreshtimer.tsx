import React, { useState, useEffect } from 'react';
import "./refreshtimer.css"

const RefreshTimer = (props:any) => {

  const quotations = ["What has gone, gone. Let's focus on the next immediate thing."]

  return (
            <div className="refreshtimer-container">
                <p className="refreshtimer-text">{props?.timer.toString().padStart(2,"0")}</p>
                <p className="refreshtimer-text quotation">{quotations[0]}</p>
            </div>
  );
};

export default RefreshTimer;
