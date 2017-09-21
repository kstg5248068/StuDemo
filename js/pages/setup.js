import React, {Component} from 'react';
import {Navigator} from 'react-native-deprecated-custom-components';
import WelcomePage from './WelcomePage'
import PopularPage from "./PopularPage";

function setup() {


    class Root extends Component {


        render() {
            return <Navigator
                initialRoute={{component: WelcomePage}}
                renderScene={(route, navigator) => this.renderScene(route, navigator)
                }
            />
        }

        renderScene(route, navigator) {
            let Component = route.component;
            return <Component navigator={navigator} {...route.params}/>
        }

    }
     return <Root/>
    // return <PopularPage/>
}

module.exports=setup;