/**
 * Created by Administrator on 2017/8/19.
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    ListView,
    RefreshControl,
    DeviceEventEmitter

} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import DataRepository, {FLAG_STORAGE} from "../expand/dao/DataRepository";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import RepositoryCell from "../common/RepositoryCell";
import LanguageDao, {FLAG_LANGUAGE} from "../expand/dao/LanguageDao";
import RepositoryDetail from "./RepositoryDetail";


const urlHeader = 'https://api.github.com/search/repositories?q=';

const urlFooter = '&sort=stars';
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
        this.state = {
            languages: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.languageDao.fetch()
            .then(result => {
                this.setState({
                    languages: result
                })
            }).catch(error => {
            console.log(error)
        })
    }

    render() {
        let content = this.state.languages.length > 0 ?
            <ScrollableTabView
                tabBarBackgroundColor="#2196F3"
                tabBarInactiveTextColor="mintcream"
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}

                renderTabBar={() => <ScrollableTabBar/>}
            >
                {this.state.languages.map((result, i, arr) => {
                    let lan = arr[i];
                    return lan.checked ?
                        <PopularTab key={i}
                                    tabLabel={lan.name} {...this.props}>{lan.name}</PopularTab> : null
                })
                }
            </ScrollableTabView> : null;
        return <View style={styles.container}>
            <NavigationBar
                title={"最热"}
                statusBar={{
                    backgroundColor: '#2196F3'
                }}
            ></NavigationBar>
            {content}
            {/*<PopularTab tabLabel="Java">JAVA</PopularTab>*/}
            {/*<PopularTab tabLabel="iOS">iOS</PopularTab>*/}
            {/*<PopularTab tabLabel="Android">android</PopularTab>*/}
            {/*<PopularTab tabLabel="JavaScript">js</PopularTab>*/}


        </View>
    }

}


class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FLAG_STORAGE.flag_popular);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            result: '',
            isLoading: true
        }
    }


    componentDidMount() {
        this.loadData()
    }


    loadData() {
        this.setState({
            isLoading: true
        });
        var url = this.getUrl(this.props.tabLabel);
        this.dataRepository.fetchRepository(url)
            .then(result => {
                    let items = result && result.items ? result.items : result ? result : [];
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                        isLoading: false
                    });
                    if (result && result.update_date && !this.dataRepository.checkDate(result.update_date)) {
                        DeviceEventEmitter.emit('showToast', '数据过时');
                        return this.dataRepository.fetchNetRepository(url);
                    } else {
                        DeviceEventEmitter.emit('showToast', '显示缓存数据');
                    }
                }
            ).then(items => {
                if (!items || items.length === 0) return;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(items),
                    isLoading: false
                });
                DeviceEventEmitter.emit('showToast', '显示网络数据');
            }
        )
            .catch(error => {
                    console.log(error)
                }
            )
    }
    onSelect(data){
        this.props.navigator.push({
            component:RepositoryDetail,
            params:{
                data:data,
                flag:FLAG_STORAGE.flag_popular,
                ...this.props
            }

        })

    }
    getUrl(key) {
        return urlHeader + key + urlFooter;
    }

    renderRow(rowData) {
        return <View style={{margin: 10}}>

            <RepositoryCell {...rowData}
            onSelect={()=>this.onSelect(rowData)}/>

        </View>
    }

    render() {
        return <View
            style={styles.container}>

            <ListView dataSource={this.state.dataSource}
                      renderRow={(rowData) => this.renderRow(rowData)}
                      refreshControl={
                          <RefreshControl
                              refreshing={this.state.isLoading}
                              onRefresh={
                                  () => {
                                      this.loadData()
                                  }
                              }
                              colors={['#2196F3']}
                              tintColor={'#2196F3'}
                              title={'Loading...'}
                              titleColor={'#2196F3'}

                          />
                      }

            />
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        fontSize: 20

    },


});