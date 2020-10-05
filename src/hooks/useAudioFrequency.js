import { useEffect } from 'react';

const useAudioFrequency = (isRecording, canvasRef) => {
    const WIDTH = 4000;
    const HEIGHT = 400;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        let analyzer;
        let bufferLength;

        const handleError = () => {
            console.log('You must give access to your mic in order to proceed');
        };

        const drawTimeData = timeData => {
            analyzer.getByteTimeDomainData(timeData);
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#ffc600';
            ctx.beginPath();

            const sliceWidth = WIDTH / bufferLength;
            let x = 0;

            timeData.forEach((data, i) => {
                const v = data / 128;
                const y = (v * HEIGHT) / 2;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            });

            ctx.stroke();

            requestAnimationFrame(() => drawTimeData(timeData));
        };

        const getAudio = async () => {
            const audioCtx = new AudioContext();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(handleError);
            const source = audioCtx.createMediaStreamSource(stream);

            analyzer = audioCtx.createAnalyser();
            source.connect(analyzer);
            analyzer.fftSize = 2 ** 13;

            bufferLength = analyzer.frequencyBinCount;
            const timeData = new Uint8Array(bufferLength);

            drawTimeData(timeData);
        };
        getAudio();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasRef, isRecording]);
};

export default useAudioFrequency;
