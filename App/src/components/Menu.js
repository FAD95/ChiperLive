import React from 'react';

import { Image, StyleSheet } from 'react-native'

const Menu = () => {
    return (
        <Image style={styles.drawer} source={require('../img/drawer.png')} />
    )
}

const styles = StyleSheet.create({
    drawer: {
        height: 30,
        width: 30
    }
})

export default Menu;