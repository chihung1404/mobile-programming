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
import { Col, Row, Grid } from "react-native-easy-grid";

import MusicControl from "react-native-music-control";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
var Sound = require("react-native-sound");
export default class playScreen extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.curentSong.title}`
  });

  //--------------------------

  constructor(props) {
    super(props);
    var temp = [];
    this.state = {
      dataSource: temp,
      nativeSound: null,
      currentSong: null,
      playing: true
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      temp.push(item);
    });
    if (temp[0] != null) {
      this.setState({ ...this.state.dataSource, temp });
      setTimeout(() => {
        var whoosh = new Sound(params.curentSong.uri, "", error => {
          console.log("load Soun");
          if (error) {
            console.log("failed to load the sound", error);
            return;
          }
          // loaded successfully
          this.setState({currentSong: whoosh})
          console.log('this.state.currentSong',this.state.currentSong)
          console.log(
            "duration in seconds: " +
              whoosh.getDuration() +
              "number of channels: " +
              whoosh.getNumberOfChannels()
          );
        });
        setTimeout(() => {
          this.state.currentSong.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          this.state.currentSong.reset();
             }
          });
        }, 50);
      }, 250);
    }
    var a = this.state.dataSource.indexOf(params.curentSong);
    this.startStopButton = this.startStopButton.bind(this);
    this.handleStartPress = this.handleStartPress.bind(this);
    this.setPlaying = this.setPlaying.bind(this);
  }

  //--------------------------
  setPlaying() {
    if (this.state.playing) {
      this.state.currentSong.pause();
      this.setState({ playing: false });
      return;
    } else {
      this.state.currentSong.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
      // reset the player to its uninitialized state (android only)
      // this is the only option to recover after an error occured and use the player again
      this.state.currentSong.reset();
         }
      });
      this.setState({ playing: true });
    }
  }

  startStopButton() {
    var img = this.state.playing
      ? "data:../images/icons/pause.png"
      : "data:../images/icons/play.png";
    return (
      <TouchableOpacity onPress={this.handleStartPress}>
        <Image
          style={{ width: 90, height: 90 }}
          source={
            this.state.playing
              ? require("../images/icons/pause.png")
              : require("../images/icons/play.png")
          }
        />
      </TouchableOpacity>
    );
  }
  handleStartPress() {
    this.setPlaying();
  }
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    console.log("new Sound");
    console.log("uri", params.curentSong.uri);

    return (
      <Container style={{ backgroundColor: "rgb(233, 233, 239)" }}>
        <Grid>
          <Row size={4} style={{ backgroundColor: "#635DB7" }}>
            <Col size={1} />
            <Col size={4} style={styles.rowControl}>
              <Image
                style={{ width: 350, height: 400 }}
                source={require("../images/icons/test.jpg")}
              />
            </Col>
            <Col size={1} />
          </Row>
          <Row size={0.5} style={styles.rowControl}>
            <Text>Progress Bar</Text>
          </Row>

          <Row size={1}>
            <Col size={1} style={styles.rowControl}>
              <TouchableOpacity onPress={() => navigate("Songs")}>
                <Image
                  style={styles.stretch}
                  source={require("../images/icons/loop.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col size={1} style={styles.rowControl}>
              <TouchableOpacity onPress={() => navigate("Songs")}>
                <Image
                  style={styles.stretch}
                  source={require("../images/icons/prev.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col size={2} style={styles.rowControl}>
              {this.startStopButton()}
            </Col>
            <Col size={1} style={styles.rowControl}>
              <TouchableOpacity onPress={() => navigate("Songs")}>
                <Image
                  style={styles.stretch}
                  source={require("../images/icons/next.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col size={1} style={styles.rowControl}>
              <TouchableOpacity onPress={() => navigate("Songs")}>
                <Image
                  style={styles.stretch}
                  source={require("../images/icons/shuffle.png")}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row size={0.125} />
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    justifyContent: "center",
    alignItems: "center"
  },
  rowControl: {
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: "#00CE"
  },
  playControl: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00CE"
  },
  stretch: {
    width: 50,
    height: 50
  }
});
