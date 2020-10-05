import React, { useEffect, useRef, useState } from 'react';
// font-awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStopCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// style
import './style.scss';

const RecordingControl = ({ isRecording, setIsRecording, permissionError }) => {
    const [icon, setIcon] = useState(faMicrophone);
    const iconRef = useRef(icon);

    const handleClick = () => {
        let value;
        switch (iconRef.current.iconName) {
            case 'microphone':
                value = true;
                break;
            case 'stop-circle':
                value = false;
                break;
            default:
                value = null;
        }

        setIsRecording(value);
    };

    useEffect(() => {
        switch (isRecording) {
            case true:
                setIcon(faStopCircle);
                break;
            case false:
                setIcon(faTrashAlt);
                break;
            default:
                setIcon(faMicrophone);
        }
    }, [isRecording]);

    useEffect(() => {
        iconRef.current = icon;
    }, [icon]);

    return (
        <div className="recording__main mt-2">
            <button
                className={`recording__button ${isRecording ? 'btn-warning' : 'btn-danger'}`}
                onClick={handleClick}
                disabled={permissionError}
            >
                {isRecording === true && <FontAwesomeIcon icon={faStopCircle} size="2x" color="white" />}
                {isRecording === false && <FontAwesomeIcon icon={faTrashAlt} size="2x" color="white" />}
                {isRecording === null && <FontAwesomeIcon icon={faMicrophone} size="2x" color="white" />}
            </button>
        </div>
    );
};

export default RecordingControl;
