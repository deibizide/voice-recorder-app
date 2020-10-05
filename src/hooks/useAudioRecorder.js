import { useEffect, useState } from 'react';

const useAudioRecorder = isRecording => {
    const [recorder, setRecorder] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);
    const [permissionError, setPermissionError] = useState(null);

    const onRecordingReady = e => {
        setAudioSrc(e.data);
    };
    const startRecording = () => {
        recorder.start();
    };
    const stopRecording = () => {
        recorder.stop();
    };

    const getAudio = () => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then(stream => {
                setRecorder(new MediaRecorder(stream));
            })
            .catch(error => {
                if (error.message.includes('MediaRecorder')) {
                    setPermissionError(
                        'Your browser does not support the latest technology, we recommend Google Chrome'
                    );
                    return;
                }
                setPermissionError('Please allow the usage of your microphone');
            });
    };

    useEffect(() => {
        if (recorder) recorder.addEventListener('dataavailable', onRecordingReady);
    }, [recorder]);

    useEffect(() => {
        if (isRecording) {
            startRecording();
        }

        if (isRecording === false) {
            stopRecording();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording]);

    useEffect(() => {
        getAudio();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        audioSrc,
        permissionError,
    };
};

export default useAudioRecorder;
