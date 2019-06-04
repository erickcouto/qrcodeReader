import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from "react-native";

import _ from "lodash";
import QRCodeScanner from "react-native-qrcode-scanner";
import Modal from "react-native-modal";
import Details from "./src/components/details";
import { mockData } from "./src/data/mockData";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      modalData: null
    };
  }

  onSuccess = e => {
    this.setState({ isModalVisible: true, modalData: e.data });
  };
  handlerCloseModal = () => {
    this.setState({ isModalVisible: false });
    this.scanner.reactivate();
  };

  getData = tag => {
    var index = _.findIndex(mockData, { tag: tag });
    if (typeof mockData[index] === "undefined") {
      return { error: "notfound" };
    } else {
      return mockData[index];
    }
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width
        }}
      >
        <QRCodeScanner
          cameraStyle={{
            height: Dimensions.get("window").height
          }}
          onRead={this.onSuccess}
          ref={node => {
            this.scanner = node;
          }}
        />
        <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal}>
          <View style={styles.content}>
            {this.state.modalData && (
              <Details data={this.getData(this.state.modalData)} />
            )}
            <Button onPress={this.handlerCloseModal} title="Fechar" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
    height: 500
  },
  scrollableModal: {
    height: 300
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "#87BBE0",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollableModalText1: {
    fontSize: 20,
    color: "white"
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "#A9DCD3",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollableModalText2: {
    fontSize: 20,
    color: "white"
  }
});
