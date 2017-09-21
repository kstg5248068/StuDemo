import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    WebView
} from 'react-native';
import NavigationBar from './../../js/common/NavigationBar';
import ViewUtils from "../util/ViewUtils";
import {FLAG_STORAGE} from "../expand/dao/DataRepository";
const TRENDING_URL='https://github.com/';

export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);

        let url=this.props.flag===FLAG_STORAGE.flag_popular?this.props.data.owner.html_url:TRENDING_URL+this.props.data.fullName;
        let title=this.props.flag===FLAG_STORAGE.flag_popular?this.props.data.full_name:this.props.data.fullName;
        this.state = {
            url: url,
            title: title,
            canGoBack: false

        }
    }

    onNavigationStateChange(navState) {

        this.setState({
            canGoBack: navState.canGoBack,
            url:navState.url
        })


    }


    onBack() {
        if (this.state.canGoBack) {
            this.webView.goBack()
        } else {
           this.props.navigator.pop()
        }
    }

    render() {

        return <View style={styles.container}>
            <NavigationBar
                title={this.state.title}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
                leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
            ></NavigationBar>

            <WebView
                source={{uri: this.state.url}}
                onNavigationStateChange={
                    (navState) => {
                        this.onNavigationStateChange(navState)
                    }}
                startInLoadingState={true}
                ref={webView => this.webView = webView}
            />
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'

    },

});