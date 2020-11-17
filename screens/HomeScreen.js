import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

import FirebaseKeys from '../config';
import firebase from 'firebase';
require('firebase/firestore');


const getData = () => {
  var posts = [];
  for(var i=6;i<11;i++){
      firebase.database().ref('/posts/'+i+'/text/text').on('value',(snap)=>{
        var temp = snap.val();
        posts.push({
          id: i,
          text: temp
        })
      });
    }
    console.log(posts);
    return posts;

}

posts = getData();


export default class HomeScreen extends React.Component {
  

  renderPost = post => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.post}>{post.text}</Text>  
        </View>
      </View>
    );
  };
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={posts}
          renderItem={({ item }) => this.renderPost(item)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
         
        
        
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efecf4'
  },
  header: {
    paddingTop: 64,
    paddingBottom: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ebecf4',
    shadowColor: '#454d65',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500'
  },
  feed: {
    marginHorizontal: 16
  },
  feedItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454d65'
  },
  timestamp: {
    fontSize: 11,
    color: '#c4c6ce',
    marginTop: 4
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899'
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16
  }
});
