import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity
  // Text,
  //View
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  List,
  ListItem,
  Thumbnail
} from "native-base";
import { StackNavigator } from "react-navigation";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

import songsScreen from './screens/songsScreen.js';
import albumScreen from './screens/albumScreen.js';
import artistScreen from './screens/artistScreen.js';
import likedScreen from './screens/likedScreen.js';
import playScreen from './screens/playScreen.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "TH muzik"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "rgb(233, 233, 239)" }}>
        <Content>
          <List>
            <ListItem
              style={{ borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)" }}
              onPress={() => navigate("Favou")}
            >
              <Thumbnail square source={require("./images/icons/like.png")} />
              <Body>
                  <Text>Favourite songs</Text>
              </Body>
            </ListItem>
            <ListItem
              style={{ borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)" }}
              onPress={() => navigate("Songs")}
            >
              <Thumbnail square source={require("./images/icons/music.png")} />
              <Body>
                  <Text>All songs</Text>
              </Body>
            </ListItem>
            <ListItem
              style={{ borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)" }}
              onPress={() => navigate("Albums")}
            >
              <Thumbnail square source={require("./images/icons/album.png")} />
              <Body>
                  <Text>Albums</Text>
              </Body>
            </ListItem>
            <ListItem
              style={{ borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)" }}
              onPress={() => navigate("Artists")}
            >
              <Thumbnail square source={require("./images/icons/artist.png")} />
              <Body>
                  <Text>Artists</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Songs: { screen: songsScreen },
  Albums: { screen: albumScreen },
  Artists: { screen: artistScreen },
  Favou: { screen: likedScreen },
  Play: {screen: playScreen},
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({});
