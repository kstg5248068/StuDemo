/**
 * Created by Administrator on 2017/8/19.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,

} from 'react-native';
import NavigationBar from './js/common/NavigationBar'
import HttpUtils from './HttpUtils'


export default class FetchTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: ''
        }

    }

    render() {
        return <View style={styles.container}>

            <NavigationBar title={'FetchTest'}
                           style={{
                               backgroundColor: 'green'
                           }}
            ></NavigationBar>

            <Text style={styles.text}
                  onPress={() => this.onLoad('http://rapapi.org/mockjsdata/11793/test')}>获取数据</Text>
            <Text style={styles.text}
                  onPress={() => this.onSubmit('http://rapapi.org/mockjsdata/11793/submit')}
            >提交数据</Text>

            <Text style={styles.text}
            >返回数据:+{JSON.stringify(this.state.result)}</Text>

        </View>
    }

    onSubmit(url) {
        HttpUtils.post(url, {
            password: '123',
            userName: '小米'
        }).then(result => this.setState({
            result: result
        })).catch(error => {
                this.setState({
                    result: error
                })
            }
        )

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'Application/json',
        //         'Content-Type': 'Application/json'
        //     },
        //     body: JSON.stringify({
        //             password: '123',
        //             userName: '小明'
        //         }
        //     )
        // })
        //     .then(
        //         response=>
        //         response.json())
        //     .then(
        //         result=>
        //         this.setState({
        //             result: JSON.stringify(result)
        //         }))
        //     .catch(
        //         error=>
        //         this.setState({
        //             result: JSON.stringify(error)
        //         })
        // )


    }

    onLoad(url) {
        HttpUtils.get(url).then(result => {
            this.setState({
                result: result
            })
        }).catch(error => {
            this.setState({
                result: error
            })
        })
        // fetch(url)
        //     .then(response => response.json())
        //     .then(result =>
        //         this.setState({
        //             result: JSON.stringify(result)
        //         })
        //     ).catch(error =>
        //     this.setState({
        //         result: JSON.stringify(error)
        //     }))

    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    text: {
        fontSize: 22,
        justifyContent: 'center'
    }


});
