import React, { Fragment, useEffect, useRef } from 'react';

// style
import './style.scss';

const AudioPlayer = ({ isRecording, audioSrc }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioSrc) {
            audioRef.current.src = URL.createObjectURL(audioSrc);
            audioRef.current.play();
        }
    }, [audioSrc]);

    return (
        <Fragment>
            {isRecording === false && (
                <audio
                    className="player"
                    ref={audioRef}
                    controls
                    controlsList="nodownload"
                    autostart="0"
                    preload="none"
                />
            )}
        </Fragment>
    );
};

export default AudioPlayer;
