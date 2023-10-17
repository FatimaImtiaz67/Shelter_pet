import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
} from 'react-native';
import React , {useState, useEffect}from 'react';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourites = () => {
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    // Retrieve the image URI from AsyncStorage
    const retrieveImageUri = async () => {
      try {
        const uri = await AsyncStorage.getItem('userImageURI');
        if (uri) {
          setImageUri(uri);
        }
      } catch (error) {
        console.error('Error retrieving image URI from AsyncStorage:', error);
      }
    };

    retrieveImageUri();
  }, []);
  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity>
          <Image source={require('./Images/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.profileText}>Favourites</Text>
        <TouchableOpacity>
            <Image
              source={{uri: imageUri}}
              style={styles.catImage}></Image>
        </TouchableOpacity>
      </View>
      <ScrollView>
      <View style={styles.central}>
        <TouchableOpacity>
        <Image
            source={require('./Images/RectanglePink.png')}
            style={{
              shadowColor: 'grey',
              marginTop:-40
            }}></Image>
          <View style={styles.description}>
            <Text 
            style={{color:'#150C1A',fontSize:25, fontWeight:'700', fontFamily:'Source Sans Pro',
             lineHeight:24, margin:20}}>Kesa Perssian Cat
            </Text>
            <View style={{position:'absolute',right:10, marginTop:15}}>
            <ImageBackground source={require('./Images/circle.png')} 
            style={{height:45,width:45, justifyContent:'center', alignItems:'center'}}>
            <Image source={require('./Images/share.png')} style={{height:25,width:25}}></Image>
           </ImageBackground>
           </View>
           <View style={{flexDirection:'row', alignContent:'center'}}>
            <Image source={require('./Images/location.png')} style={{marginLeft:15, marginBottom:20}}/>
            <Text style={{fontSize:16, fontFamily:'Roboto',marginLeft:15, marginBottom:20 }}>Spencer St, Governer, NY</Text>
           </View>
          </View>
        </TouchableOpacity>
     
          <TouchableOpacity>
          <Image
            source={require('./Images/Rectangle.png')}
            style={{
              shadowColor: 'grey',
              marginTop:-40
            }}></Image>
          <View style={styles.description}>
            <Text 
            style={{color:'#150C1A',fontSize:25, fontWeight:'700', fontFamily:'Source Sans Pro',
             lineHeight:24, margin:20}}>Lily Perssian Cat
            </Text>
            <View style={{position:'absolute',right:10, marginTop:15}}>
            <ImageBackground source={require('./Images/circle.png')} 
            style={{height:45,width:45, justifyContent:'center', alignItems:'center'}}>
            <Image source={require('./Images/share.png')} style={{height:25,width:25}}></Image>
           </ImageBackground>
           </View>
           <View style={{flexDirection:'row', alignContent:'center'}}>
            <Image source={require('./Images/location.png')} style={{marginLeft:15, marginBottom:20}}/>
            <Text style={{fontSize:16, fontFamily:'Roboto',marginLeft:15, marginBottom:20 }}>Spencer St, Governer, NY</Text>
           </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity>
          <Image
            source={require('./Images/grey.png')}
            style={{
              shadowColor: 'grey',
              marginTop:-40
            }}></Image>
          <View style={styles.description}>
            <Text 
            style={{color:'#150C1A',fontSize:25, fontWeight:'700', fontFamily:'Source Sans Pro',
             lineHeight:24, margin:20}}>Darcei Perssian Cat
            </Text>
            <View style={{position:'absolute',right:10, marginTop:15}}>
            <ImageBackground source={require('./Images/circle.png')} 
            style={{height:45,width:45, justifyContent:'center', alignItems:'center'}}>
            <Image source={require('./Images/share.png')} style={{height:25,width:25}}></Image>
           </ImageBackground>
           </View>
           <View style={{flexDirection:'row', alignContent:'center'}}>
            <Image source={require('./Images/location.png')} style={{marginLeft:15, marginBottom:20}}/>
            <Text style={{fontSize:16, fontFamily:'Roboto',marginLeft:15, marginBottom:20 }}>Spencer St, Governer, NY</Text>
           </View>
          </View>
          </TouchableOpacity>
          
        </View>
      </ScrollView>
      
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}></StatusBar>
    </View>
    
    </GestureHandlerRootView>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e1c1',
    height: '100%',
    width: '100%',
  },
  bar: {
  
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft:10,
    marginRight:10
  },
  profileText: {
    fontFamily: 'Source Sans Pro',
    color: '#150C1A',
    fontWeight: '800',
    fontSize: 24,
    marginTop:10,
    marginLeft: 100,
  },
  catImage: {
    height: 50,
    width: 50,
    borderRadius:25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: 10,
    marginTop: 5,
    marginLeft:90
  },
  central: {
 
    alignItems: 'center',
    marginTop:10
  },
  description: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 20,
    padding: 2,
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 12,
    marginTop: -100,
    width: 380,
    height: 100,
    backgroundColor: '#FFF',
    shadowColor: 'grey',
  
  },
});
