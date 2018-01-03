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

import MusicControl from "react-native-music-control";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class playScreen extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.curentSong.title}`
  });
  constructor(props) {
    super(props);
    var temp = [];
    this.state = {
      dataSource: temp
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      temp.push(item);
    });
    if (temp[0] != null) {
      this.setState({ ...this.state.dataSource, temp });
    }
    var a = this.state.dataSource.indexOf(params.curentSong);
  }
  render() {
    MusicControl.setNowPlaying({
      title: "Billie Jean",
      artwork: "https://i.imgur.com/e1cpwdo.png", // URL or RN's image require()
      artist: "Michael Jackson",
      album: "Thriller",
      genre: "Post-disco, Rhythm and Blues, Funk, Dance-pop",
      duration: 294, // (Seconds)
      description: "", // Android Only
      color: 0xffffff, // Notification Color - Android Only
      date: "1983-01-02T00:00:00Z", // Release Date (RFC 3339) - Android Only
      rating: 84, // Android Only (Boolean or Number depending on the type)
      notificationIcon: "my_custom_icon" // Android Only (String), Android Drawable resource name for a custom notification icon
    });
    // Basic Controls
    MusicControl.enableControl("play", true);
    MusicControl.enableControl("pause", true);
    MusicControl.enableControl("stop", true);
    MusicControl.enableControl("nextTrack", true);
    MusicControl.enableControl("previousTrack", true);

    // Seeking
    MusicControl.enableControl("seek", true); // Android only
    MusicControl.enableControl("skipForward", true);
    MusicControl.enableControl("skipBackward", true);

    // Android Specific Options
    MusicControl.enableControl("setRating", false);
    MusicControl.enableControl("volume", true); // Only affected when remoteVolume is enabled
    MusicControl.enableControl("remoteVolume", true);

    MusicControl.enableControl("closeNotification", true, { when: "never" });
    return (
      <Container style={{ backgroundColor: "rgb(233, 233, 239)" }}>
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
