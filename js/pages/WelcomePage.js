/**
 * Created by Administrator on 2017/8/19.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,

} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import HomePage from './HomePage'

export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.props.navigator.resetTo({
                component: HomePage
            })
        }, 2000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={"欢迎"}
                 style={styles.navBar}
            ></NavigationBar>
            <Text style={styles.text}>WELCOME</Text>


        </View>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2196F3'

    },
    text: {
        fontSize: 20,
        justifyContent: 'center',
        padding:130
    },
    navBar:{

        backgroundColor: '#2196F3'
    }

});