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

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class likedScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Favourites',
  };
  render() {
    return (
      <Container style={{ backgroundColor: "rgb(233, 233, 239)" }}>
        <Content>
          <List>
            <ListItem style={{borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)"}}>
              <Thumbnail square source={require("../images/icons/music.png")} />
              <Body>
                  <Text numberOfLines={1}>Tên bài hát</Text>
                  <Text note></Text>
              </Body>
              <Right>
                <Text note>3:43</Text>
              </Right>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)"}}>
              <Thumbnail square source={require("../images/icons/music.png")} />
              <Body>
                  <Text numberOfLines={1}>Tên bài hát</Text>
                  <Text note></Text>
              </Body>
              <Right>
                <Text note>3:43</Text>
              </Right>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)"}}>
              <Thumbnail square source={require("../images/icons/music.png")} />
              <Body>
                  <Text numberOfLines={1}>Tên bài hát</Text>
                  <Text note></Text>
              </Body>
              <Right>
                <Text note>3:43</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
