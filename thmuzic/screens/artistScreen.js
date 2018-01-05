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
    title: "Artists"
  };
  constructor(props) {
    super(props);
    var list = [];
    var data = [];
    this.state = {
      dataSource: list
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      data.push(item);
    });
    do {
      if (data.length > 0) {
        var temp = [];
        temp = data.filter(item => item.artist === data[0].artist);
        console.log("temp", temp);
        list.push(temp);
        data = data.filter(item => item.artist !== data[0].artist);
      }
    } while (data.length > 0);
    this.setState({ ...this.state.dataSource, list });
    console.log("this.state.dataSource", this.state.dataSource);
  }
  render() {
    const { navigate } = this.props.navigation;    
    return (
      <Container style={{ backgroundColor: "rgb(233, 233, 239)" }}>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={item => (
              <ListItem
                style={{
                  borderBottomWidth: 0,
                  backgroundColor: "rgb(233, 233, 239)"
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
                  source={require("../images/icons/artist.png")}
                />
                <Body>
                  <Text numberOfLines={2}>{item[0].artist}</Text>
                </Body>
                <Right>
                  <Text note>{item.length} songs</Text>
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
