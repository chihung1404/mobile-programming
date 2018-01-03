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

//import MusicControl from "react-native-music-control";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class playScreen extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.curentSong.title}`,
  });
  constructor(props) {
    super(props);
    var temp = [];
    this.state = {
      dataSource: temp
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item){
      temp.push(item);
    })
    if (temp[0] != null) {
      this.setState({ ...this.state.dataSource, temp });
    }
    var a = this.state.dataSource.indexOf(params.curentSong);
  }
  render() {
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
