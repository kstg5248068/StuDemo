/**
 * Created by Administrator on 2017/8/19.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CheckBox from 'react-native-check-box';
import ViewUtils from '../../util/ViewUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao'
import ArrayUtils from "../../util/ArrayUtils";

export default class CustomKeyPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.changValues = [];
        this.isRemoveKey = this.props.isRemoveKey ? true : false;
        this.state = {
            dataArray: []
        };
        this.loadData()

    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    dataArray: result
                })
            }).catch(error => {
            console.log(error)
        })
    }



    renderView() {


        if (!this.state.dataArray || this.state.dataArray.length === 0) return;
        let len = this.state.dataArray.length;
        let views = [];
        for (let i = 0, l = len - 2; i < l; i += 2) {
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.dataArray[i])}
                        {this.renderCheckBox(this.state.dataArray[i + 1])}
                    </View>
                    <View style={styles.line}/>
                </View>
            )
        }
        views.push(
            <View key={len - 1}>
                <View style={styles.item}>
                    {len % 2 === 0 ?
                        this.renderCheckBox(this.state.dataArray[len - 2]) : null}
                    {this.renderCheckBox(this.state.dataArray[len - 1])}
                </View>
                <View style={styles.line}/>
            </View>
        );

        return views;
    }

    renderCheckBox(data) {
        let leftText = data.name;
        let isChecked=this.isRemoveKey ? false : data.checked;
        return <CheckBox style={{flex: 1, padding: 10}}
                         onClick={() => this.onClick(data)}
                         leftText={leftText}
                         isChecked={isChecked}
                         checkedImage={<Image style={{tintColor: '#2196F3'}}
                                              source={require('./img/ic_check_box.png')}/>}
                         unCheckedImage={<Image style={{tintColor: '#2196F3'}}
                                                source={require('./img/ic_check_box_outline_blank.png')}/>}
        />
    }

    onClick(data) {
        if (!this.isRemoveKey) {
            data.checked = !data.checked;

        }
        ArrayUtils.updateArray(this.changValues, data);

    }
    onSave() {
        if (this.changValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        if(this.isRemoveKey){
            for (let i = 0, l = this.changValues.length; i < l; i++) {
                ArrayUtils.remove(this.state.dataArray, this.changValues[i]);
            }
        }

        this.languageDao.save(this.state.dataArray);
        this.props.navigator.pop();
    }
    onBack() {
        if (this.changValues.length === 0) {
            this.props.navigator.pop();
            return;
        }
        Alert.alert('提示', '要修改保存吗？', [
            {
                text: '不保存',
                onPress: () => {
                    this.props.navigator.pop();
                },
                style: 'cancel'
            },
            {
                text: '保存',
                onPress: () => this.onSave()

            },
        ])
    }

    render() {
        let title = this.isRemoveKey ? '标签移除' : '自定义标签';
        let rightButtonTitle = this.isRemoveKey ? '移除' : '保存';
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}>
            <View style={{padding: 5}}>
                <Text style={{padding: 5, fontSize: 20, color: 'white'}}>{rightButtonTitle}</Text>
            </View>
        </TouchableOpacity>;
        return <View style={styles.container}>
            <NavigationBar
                title={title}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
                leftButton={
                    ViewUtils.getLeftButton(() => {
                        this.onBack()
                    })
                }
                rightButton={
                    rightButton
                }

            ></NavigationBar>
            <ScrollView>
                {this.renderView()}
            </ScrollView>
        </View>
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    line: {
        height: 0.3,
        backgroundColor: "darkgray"
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        justifyContent: 'center',
        paddingTop: 20,
        alignItems: 'center'

    },


});