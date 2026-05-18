import React, { useState } from 'react';
import { View, Button, TouchableHighlight, Image } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'react-native-blob-util';
import { FFT } from 'dsp.js';
import base64 from 'base64-js'; // Import the base64-js library
import { Svg, Line, G, Path } from 'react-native-svg';
import { requestAudioPermission, requestExternalStorageReadPermission, requestExternalStorageWritePermission } from '../../../common/permissions';
import Theme from '../../../common/Theme';
import { scale } from '../../../common/ScreenSize';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioRecord = ({recording = false, stopRecording = () => {}, startRecording = () => {}}) => {
  const [audioPath, setAudioPath] = useState('');
  const [frequencyData, setFrequencyData] = useState([]);

  // const startRecording = async () => {
  //   await requestAudioPermission();
  //   await requestExternalStorageReadPermission();
  //   await requestExternalStorageWritePermission();
  //   try {
  //     const result = await audioRecorderPlayer.startRecorder();
  //     setAudioPath(result);
  //     console.log('Recording started:', result);
  //     // await analyzeFrequency(result);
  //   } catch (error) {
  //     console.error('Failed to start recording', error);
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     const result = await audioRecorderPlayer.stopRecorder();
  //     setAudioPath(result);
  //     console.log('Recording stopped. File saved at:', result);
  //     const audioBuffer = await fetchAudioData(result); // Function to fetch and decode audio data
  //     const freqData = analyzeFrequency(audioBuffer);
  //     setFrequencyData(freqData);
  //   } catch (error) {
  //     console.error('Failed to stop recording', error);
  //   }
  // };

  const playAudio = async () => {
    try {
      await audioRecorderPlayer.startPlayer(audioPath);
      console.log('Playing audio...');
    } catch (error) {
      console.error('Failed to play audio', error);
    }
  };

  const fetchAudioData = async (filePath) => {
    try {
      // Read audio file as base64
      const base64Data = await RNFetchBlob.fs.readFile(filePath, 'base64');
      // Decode base64 to byte array
      const byteArray = base64.toByteArray(base64Data);

      // Convert byte array to Float32Array
      const float32Array = new Float32Array(byteArray.buffer);

      // Ensure the Float32Array length matches the FFT size
      const fftSize = 1024; // FFT size
      if (float32Array.length < fftSize) {
        // Pad with zeros if the buffer is smaller than FFT size
        const paddedArray = new Float32Array(fftSize);
        paddedArray.set(float32Array);
        return paddedArray;
      } else if (float32Array.length > fftSize) {
        // Truncate if the buffer is larger than FFT size
        return float32Array.slice(0, fftSize);
      }

      return float32Array;
    } catch (error) {
      console.error('Error reading audio file:', error);
      return new Float32Array(); // Return an empty array if an error occurs
    }
  };

  const analyzeFrequency = (audioBuffer) => {
    const fftSize = 1024;
    const fft = new FFT(fftSize, 44100);
    fft.forward(audioBuffer);

    return fft.spectrum; // Return frequency spectrum for visualization
  };

  return (
    <View>
      {recording ? (
        <TouchableHighlight
            onPress={stopRecording}
            style={{padding: scale(10), borderRadius: 50, marginRight: scale(5)}}
            underlayColor={'#B8C3D4'}>
            <Image
              style={{height: scale(24), width: scale(24), tintColor: 'red', resizeMode: 'contain'}}
              source={require('../../../assets/products/delete.png')}
            />
          </TouchableHighlight>
      ) : (
        <TouchableHighlight
            onPress={startRecording}
            style={{padding: scale(10), borderRadius: 50, marginRight: scale(5)}}
            underlayColor={'#B8C3D4'}>
            <Image
              style={{height: scale(24), width: scale(24), resizeMode: 'contain'}}
              source={require('../../../assets/quick_chat/microphone.png')}
            />
          </TouchableHighlight>
      )}
      {/* <Button title="Play Audio" onPress={playAudio} />
      <FrequencyView frequencyData={frequencyData} /> */}
    </View>
  );
};

const FrequencyView = ({ frequencyData }) => {
  const dummyFrequencyData = [
    0.1, 0.15, 0.2, 0.05, 0.3, 0.25, 0.1, 0.05, 0.2, 0.35, 0.4, 0.3, 0.15, 0.05, 0.1, 0.2,
    0.3, 0.25, 0.2, 0.1, 0.05, 0.15, 0.2, 0.3, 0.35, 0.4, 0.25, 0.2, 0.15, 0.1, 0.05, 0.05
  ];
  // console.log(frequencyData)
  
  const lines = dummyFrequencyData.map((value, index) => (
    <Line
    key={index}
    x1={index * 3} // Space each line evenly
    y1={50}
    x2={index * 3}
    y2={35 - value * 90} // Scale value for visualization
    stroke="white"
    strokeWidth="2"
  />
  ));
// console.log(lines)
  return (
    <View style={{ backgroundColor: Theme.color, padding: 10, }}>

    <Svg height="35" width="300">
      {lines}
    </Svg>
    </View>
  );
};

export default AudioRecord;
