import { Image, Text, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import React from 'react';

const Layout = ({ children, openNav }) => {
    return (
        <React.Fragment>
            <StatusBar backgroundColor='white' barStyle='dark-content'/>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => openNav.toggleDrawer()}>
                    <Image style={styles.drawer} source={require('../img/drawer.png')} />
                </TouchableOpacity>
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
    drawer: {
        height: 30,
        width: 30
    }
})

export default Layout;