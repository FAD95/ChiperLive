import React from 'react';
import { Text } from 'react-native';

import Layout from './Layout';

const Home = ({ navigation }) => {
    return (
        <Layout openNav={navigation}>
            <Text>Home!</Text>
        </Layout>
    )  
}

export default Home;