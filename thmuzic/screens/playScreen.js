import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image
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

export default class playScreen extends Component<{}> {
  static navigationOptions = {
    title: 'Song Title',
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#0xE9E9EF" }}>
        <Content>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../images/icons/play.png")}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
