import React, {Component} from 'react';
import {Navigator, StatusBar, TouchableHighlight,
   AppRegistry, StyleSheet, Text, View} from 'react-native';
   
import songsScreen from './songsScreen.js';
import playScreen from './playScreen.js';
import albumScreen from './albumScreen.js';
import artistScreen from './artistScreen.js';
import likedScreen from './likedScreen.js';
import mainScreen from '../App.js';

const routes = [
  {
    title: 'TH Muzic',
    index: 0
  }, {
    title: 'All songs',
    index: 1
  },{
    title: 'Albums',
    index: 2
  },{
    title: 'Artists',
    index: 3
  },{
    title: 'Favourites',
    index: 4
  },{
    title: 'Play song',
    index: 5
  }
]

class navigatorBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="darkred"
          barStyle="light-content"
        />
        <Navigator
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={
            (route, navigator) => {
              switch (route.index) {
                case 0: return (<mainScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></mainScreen>);
                case 1: return (<songsScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></songsScreen>);
                case 2: return (<albumScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></albumScreen>);
                case 3: return (<artistScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></artistScreen>);
                case 4: return (<likedScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></likedScreen>);
                case 5: return (<playScreen navigator={navigator} route={routes[route.index]} {...route.passProps}></playScreen>);                
              }
            }
          }
          configureScene={
            (route, routeStack) =>
              Navigator.SceneConfigs.FloatFromBottom
          }
          navigationBar={
           <Navigator.NavigationBar
             routeMapper={{
               LeftButton: (route, navigator, index, navState) => {
                 if (route.index == 0){
                   return null;
                 }
                 return (
                   <TouchableHighlight onPress={()=>navigator.pop()}>
                     <Text style={styles.navigationBarText}>Back</Text>
                   </TouchableHighlight>
                 )
               },
               RightButton: (route, navigator, index, navState) => { return null; },
               Title: (route, navigator, index, navState) =>
                 { return (<Text style={[styles.navigationBarText, styles.titleText]}>{routes[route.index].title}</Text>); },
             }}
             style={styles.navigationBar}
           />
        }
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigationBar:{
    backgroundColor: 'darkred',
  },
  navigationBarText:{
    color: 'white',
    padding: 10,
    fontSize: 15
  },
  titleText:{
    fontSize: 20,
    paddingTop:5
  }

});

export default navigatorBar;
//AppRegistry.registerComponent('l8_movie', () => l8_movie);
//AppRegistry.registerComponent('thmuzic', () => navigatorBar);
