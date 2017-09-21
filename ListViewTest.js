/**
 * Created by Administrator on 2017/8/22.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    Image,
    TouchableOpacity,
    RefreshControl
}from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import Toast,{DURATION} from 'react-native-easy-toast'

var urll = 'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif';
var data = {
    "result": [
        {
            "email": "f.hall@davis.gov",
            "fullName": "张三张三"
        },
        {
            "email": "f.taylor@white.org",
            "fullName": "张三张三"
        },
        {
            "email": "b.taylor@miller.net",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "e.lee@martinez.net",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "p.lopez@jones.net",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "c.robinson@perez.edu",
            "fullName": "张三张三张三"
        },
        {
            "email": "s.moore@thompson.io",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "r.rodriguez@clark.co.uk",
            "fullName": "张三张三张三张三张三"
        },
        {
            "email": "x.garcia@jackson.edu",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "q.johnson@thomas.org",
            "fullName": "张三张三张三"
        },
        {
            "email": "k.davis@lewis.org",
            "fullName": "张三张三张三"
        },
        {
            "email": "c.thompson@robinson.gov",
            "fullName": "张三张三"
        },
        {
            "email": "o.smith@jackson.org",
            "fullName": "张三张三张三张三"
        },
        {
            "email": "u.williams@martinez.org",
            "fullName": "张三张三"
        },
        {
            "email": "e.moore@clark.co.uk",
            "fullName": "张三张三"
        },
        {
            "email": "t.martin@perez.edu",
            "fullName": "张三张三张三张三"
        }
    ],
    "statusCode": 0
};
export default class ListViewTest extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(data.result),
            refreshing: true,
            result: ''


        };
        this.onLoad();
    }


    render() {
        return <View style={styles.container}>
            <NavigationBar
                title={'ListView'}/>

            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData)=> this.renderRow(rowData)}
                renderSeparator={(sectionID, rowID, adjacentRowHighlighted)=>this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)}
                renderFooter={()=>this.renderFooter()}
                refreshControl={
                <RefreshControl refreshing={this.state.refreshing}
                 onRefresh={()=>this.onLoad()}/>
                }
                />

            <Toast ref={toast=>{this.toast=toast}}/>
        </View>
    }

    onLoad() {
        setTimeout(()=>this.setState({
            refreshing: false
        }), 2000);

    }

    renderRow(rowData) {
        return <View style={styles.row}>
            <TouchableOpacity
                onPress={()=>
               { this.toast.show('你单击了:'+rowData.fullName,DURATION.LENGTH_SHORT)}
                }>
                <Text style={styles.text}>{rowData.fullName}</Text>
                <Text>{rowData.email}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID}
                     style={styles.line}
            ></View>

    }

    renderFooter() {
        return <Image style={{width:400,height:100}} source={{uri:urll}}>
        </Image>

    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    line: {
        height: 1,
        backgroundColor: 'black'
    },
    text: {
        fontSize: 22,
        color: 'red'
    },
    row: {
        height: 50,
    }
});




