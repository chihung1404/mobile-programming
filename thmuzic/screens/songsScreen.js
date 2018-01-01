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

import MusicFiles from "react-native-get-music-files";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class songsScreen extends Component<{}> {
  constructor(props) {
    super(props);
    var data = MusicFiles.getAll(
      {
        blured: true, // works only when 'cover' is set to true
        artist: true,
        duration: true, //default : true
        cover: false, //default : true,
        genre: true,
        title: true,
        cover: true,
        date: true,
        lyrics: true,
        comments: true,
        minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      },
      error => {
        alert("ERROR: " + error);
      },
      response => {
        alert(JSON.stringify(response));
      }
    );
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#ffffff" }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Tất cả bài hát</Title>
          </Body>
        </Header>
        <Content>
          <List dataArray = {data}>
          renderRow={
            (item)=>
            <ListItem style={{ borderBottomWidth: 0 }}>
            <Thumbnail square source={{ uri: item.cover }} />
            <Body>
              <Text numberOfLines={1}>item.title</Text>
              <Text note />
            </Body>
            <Right>
              <Text note>item.duration</Text>
            </Right>
          </ListItem>
          }>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
