import React from 'react';

import { Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { DrawerNavigatorItems, createDrawerNavigator } from 'react-navigation-drawer';

const RootStack = createDrawerNavigator({

}, {contentComponent: props => <CustomDrawerComponent {...props}/>})

const CustomDrawerComponent = (props) => {
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerNavigatorItems {...props}/>
    </SafeAreaView>
}


const Menu = () => {
    


    return (
        <TouchableOpacity onPress={}>
            <Image style={styles.drawer} source={require('../img/drawer.png')} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    drawer: {
        height: 30,
        width: 30
    }
})

export default Menu;