/**
 * Created by Administrator on 2017/8/19.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage'
import SortKeyPage from "./SortKeyPage";


export default class MyPage extends Component {
    constructor(props){
        super(props)
    }


    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={"我的"}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            ></NavigationBar>
            <TouchableOpacity>
                <Text
                style={styles.text}
                onPress={()=>{
                    this.props.navigator.push({
                        component:CustomKeyPage,
                        params:{...this.props}
                    })

                }}>自定义标签</Text>

            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    style={styles.text}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:SortKeyPage,
                            params:{...this.props}
                        })

                    }}>标签排序</Text>

            </TouchableOpacity>
            <TouchableOpacity>
                <Text
                    style={styles.text}
                    onPress={()=>{
                        this.props.navigator.push({
                            component:CustomKeyPage,
                            params:{
                                ...this.props,
                                isRemoveKey:true
                            }
                        })

                    }}>标签移除</Text>

            </TouchableOpacity>

        </View>
    }

}




const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 20,
        justifyContent:'center',
        paddingTop:20,
        alignItems:'center'

    },


});