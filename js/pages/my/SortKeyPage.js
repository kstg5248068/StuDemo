/**
 * Created by Administrator on 2017/8/19.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import LanguageDao, {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
import ArrayUtils from "../../util/ArrayUtils";
import SortableListView from 'react-native-sortable-listview';
import ViewUtils from "../../util/ViewUtils";


export default class SortKeyPage extends Component {
    constructor(props) {
        super(props);
        this.dataArray = [];
        this.sortResultArray = [];
        this.originalCheckedArray = [];
        this.state = {
            checkedArray: []
        }

    }

    componentDidMount() {
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.loadData()
    }

    loadData() {
        this.languageDao.fetch()
            .then(
                (result) => {
            this.getCheckedItems(result)})
            .catch(
                (error )=> {
                console.log(error)
            })
    }

    getCheckedItems(result) {
        this.dataArray = result;
        let checkedArray = [];
        for (let i = 0, l = result.length; i < l; i++) {
            let data = result[i];
            if (data.checked) checkedArray.push(data);
        }
        this.setState({
            checkedArray: checkedArray,
        });
        this.originalCheckedArray = ArrayUtils.clone(checkedArray);
    }
    onBack(){
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
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
    onSave(){
        if(ArrayUtils.isEqual(this.originalCheckedArray,this.state.checkedArray)){
            this.props.navigator.pop();
            return;
        }
        this.getSortResult();
        this.languageDao.save(this.sortResultArray);
        this.props.navigator.pop();

    }
    getSortResult(){
        this.sortResultArray=ArrayUtils.clone(this.dataArray);
        for(let i=0,l=this.originalCheckedArray.length;i<l;i++){
            let item=this.originalCheckedArray[i];
            let index=this.dataArray.indexOf(item);
            //替换旧元素，添加新元素
            this.sortResultArray.splice(index,1,this.state.checkedArray[i])
        }
    }
    render() {
        let rightButton = <TouchableOpacity
            onPress={() => this.onSave()}>
            <View style={{padding: 5}}>
                <Text style={{padding: 5, fontSize: 20, color: 'white'}}>保存</Text>
            </View>
        </TouchableOpacity>;
        return <View style={styles.container}>
            <NavigationBar
                title={"SORT KEY"}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
                leftButton={ViewUtils.getLeftButton(() => {
                    this.onBack()
                })}
                rightButton={
                    rightButton
                }
            ></NavigationBar>
            <SortableListView
                style={{flex: 1}}
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0]);
                    this.forceUpdate();
                }}
                renderRow={row => <SortCell data={row}/>}
            />


        </View>
    }

}

class SortCell extends Component {
    render() {
        return <TouchableHighlight
            underlayColor={'#eee'}
            delayLongPress={500}
            style={styles.item}
            {...this.props.sortHandlers}
        >
            <View style={styles.cell}>
                <Image style={styles.image} source={require('./img/ic_sort.png')}/>

                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 20,
        justifyContent: 'center',
        paddingTop: 20,
        alignItems: 'center'

    },
    item: {
        padding: 15,
        backgroundColor: "#F8F8F8",
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
    cell: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    image: {
        width: 16,
        height: 16,
        marginRight: 10,
        tintColor: '#2196F3'
    }

});