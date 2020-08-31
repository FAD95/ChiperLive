import { Image, Text, StyleSheet, View, StatusBar } from 'react-native';
import React from 'react';

import Menu from './Menu';

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <StatusBar backgroundColor='white' barStyle='dark-content'/>
            <View style={styles.header}>
                <Menu />
                <Image style={styles.logo} source={require('../img/chiper-logo.png')}/>
                <Text style={styles.logoTittle}>LIVE</Text>
            </View>
            
            { children }
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5
    },
    logoTittle: {
        color: 'red',
        marginLeft: 5,
        fontSize: 24,
        fontFamily: 'monospace',
        fontWeight: 'bold'
    },
    logo: {
        marginLeft: 10
    },
})

export default Layout;