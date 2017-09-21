import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class RepositoryCell extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <TouchableOpacity style={{flex:1}}
        onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
            <Text style={styles.title}>{this.props.full_name}</Text>
            <Text style={styles.description}>{this.props.description}</Text>
            <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between'}}>
                <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between'}}>
                    <Text style={styles.title}>Author:</Text>
                    <Image style={{width: 22, height: 22}}
                           source={{uri: this.props.owner.avatar_url}}/>
                </View>
                <Text style={styles.title}>Star:{this.props.stargazers_count}</Text>
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