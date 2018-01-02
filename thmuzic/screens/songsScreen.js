import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ListView
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

// import the module
import RNMusicMetadata from "react-native-music-metadata";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

function a(string){

}

export default class songsScreen extends Component<{}> {
  static navigationOptions = {
    title: "All songs"
  };
  
  constructor(props) {
    super(props);
    var datab = [];
    this.state = {
      dataSource: datab
    };
    var RNFS = require("react-native-fs");
    var dir = RNFS.ExternalStorageDirectoryPath + "/Music";
    RNFS.readDir(dir) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        for (index = 0; index < result.length; ++index) {
          console.log("resultIndex", result[index]);
          RNMusicMetadata.getMetadata([result[index].path])
          .then(tracks => {
            console.log(tracks[0]);
            datab.push(tracks[0]);
            console.log("datab", datab);
            this.setState({ ...this.state.dataSource, datab });
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
      <Container style={{ backgroundColor: "#0xE9E9EF" }}>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={item => (
              <ListItem
                style={{ borderBottomWidth: 0, backgroundColor: "#0xE9E9EF" }}
                onPress={() => navigate("Play",{songTitle: item.title})}
                title="All songs"
              >
                <Thumbnail
                  square
                  source={require("../images/icons/music.png")}
                />
                <Body>
                  <Text numberOfLines={2}>{item.title}</Text>
                  <Text note />
                </Body>
                <Right>
                  <Text note>{Math.round(item.duration/60 * 100) / 100}</Text>
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
