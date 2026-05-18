import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
//
import {moderateScale, scale, verticalScale} from '../../../common/ScreenSize';
import Row from '../../../components/layouts/Row';
import Theme from '../../../common/Theme';
const testAudioUrl =
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const playIcon = require('../../../assets/quick_chat/play.png');
const pauseIcon = require('../../../assets/quick_chat/pause.png');
// const soundIcon = require('../../../assets/icons/a-page/sound3.png');
// const muteIcon = require('../../../assets/icons/a-page/mute.png');

// const audioIcon = require('../../../assets/icons/a-page/sound2.png');
// const documentIcon = require('../../../assets/icons/a-page/document.png');

export default AudioPlayer = ({file}) => {
  const videoPlayer = React.useRef();
  const [isPlay, setIsPlay] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [contentData, setContentData] = useState(file);

  const secondsToTime = time => {
    return ~~(time / 60) + ':' + (time % 60 < 10 ? '0' : '') + (time % 60);
  };

  // const onSlide = slide => {
  //   videoPlayer.current.seek(slide * duration); // here the upation is maked for video seeking
  //   if (progress === 1) {
  //     setProgress(slide);
  //   }
  //   // clearTimeout(this.overlayTimer);
  //   // this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  // };

  const handleProgress = progress2 => {
    setProgress(progress2.currentTime / duration);
  };

  const handleEnd = () => {
    setIsPlay(false);
    setProgress(1);
  };

  return (
    <>
      <Row
        pointerEvents={contentData?.url ? 'auto' : 'none'}
        style={styles.playerControl}>
        {/* Play & Stop button */}
        <Row>
          <TouchableOpacity
          style={{padding: scale(15)}}
            onPress={() => {
              if (Math.floor(progress) >= 1) {
                videoPlayer.current.seek(0);
              }
              setIsPlay(x => !x);
            }}>
            <Image
              resizeMode="contain"
              style={{height: scale(15), width: scale(15), tintColor: 'white'}}
              source={!isPlay ? playIcon : pauseIcon}
            />
          </TouchableOpacity>

          <Text style={{color: 'white', fontSize: moderateScale(14), marginLeft: scale(5)}}>
            {isPlay ? 'Playing...' : 'Play'}
          </Text>
        </Row>

        {/* Audio track Duration */}
        <Text style={{color: 'white', fontSize: moderateScale(13)}}>
          {secondsToTime(Math.floor(duration)) || '0:00'} /
          {secondsToTime(Math.floor(progress * duration))}
        </Text>

        {/* Seek Bar */}
        {/* <SeekBar currentPosition={progress} onSeek={onSlide} /> */}
      </Row>

      {/* Video player */}
      <Video
        ref={ref => (videoPlayer.current = ref)}
        audioOnly
        paused={!isPlay}
        muted={isMuted}
        onLoad={meta => setDuration(meta.duration)}
        onEnd={handleEnd}
        onProgress={handleProgress}
        source={{
          uri: contentData?.url
            ? contentData?.url
            : testAudioUrl,
        }}
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
        // poster={item.thumbUrl}
        // posterResizeMode="cover"
        // resizeMode="cover"
        // controls={true}
        // minLoadRetryCount={5}
        // repeat={true}
        // disableFocus ={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  playerControl: {
    justifyContent: 'space-between',
    borderRadius: scale(35),
    backgroundColor: Theme.color,
    paddingRight: scale(15),
    borderRadius: scale(5),
    marginTop: verticalScale(5),
  },
});
