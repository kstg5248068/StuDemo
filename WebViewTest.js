import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    WebView,
    TextInput,
    Text,
    DeviceEventEmitter
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';

const URL = 'http://www.imooc.com';
export default class WebViewTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: URL,
            title: '',
            canGoBack: false

        }
    }

    onNavigationStateChange(navState) {

        this.setState({
            canGoBack: navState.canGoBack,
            title: navState.title

        })


    }

    goForward() {
        this.setState({
            url: this.text,
        })

    }

    goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack()
        } else {
            DeviceEventEmitter.emit('showToast', '到顶了')
        }
    }

    render() {

        return <View style={styles.container}>
            <NavigationBar
                title={"浏览器"}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
            ></NavigationBar>
            <View style={styles.row}>
                <Text
                    style={styles.text}
                    onPress={() =>
                        this.goBack()}>返回</Text>
                <TextInput
                    style={styles.textInput}
                    defaultValue={URL}
                    underlineColorAndroid={'transparent'}
                    onChangeText={text => this.text = text}
                ></TextInput>
                <Text
                    style={styles.text}
                    onPress={() =>
                        this.goForward()}>前往</Text>
            </View>
            <WebView
                source={{uri: this.state.url}}
                onNavigationStateChange={
                    (navState) => {
                        this.onNavigationStateChange(navState)
                    }}
                ref={webView => this.webView = webView}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 20
    },
    textInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        margin: 2
    }


});