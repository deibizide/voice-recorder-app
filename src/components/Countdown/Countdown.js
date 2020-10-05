import React, { useState, useEffect } from 'react';
// style
import './style.scss';

const Countdown = ({ isRecording, setIsRecording }) => {
    const initialCountdownTime = 5;
    const [countdownTime, setCountdownTime] = useState(initialCountdownTime);

    useEffect(() => {
        if (isRecording) {
            const countdownId = setInterval(() => {
                setCountdownTime(t => t - 1);
            }, 1000);

            if (countdownTime === -1) {
                setIsRecording(false);

                setCountdownTime(initialCountdownTime);
                clearInterval(countdownId);
            }

            return () => clearInterval(countdownId);
        }
    }, [isRecording, setIsRecording, countdownTime]);

    return <h5 className="counter">00:0{countdownTime}</h5>;
};

export default Countdown;
