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
import RNMusicMetadata from "react-native-music-metadata";
export default class albumScreen extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ backgroundColor: "rgb(28, 28, 28)" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Albums</Title>
        </Body>
        <Right />
      </Header>
    )
  });

  constructor(props) {
    super(props);
    var listAlbum = [];
    var data = [];
    this.state = {
      dataSource: listAlbum
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      data.push(item);
    });
    do {
      if (data.length > 0) {
        var temp = [];
        temp = data.filter(item => item.albumName === data[0].albumName);
        console.log("temp", temp);
        listAlbum.push(temp);
        data = data.filter(item => item.albumName !== data[0].albumName);
      }
    } while (data.length > 0);
    this.setState({ ...this.state.dataSource, listAlbum });
    console.log("this.state.dataSource", this.state.dataSource);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "rgb(17, 17, 17)" }}>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={item => (
              <ListItem
                style={{
                  borderBottomWidth: 0,
                  backgroundColor: "rgb(17, 17, 17)"
                }}
                onPress={() =>
                  navigate("Songs", {
                    listSong: item
                  })
                }
                title="All songs"
              >
                <Thumbnail
                  square
                  source={require("../images/icons/album.png")}
                />
                <Body>
                  <Text numberOfLines={2} style ={styles.white}>{item[0].albumName}</Text>
                  <Text note numberOfLines={1} style ={styles.white}>
                    {item[0].albumArtist}
                  </Text>
                </Body>
                <Right>
                  <Text note style ={styles.gray}>{item.length} songs</Text>
                </Right>
              </ListItem>
            )}
          />
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
