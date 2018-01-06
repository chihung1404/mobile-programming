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
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ backgroundColor: "rgb(40, 40, 40)" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Favourites</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  render() {
    return (
      <Container style={{ backgroundColor: "rgb(17, 17, 17)" }}>
        <Content>
          <List>
            <ListItem
              style={{
                borderBottomWidth: 0,
                backgroundColor: "rgb(17, 17, 17)"
              }}
            >
              <Thumbnail square source={require("../images/icons/music.png")} />
              <Body>
                <Text numberOfLines={1} style ={styles.white}>Tên bài hát</Text>
                <Text note style ={styles.white}/>
              </Body>
              <Right>
                <Text note style ={styles.gray}>3:43</Text>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  white: {
    color: "white",
    fontSize: 18
  },
  gray: {
    color: "rgb(136, 136, 136)"
  }
});
