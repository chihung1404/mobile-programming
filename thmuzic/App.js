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

import songsScreen from "./screens/songsScreen.js";
import albumScreen from "./screens/albumScreen.js";
import artistScreen from "./screens/artistScreen.js";
import likedScreen from "./screens/likedScreen.js";
import playScreen from "./screens/playScreen.js";
import RNMusicMetadata from "react-native-music-metadata";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: (
      <Header style={{ backgroundColor: "rgb(28, 28, 28)" }}>
        <Left >
        <Button transparent>
              <Icon name='menu' />
            </Button>
        </Left>
        <Body >
          <Title>THmuzik</Title>
        </Body>
        <Right />
      </Header>
    )
  };
  constructor(props) {
    super(props);
    var data = [];
    this.state = {
      dataSource: data
    };
    var RNFS = require("react-native-fs");
    var dir = RNFS.ExternalStorageDirectoryPath + "/Music";
    RNFS.readDir(dir) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        for (index = 0; index < result.length; ++index) {
          RNMusicMetadata.getMetadata([result[index].path])
            .then(tracks => {
              data.push(tracks[0]);
              this.setState({ ...this.state.dataSource, data });
            })
            .catch(err => {
              console.error(err);
            });
        }
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "rgb(17, 17, 17)" }}>
        <Content>
          <List>
            <ListItem
              style={{
                borderBottomWidth: 0,
                backgroundColor: "rgb(17, 17, 17)"
              }}
              onPress={() => navigate("Favou")}
            >
              <Thumbnail square source={require("./images/icons/like.png")} />
              <Body>
                <Text style={styles.white}>Favourite songs</Text>
              </Body>
            </ListItem>
            <ListItem
              style={{
                borderBottomWidth: 0,
                backgroundColor: "rgb(17, 17, 17)"
              }}
              onPress={() => navigate("Songs", {
                listSong: this.state.dataSource
              })}
            >
              <Thumbnail square source={require("./images/icons/music.png")} />
              <Body>
                <Text style={styles.white}>All songs</Text>
              </Body>
            </ListItem>
            <ListItem
              style={{
                borderBottomWidth: 0,
                backgroundColor: "rgb(17, 17, 17)"
              }}
              onPress={() =>
                navigate("Albums", {
                  listSong: this.state.dataSource
                })
              }
            >
              <Thumbnail square source={require("./images/icons/album.png")} />
              <Body>
                <Text style={styles.white}>Albums</Text>
              </Body>
            </ListItem>
            <ListItem
              style={{
                borderBottomWidth: 0,
                backgroundColor: "rgb(17, 17, 17)"
              }}
              onPress={() => navigate("Artists", {
                listSong: this.state.dataSource
              })}
            >
              <Thumbnail square source={require("./images/icons/artist.png")} />
              <Body>
                <Text style={styles.white}>Artists</Text>
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
  Play: { screen: playScreen }
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
});
