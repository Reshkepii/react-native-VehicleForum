import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import Fire from '../Fire';

export default class ProfileScreen extends React.Component {
  state = {
    user: {},
    
  };

  render() {
    return (
      <View style={styles.container}>
         <Image
        style={styles.tinyLogo}
        source={require('../assets/favicon.png')}
      />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
          <Text>Name</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>Email</Text>
          </View>
        </View>
        <Button
          onPress={() => {
            Fire.shared.signOut();
          }}
          title='Log Out'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 15,
    shadowOpacity: 0.4
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32
  },
  stat: {
    alignItems: 'center',
    flex: 1
  },
  statAmount: {
    color: '#4f566d',
    fontSize: 18,
    fontWeight: '300'
  },
  statTitle: {
    color: '#c3c5cd',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4
  },
  tinyLogo: {
    marginLeft:180,
    marginTop: 60
  }
});
