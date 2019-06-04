import React, { Component } from "react";

import { View, Text, FlatList, Image, Dimensions } from "react-native";
import Lightbox from "react-native-lightbox";
const { height, width } = Dimensions.get("window");

export default class Details extends Component {
  render() {
    return (
      <View>
        <View>
          {this.props.data.error && (
            <Text>Tag não encontrada, tente novamente</Text>
          )}
        </View>
        <View>
          <Text style={{ fontSize: 25, padding: 5 }}>
            {this.props.data.title}
          </Text>
          <View style={{ height: 100, padding: 10 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={this.props.data.images}
              keyExtractor={item => item}
              renderItem={({ item }) => (
                <Lightbox
                  style={{ flex: 1 }}
                  renderContent={() => (
                    <View style={{ width, height }}>
                      <Image
                        style={{ flex: 1, resizeMode: "contain" }}
                        source={{ uri: item }}
                      />
                    </View>
                  )}
                >
                  <Image
                    key={item}
                    style={{ width: 100, height: 100, marginRight: 10 }}
                    source={{ uri: item }}
                  />
                </Lightbox>
              )}
            />
          </View>
          <Text style={{ fontSize: 16, padding: 10 }}>
            {this.props.data.description}
          </Text>
          {this.props.data.schedule && (
            <View>
              <Text style={{ fontSize: 20, padding: 10 }}>
                Horário de funcionamento:
              </Text>
              <View style={{ padding: 10 }}>
                {this.props.data.schedule.map(item => {
                  return <Text key={item}>{item}</Text>;
                })}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
