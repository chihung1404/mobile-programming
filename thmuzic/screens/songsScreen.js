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

export default class songsScreen extends Component<{}> {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={{ backgroundColor: "rgb(40, 40, 40)" }}>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>All songs</Title>
        </Body>
        <Right />
      </Header>
    )
  });
  constructor(props) {
    super(props);
    var data = [];
    this.state = {
      dataSource: data
    };
    const { params } = this.props.navigation.state;
    params.listSong.forEach(function(item) {
      //console.log('data',item);
      data.push(item);
    });
    this.setState({ ...this.state.dataSource, data });
    //console.log('datasource',this.state.dataSource);
    //data.forEach(function(item) {
    //  console.log('data',item);
    //data.push(item);
    //});
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
                  navigate("Play", {
                    songTitle: item.title,
                    curentSong: item,
                    listSong: this.state.dataSource
                  })
                }
              >
                <Thumbnail
                  square
                  source={require("../images/icons/music.png")}
                />
                <Body>
                  <Text numberOfLines={2} style={styles.white}>
                    {item.title}
                  </Text>
                  <Text note>{item.artist}</Text>
                </Body>
                <Right>
                  <Text note style={styles.gray}>
                    {Math.round(item.duration / 60 * 100) / 100}
                  </Text>
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
