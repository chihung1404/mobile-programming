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

class App extends Component<{}> {
  render() {
    return (
      <Container style={{ backgroundColor: "#ffffff" }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>TH muzik</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem style={{borderBottomWidth: 0}}>
              <Thumbnail square source={require("./images/icons/like.png")} />
              <Body>
                <Button transparent>
                  <Text>Bài hát yêu thích</Text>
                </Button>
              </Body>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0}}>
              <Thumbnail square source={require("./images/icons/music.png")} />
              <Body>
                <Button transparent>
                  <Text>Tất cả bài hát</Text>
                </Button>
              </Body>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0}}>
              <Thumbnail square source={require("./images/icons/album.png")} />
              <Body>
                <Button transparent>
                  <Text>Albums</Text>
                </Button>
              </Body>
            </ListItem>
            <ListItem style={{borderBottomWidth: 0}}>
              <Thumbnail square source={require("./images/icons/artist.png")} />
              <Body>
                <Button transparent>
                <Text>Nghệ sĩ</Text>
                </Button>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

export default App;
