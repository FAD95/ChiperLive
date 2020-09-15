import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

import Layout from './Layout';

const VideoStream = ({ navigation }) => {

    let playerRef = null;

    const onBuffer = buffer => {
        console.log("onBuffer: ", buffer);
    }

    onError = error => {
        console.log("onError: ", error);
    };

    return (
        <Layout openNav={navigation}>
            <Video source={{ uri: 'https://chiperlive-usso.streaming.media.azure.net/0d1e5929-09ef-4708-b702-89386978eff3/4ba6472c-d818-402f-bc74-b347478d38d4.ism/manifest(format=m3u8-aapl-v3)' }}
                   ref={ref => {
                    playerRef = ref
                   }}
                   onBuffer={onBuffer}
                   style={styles.backgroundVideo}
            />
        </Layout>
    )   
}

var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
});

export default VideoStream;