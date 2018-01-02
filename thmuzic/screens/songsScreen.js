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
    this.state = {
      dataSource: this.data,
    };
   MusicFiles.getAll({
      blured : true, // works only when 'cover' is set to true
      artist : true,
      duration : true, //default : true
      cover : false, //default : true,
      genre : true,
      title : true,
      cover : true,
      date : true,
      lyrics : true,
      comments : true,
      minimumSongDuration : 10000 // get songs bigger than 10000 miliseconds duration,
      //fields : ['title','albumTitle','genre','lyrics','artwork','duration'] // for iOs Version
  }).then((datab)=>{
    console.log(datab);
    //this.setState({dataSource: ds.cloneWithRows(data)});
  });;
   };
  render() {
    
    var data = [
      {
        id: 1,
        title: "La danza del fuego",
        author: "Mago de Oz",
        album: "Finisterra",
        genre: "Folk",
        duration: 132132312321, // miliseconds
        cover: "file:///sdcard/0/123.png",
        blur: "file:///sdcard/0/123-blur.png", //Will come null if createBLur is set to false
        path: "/sdcard/0/la-danza-del-fuego.mp3",
        date: "2017",
        lyrics: "[00:00] Cuando despiertes un dia..."
      },
      {
        id: 2,
        title: "La danza del fuego 2",
        author: "Mago de Oz 2",
        album: "Finisterra 2",
        genre: "Folk 2",
        duration: 132132312321, // miliseconds
        cover: "file:///sdcard/0/123.png",
        blur: "file:///sdcard/0/123-blur.png", //Will come null if createBLur is set to false
        path: "/sdcard/0/la-danza-del-fuego.mp3",
        date: "2017",
        lyrics: "[00:00] Cuando despiertes un dia..."
      }
    ];
   // console.log(data);
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
          <List
            dataArray={data}
            renderRow={item => (
              <ListItem style={{ borderBottomWidth: 0 }}>
                <Thumbnail square source={{ uri: item.cover }} />
                <Body>
                  <Text numberOfLines={1}>{item.title}</Text>
                  <Text note />
                </Body>
                <Right>
                  <Text note>{item.duration}</Text>
                </Right>
              </ListItem>
            )}
          >
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
