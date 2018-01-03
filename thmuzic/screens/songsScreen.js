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
          RNMusicMetadata.getMetadata([result[index].path])
          .then(tracks => {
            datab.push(tracks[0]);
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
      <Container style={{ backgroundColor: "rgb(233, 233, 239)" }}>
        <Content>
          <List
            dataArray={this.state.dataSource}
            renderRow={item => (
              <ListItem
                style={{ borderBottomWidth: 0, backgroundColor: "rgb(233, 233, 239)" }}
                onPress={() => navigate("Play",{songTitle: item.title, curentSong: item, listSong: this.state.dataSource})}
                title="All songs"
              >
                <Thumbnail
                  square
                  source={require("../images/icons/music.png")}
                />
                <Body>
                  <Text numberOfLines={2}>{item.title}</Text>
                  <Text note>{item.artist}</Text>
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
