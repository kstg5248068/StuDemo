/**
 * Created by Administrator on 2017/8/19.
 */
import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,Image
}from 'react-native';
import NavigationBar from './js/common/NavigationBar'


export default class Girl extends Component {
    constructor(props) {
        super(props);

    }

    renderButton(image) {
        return <TouchableOpacity
            onPress={()=>{
            this.props.navigator.pop();
            }
            }>
            <Image style={{width:22,height:22,margin:10}} source={image}></Image>
        </TouchableOpacity>
    }

    render() {
        return <View style={styles.container}>
            <NavigationBar title={'Girl'}
                           style={{
                backgroundColor:'green'
                }}
                           leftButton={this.renderButton(require('./res/images/ic_arrow_back_white_36pt.png'))}

                           rightButton={this.renderButton(require('./res/images/ic_star_navbar.png'))}

                ></NavigationBar>

            <Text style={styles.text}>I am girl。</Text>
            <Text style={styles.text}

                >收到礼物:{this.props.word}</Text>


            <Text style={styles.text}
                  onPress={()=>{
                this.props.onCallback('一盒巧克力');
                this.props.navigator.pop()
                }}

                >回赠巧克力</Text>


        </View>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'

    },
    text: {
        fontSize: 22,
        justifyContent: 'center'
    }


});
