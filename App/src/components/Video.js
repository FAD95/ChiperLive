import React from 'react';
import { Text } from 'react-native';

import Layout from './Layout';

const Video = ({ navigation }) => {
    return (
        <Layout openNav={navigation}>
            <Text>Video!</Text>
        </Layout>
    )   
}

export default Video;