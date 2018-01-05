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
    title: "Now Playing"
  });
  //--------------------------
  constructor(props) {
    super(props);
    var temp = [];
    this.state = {
      dataSource: temp,
      nativeSound: null,
      currentSong: null,
      playing: true,
      currentfile: null,
      songTitle: "",
      loop: false,
      shuffle: false
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      temp.push(item);
    });

    if (temp[0] != null) {
      this.setState({ ...this.state.dataSource, temp });
      setTimeout(() => {
        var whoosh = new Sound(params.curentSong.uri, "", error => {
          if (error) {
            return;
          }
          this.setState({
            currentSong: whoosh,
            currentfile: params.curentSong,
            songTitle: params.curentSong.title
            //loop: false,
            //shuffle: false
          });
          console.log("this.state.currentfile", this.state.currentfile);
        });
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
          //console.log('loops: ' + this.state.currentSong.getNumberOfLoops())
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
      console.log("playing", this.state.playing);
      this.state.currentSong.pause();
      this.setState({ playing: false });

      return;
    } else {
      console.log("playing", this.state.playing);
      this.state.currentSong.play(success => {
        if (success) {
          //console.log('successfully finished playing');
        } else {
          //console.log('playback failed due to audio decoding errors');
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
            (Math.random() * (this.state.dataSource.length - 1)) + (index + 1)
          );
        } else {
          nextIndex = Math.floor((Math.random() * (index - 1)) + 0);
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
                songTitle: this.state.dataSource[nextIndex].title
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
                  songTitle: this.state.dataSource[index + 1].title
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
            (Math.random() * (this.state.dataSource.length - 1)) + (index + 1)
          );
        } else {
          nextIndex = Math.floor((Math.random() * (index - 1)) + 0);
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
                songTitle: this.state.dataSource[nextIndex].title
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
                  songTitle: this.state.dataSource[index - 1].title
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
        }
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    //const tit = this.state.currentfile.title;
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
            <Text>{this.state.songTitle}</Text>
          </Row>

          <Row size={1}>
            <Col size={1} style={styles.rowControl}>
              <TouchableOpacity onPress={this.loopOption}>
                <Image
                  style={styles.stretch}
                  source={require("../images/icons/loop.png")}
                />
              </TouchableOpacity>
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
              <TouchableOpacity onPress={this.shuffleOption}>
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
