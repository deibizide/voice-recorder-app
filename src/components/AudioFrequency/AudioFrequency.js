import React, { useRef } from 'react';
// hooks
import useAudioFrequency from './../../hooks/useAudioFrequency';
// style
import './style.scss';

const AudioFrequency = ({ isRecording }) => {
    const canvasRef = useRef(null);
    useAudioFrequency(isRecording, canvasRef);

    return (
        <div>
            <canvas className="frequency" ref={canvasRef}></canvas>
        </div>
    );
};

export default AudioFrequency;
