/**
 * Created by Administrator on 2017/8/19.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,

}from 'react-native';
import Girl from './Girl.js';
import NavigationBar from './js/common/NavigationBar'


export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: ''
        }
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={'Boy'}
                style={{
                backgroundColor:'red'
                }}

                ></NavigationBar>
            <Text style={styles.text}>I am boy。</Text>
            <Text style={styles.text}
                  onPress={()=>{
                  this.props.navigator.push({
                  component:Girl,
                  params:{
                  word:'一只玫瑰',
                  onCallback:(word)=>{
                  this.setState({word:word})
                  }
                  }
                  })
                  }}>送给女孩一只玫瑰</Text>
            <Text style={styles.text}>得到女孩回赠的{this.state.word}</Text>


        </View>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'

    },
    text: {
        fontSize: 22,
        justifyContent: 'center'
    }


});