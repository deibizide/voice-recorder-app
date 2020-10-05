import React, { useState } from 'react';
//components
import AudioPlayer from './components/AudioPlayer';
import AudioFrequency from './components/AudioFrequency';
import RecordingControl from './components/RecordingControl';
import Countdown from './components/Countdown';
// hooks
import useAudioRecorder from './hooks/useAudioRecorder';

function App() {
    const [isRecording, setIsRecording] = useState(null);
    const { audioSrc, permissionError } = useAudioRecorder(isRecording);

    return (
        <div className="container">
            <div className="main d-flex flex-column justify-content-center align-items-center mt-4">
                {permissionError && <p className="px-2">{permissionError}</p>}

                {!permissionError && (
                    <div className="h-25 d-flex align-items-center">
                        {isRecording === null && <h4>Press the button to record audio</h4>}
                        <AudioPlayer isRecording={isRecording} audioSrc={audioSrc} />
                        {isRecording && <AudioFrequency />}
                    </div>
                )}

                <RecordingControl
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                    permissionError={permissionError}
                />
                {isRecording && <Countdown isRecording={isRecording} setIsRecording={setIsRecording} />}
            </div>
        </div>
    );
}

export default App;
