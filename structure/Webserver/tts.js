    const { KokoroTTS } = require('kokoro-js');
    const generateId = require('../../functions/generateId');

    module.exports = async (socket, data) => {
        const text = data.content;
        const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";
        const tts = await KokoroTTS.from_pretrained(model_id, {
            dtype: "q8",
            device: "cpu",
        });

        const audio = await tts.generate(text, { voice: "af_jessica" });
        const fileName = `${generateId()}.wav`;
        const audioPath = `/public/audio/` + fileName;
        await audio.save(fileName);

        socket.emit('audio_result', { fileName: fileName });
    }