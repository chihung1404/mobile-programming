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
    header: (
      <Header style={{ backgroundColor: "rgb(40, 40, 40)" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title />
        </Body>
        <Right />
      </Header>
    )
  });

  //--------------------------
  constructor(props) {
    super(props);
    var temp = [];
    var play = false;
    this.state = {
      dataSource: temp,
      nativeSound: null,
      currentSong: null,
      playing: play,
      currentfile: null,
      songTitle: "",
      artist: "",
      loop: false,
      shuffle: false
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      temp.push(item);
    });

    if (temp[0] != null) {
      if (this.state.playing){
        this.state.currentSong.stop();
        this.state.currentSong.release();
      }
      play = true;
      this.setState({ ...this.state.dataSource, temp });
      setTimeout(() => {
        var whoosh = new Sound(params.curentSong.uri, "", error => {
          if (error) {
            return;
          }
          this.setState({
            currentSong: whoosh,
            currentfile: params.curentSong,
            songTitle: params.curentSong.title,
            artist: params.curentSong.artist,
            playing: play
          });
          console.log("this.state.currentfile", this.state.currentfile);
        });
        setTimeout(() => {
          this.state.currentSong.play(success => {
            if (success) {
            } else {
              console.log("playback failed due to audio decoding errors");
              this.state.currentSong.reset();
            }
          });
        }, 50);
      }, 250);
    }
    this.startStopButton = this.startStopButton.bind(this);
    this.handleStartPress = this.handleStartPress.bind(this);
    this.setPlaying = this.setPlaying.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.loopOption = this.loopOption.bind(this);
    this.shuffleOption = this.shuffleOption.bind(this);
    this.loopButton = this.loopButton.bind(this);
    this.shuffleButton = this.shuffleButton.bind(this);
    this.stop = this.stop.bind(this);
  }

  //--------------------------
  loopOption() {
    if (this.state.loop) {
      console.log("loop disable", this.state.currentSong.getNumberOfLoops());

      this.setState({ loop: false });
      this.state.currentSong.setNumberOfLoops(0);
      console.log("loop disable", this.state.currentSong.getNumberOfLoops());
    } else {
      console.log("loop ok", this.state.currentSong.getNumberOfLoops());
      console.log("loop", this.state.loop);
      this.setState({ loop: true });
      this.state.currentSong.setNumberOfLoops(-1);
      console.log("loop ok", this.state.currentSong.getNumberOfLoops());
      console.log("loop", this.state.loop);
    }
  }

  shuffleOption() {
    if (this.state.shuffle) {
      console.log("shuffle disable", this.state.shuffle);
      this.setState({ shuffle: false });
      console.log("shuffle disable", this.state.shuffle);
    } else {
      console.log("shuffle ok", this.state.shuffle);
      this.setState({ shuffle: true });
      console.log("shuffle ok", this.state.shuffle);
    }
  }

  setPlaying() {
    if (this.state.playing) {
      this.state.currentSong.pause();
      this.setState({ playing: false });
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
        elapsedTime: 103, // (Seconds)
        bufferedTime: 200, // Android Only (Seconds)
      });
      return;
    } else {
      this.state.currentSong.play(success => {
        if (success) {
          //console.log('successfully finished playing');
          //const tit = this.state.currentfile.title;
        } else {
          //console.log('playback failed due to audio decoding errors');
          this.state.currentSong.reset();
        }
      });
      this.setState({ playing: true });
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
        elapsedTime: 103, // (Seconds)
        bufferedTime: 200, // Android Only (Seconds)
      });
    }
  }
  stop(){
    this.state.currentSong.stop();
    this.state.currentSong.release();
    this.setState({ playing: false });
  }
  startStopButton() {
    var img = this.state.playing
      ? "data:../images/icons/pause.png"
      : "data:../images/icons/play.png";
    return (
      <TouchableOpacity onPress={this.handleStartPress} activeOpacity={0.8}>
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

  loopButton() {
    return (
      <TouchableOpacity onPress={this.loopOption} activeOpacity={0.8}>
        <Image
          style={styles.stretch}
          source={
            this.state.loop
              ? require("../images/icons/loop-enable.png")
              : require("../images/icons/loop.png")
          }
        />
      </TouchableOpacity>
    );
  }
  shuffleButton() {
    return (
      <TouchableOpacity onPress={this.shuffleOption} activeOpacity={0.8}>
        <Image
          style={styles.stretch}
          source={
            this.state.shuffle
              ? require("../images/icons/shuffle-enable.png")
              : require("../images/icons/shuffle.png")
          }
        />
      </TouchableOpacity>
    );
  }
  handleStartPress() {
    this.setPlaying();
  }

  playNext() {
    var index = this.state.dataSource.indexOf(this.state.currentfile);
    console.log("index", index);
    console.log("this.state.dataSource", this.state.dataSource);
    console.log("this.state.currentSong", this.state.currentSong);
    if (!this.state.playing) {
      this.setState({ playing: true });
    }
    switch (this.state.shuffle) {
      case true:
        var nextIndex = 1;
        if (index < this.state.dataSource.length / 2) {
          nextIndex = Math.floor(
            Math.random() * (this.state.dataSource.length - 1) + (index + 1)
          );
        } else {
          nextIndex = Math.floor(Math.random() * (index - 1) + 0);
        }
        this.state.currentSong.stop();
        this.state.currentSong.release();
        setTimeout(() => {
          var whoosh = new Sound(
            this.state.dataSource[nextIndex].uri,
            "",
            error => {
              if (error) {
                return;
              }
              this.setState({
                currentSong: whoosh,
                currentfile: this.state.dataSource[nextIndex],
                songTitle: this.state.dataSource[nextIndex].title,
                artist: this.state.dataSource[nextIndex].artist
              });

              console.log("this.state.currentfile", this.state.currentfile);
            }
          );
          setTimeout(() => {
            this.state.currentSong.play(success => {
              if (success) {
                //console.log('successfully finished playing');
              } else {
                console.log("playback failed due to audio decoding errors");
                // this is the only option to recover after an error occured and use the player again
                this.state.currentSong.reset();
              }
            });
          }, 50);
        }, 250);
        break;
      case false:
        if (index === this.state.dataSource.length - 1) {
          this.state.currentSong.stop(() => {
            this.state.currentSong.play();
          });
        } else {
          this.state.currentSong.stop();
          this.state.currentSong.release();
          setTimeout(() => {
            var whoosh = new Sound(
              this.state.dataSource[index + 1].uri,
              "",
              error => {
                if (error) {
                  return;
                }
                this.setState({
                  currentSong: whoosh,
                  currentfile: this.state.dataSource[index + 1],
                  songTitle: this.state.dataSource[index + 1].title,
                  artist: this.state.dataSource[index + 1].artist
                });

                console.log("this.state.currentfile", this.state.currentfile);
              }
            );
            setTimeout(() => {
              this.state.currentSong.play(success => {
                if (success) {
                  //console.log('successfully finished playing');
                } else {
                  console.log("playback failed due to audio decoding errors");
                  // this is the only option to recover after an error occured and use the player again
                  this.state.currentSong.reset();
                }
              });
            }, 50);
          }, 250);
          MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
            elapsedTime: 103, // (Seconds)
            bufferedTime: 200, // Android Only (Seconds)
          });
        }
    }
  }

  playPrev() {
    var index = this.state.dataSource.indexOf(this.state.currentfile);
    console.log("index", index);
    console.log("this.state.dataSource", this.state.dataSource);
    console.log("this.state.currentSong", this.state.currentSong);
    if (!this.state.playing) {
      this.setState({ playing: true });
    }
    switch (this.state.shuffle) {
      case true:
        var nextIndex = 1;
        if (index < this.state.dataSource.length / 2) {
          nextIndex = Math.floor(
            Math.random() * (this.state.dataSource.length - 1) + (index + 1)
          );
        } else {
          nextIndex = Math.floor(Math.random() * (index - 1) + 0);
        }
        this.state.currentSong.stop();
        this.state.currentSong.release();
        setTimeout(() => {
          var whoosh = new Sound(
            this.state.dataSource[nextIndex].uri,
            "",
            error => {
              if (error) {
                return;
              }
              this.setState({
                currentSong: whoosh,
                currentfile: this.state.dataSource[nextIndex],
                songTitle: this.state.dataSource[nextIndex].title,
                artist: this.state.dataSource[nextIndex].artist
              });

              console.log("this.state.currentfile", this.state.currentfile);
            }
          );
          setTimeout(() => {
            this.state.currentSong.play(success => {
              if (success) {
                //console.log('successfully finished playing');
              } else {
                console.log("playback failed due to audio decoding errors");
                // this is the only option to recover after an error occured and use the player again
                this.state.currentSong.reset();
              }
            });
          }, 50);
        }, 250);
        break;
      case false:
        if (index === 0) {
          this.state.currentSong.stop(() => {
            this.state.currentSong.play();
          });
        } else {
          this.state.currentSong.stop();
          this.state.currentSong.release();
          setTimeout(() => {
            var whoosh = new Sound(
              this.state.dataSource[index - 1].uri,
              "",
              error => {
                if (error) {
                  return;
                }
                this.setState({
                  currentSong: whoosh,
                  currentfile: this.state.dataSource[index - 1],
                  songTitle: this.state.dataSource[index - 1].title,
                  artist: this.state.dataSource[index - 1].artist
                });
                console.log("this.state.currentfile", this.state.currentfile);
              }
            );
            setTimeout(() => {
              this.state.currentSong.play(success => {
                if (success) {
                  //console.log('successfully finished playing');
                } else {
                  console.log("playback failed due to audio decoding errors");
                  // this is the only option to recover after an error occured and use the player again
                  this.state.currentSong.reset();
                }
              });
            }, 50);
          }, 250);
          MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
            elapsedTime: 103, // (Seconds)
            bufferedTime: 200, // Android Only (Seconds)
          });
        }
    }
  }
  componentWillMount() {
    MusicControl.setNowPlaying({
      title: "Xin Dung Lang Im",
      artwork: "https://i.imgur.com/e1cpwdo.png", // URL or RN's image require()
      artist: "Soobin Hoang Son",
      album: "Xin Dung Im Lang ",
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
    MusicControl.enableControl("stop", false);
    MusicControl.enableControl("nextTrack", true);
    MusicControl.enableControl("previousTrack", true);
    MusicControl.enableControl("closeNotification", true, { when: "always" });

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      elapsedTime: 103, // (Seconds)
      bufferedTime: 200, // Android Only (Seconds)
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    {
      this.startStopButton();
    }
    return (
      <Container style={{ backgroundColor: "rgb(40, 40, 40)" }}>
        <Grid>
          <Row size={3} style={{ backgroundColor: "rgb(40, 40, 40)" }}>
            <Col size={1} />
            <Col size={4} style={styles.rowControl}>
              <Image
                style={{ width: 350, height: 400 }}
                source={require("../images/icons/cool.jpg")}
              />
            </Col>
            <Col size={1} />
          </Row>
          <Row size={0.5} style={styles.rowControl}>
            <Text style={styles.white}>{this.state.songTitle}</Text>
          </Row>
          <Row size={0.25} style={styles.rowControl}>
            <Text style={styles.gray}>{this.state.artist}</Text>
          </Row>
          <Row size={1.5}>
            <Col size={1} style={styles.rowControl}>
              {this.loopButton()}
            </Col>
            <Col size={1} style={styles.rowControl}>
              <TouchableOpacity onPress={this.playPrev}>
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
              <TouchableOpacity onPress={this.playNext}>
                <Image
                  style={styles.stretch}
                  source={require("../images/icons/next.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col size={1} style={styles.rowControl}>
              {this.shuffleButton()}
            </Col>
          </Row>
          <Row size={0.125} />
        </Grid>
      </Container>
    );
  }

  componentDidMount() {
    MusicControl.enableBackgroundMode(true);

    // on iOS, pause playback during audio interruptions (incoming calls) and resume afterwards.
    MusicControl.handleAudioInterruptions(true);

    MusicControl.on("play", () => {
      this.setPlaying();
    });

    // on iOS this event will also be triggered by audio router change events
    // happening when headphones are unplugged or a bluetooth audio peripheral disconnects from the device
    MusicControl.on("pause", () => {
      this.setPlaying();
    });

    MusicControl.on("stop", () => {
      this.stop();
    });

    MusicControl.on("nextTrack", () => {
      this.playNext();
    });

    MusicControl.on("previousTrack", () => {
      this.playPrev();
    });

    // Android Only
    MusicControl.on("closeNotification", () => {
      this.stop();
    });
  }

  componentWillUnmount(){
    this.setPlaying = this.setPlaying.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.loopOption = this.loopOption.bind(this);
    this.shuffleOption = this.shuffleOption.bind(this);
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
    backgroundColor: "#rgb(40, 40, 40)"
  },
  stretch: {
    width: 50,
    height: 50
  },
  white: {
    color: "white",
    fontSize: 22
  },
  gray: {
    color: "rgb(136, 136, 136)"
  }
});
