import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import Fire from '../Fire';
import UserPermissions from '../utilities/UserPermissions';

export default class PostScreen extends React.Component {
  state = {
    text: ''
  };

  componentDidMount() {
    UserPermissions.getCameraPermission();
  }

  handlePost = () => {
    Fire.shared
      .addPost({ text: this.state.text.trim()})
      .then(ref => {
        this.setState({ text: ''});
        this.props.navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name='md-arrow-back' size={24} color='#D8D9DB'></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePost}>
            <Text style={{ fontWeight: '500' }}>Post</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={4}
            style={{ flex: 1 }}
            placeholder='Want to share something?'
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          ></TextInput>
        </View>

        <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
          <Ionicons name='md-camera' size={32} color='#D8D9DB'></Ionicons>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
          <Image
            source={{ uri: this.state.image }}
            style={{ width: '100%', height: '100%' }}
          ></Image>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB'
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32
  }
});
