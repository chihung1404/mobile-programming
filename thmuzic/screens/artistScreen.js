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

export default class artistScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Artists',
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#0xE9E9EF" }}>
        <Content>
          <List>
            <ListItem style={{borderBottomWidth: 0, backgroundColor: "#0xE9E9EF"}}>
              <Thumbnail square source={require("../images/icons/artist.png")} />
              <Body>
                  <Text numberOfLines={1}>Tên ca sĩ</Text>
                  <Text note>1 Bài hát | 1 Album</Text>
              </Body>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0, backgroundColor: "#0xE9E9EF"}}>
              <Thumbnail square source={require("../images/icons/artist.png")} />
              <Body>
                  <Text numberOfLines={1}>Tên ca sĩ</Text>
                  <Text note>1 Bài hát | 1 Album</Text>
              </Body>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0, backgroundColor: "#0xE9E9EF"}}>
              <Thumbnail square source={require("../images/icons/artist.png")} />
              <Body>
                  <Text numberOfLines={1}>Tên ca sĩ</Text>
                  <Text note>1 Bài hát | 1 Album</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
