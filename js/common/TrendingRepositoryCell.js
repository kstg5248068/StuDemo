import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';

export default class TrendingRepositoryCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let htmlContent = '<p>' + this.props.description + '</p>';
        return <TouchableOpacity style={{flex: 1}}
                                 onPress={this.props.onSelect}>
            <View style={styles.cell_container}>
                <Text style={styles.title}>{this.props.fullName}</Text>
                <HTMLView value={htmlContent}
                    onLinkPress={(url) => {
                    }}
                          stylesheet={{
                        p: styles.description,
                        a: styles.description
                    }}
                />
                <Text style={styles.description}>Star:{this.props.meta}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={styles.description}>Built by:</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                this.props.contributors.map((result, i, arr) => {
                                    let contributor = arr[i];
                                    return <Image key={i} style={{width: 22, height: 22}}
                                                  source={{uri: contributor}}/>
                                })
                            }
                        </View>

                    </View>

                    <Image style={{width: 22, height: 22, tintColor: '#dad45b'}}
                           source={require('../../res/images/ic_star_navbar.png')}/>
                </View>
            </View>

        </TouchableOpacity>
    }
}
const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }


});