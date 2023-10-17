import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';

import React, {useState, useEffect} from 'react';
import {GestureHandlerRootView, FlatList} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {
  const [categoryData, setCategoryData] = useState(null);
  const [petData, setPetData] = useState([]);
  const [userName, setUserName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  //to filter the data based on selection
  const [selectedCategory, setSelectedCategory] = useState('');

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedCategory(item.title)}>
        
              <View>
                <ImageBackground 
                  source={require('./Images/circle.png')}
                  style={styles.tabs}>
                
                  <Image source={{uri: item.image}} style={styles.pets} />
                </ImageBackground>
                <Text style={styles.petNames}>{item.title}</Text>
              </View>
    </TouchableOpacity>
  );

  const renderPetItem = ({ item }) => {
    console.log(selectedCategory);
    if ((selectedCategory === 'Cats' && item.category_id === '1') || (selectedCategory ==='Birds' && item.category_id ==='3') ||  (selectedCategory ==='Dogs' && item.category_id ==='2') ||  (selectedCategory ==='Bunnies' && item.category_id ==='4')) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
           
              <Image
                source={{uri: item.image}}
                style={{
                  shadowColor: 'grey',
                  marginTop: 10,
                  marginBottom:20,
                  width: 370,
                  height: 240,
                  borderRadius: 18,
                  alignSelf: 'center',
                }}
              />
              <View style={styles.description}>
                <Text
                  style={{
                    color: '#150C1A',
                    fontSize: 25,
                    fontWeight: '700',
                    fontFamily: 'Source Sans Pro',
                    lineHeight: 24,
                    margin: 20,
                  }}>
                  {item.name}
                </Text>
                <View style={{position: 'absolute', right: 10, marginTop: 15}}>
                  <ImageBackground
                    source={require('./Images/circle.png')}
                    style={{
                      height: 45,
                      width: 45,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('./Images/share.png')}
                      style={{height: 25, width: 25}}
                    />
                  </ImageBackground>
                </View>
                <View style={{flexDirection: 'row', alignContent: 'center'}}>
                  <Image
                    source={require('./Images/location.png')}
                    style={{marginLeft: 15, marginBottom: 20}}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Roboto',
                      marginLeft: 15,
                      marginBottom: 20,
                    }}>
                    {item.location}
                  </Text>
                </View>
              </View>
            
        </TouchableOpacity>
      );
    } else {
      // Skip rendering for items not in the selected category
      return null;
    }
  };

 


  useEffect(() => {
    
    const retrieveUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        const uri = await AsyncStorage.getItem('userImageURI');
        if (name) {
          setUserName(name);
        }

        if (uri) {
          setImageUri(uri);
        }

      } catch (error) {
        console.error('Error retrieving user name from AsyncStorage:', error);
      }
    };

    retrieveUserName();
  }, []);

  useEffect(() => {
    fetch('https://petstore.codingsolution24.com/api/pet/category')
      .then(response => response.json())
      .then(data => {
        if (data.status && data.data) {
          // Data has been successfully fetched.
          // Set the data in your component's state.
          console.log(data.data);
          setCategoryData(data.data);
        } else {
          // Handle any error conditions or data issues.
        }
      })
      .catch(error => {
        // Handle any network-related errors.
        console.error('Error fetching data:', error);
      });
  }, []);




  useEffect(() => {
    const fetchData = async()=>{
      const token = '91|U194Ov7AXuul4IOhUBAYFaKjZHldSM5klMezKleq';
        if (token) {
          const headers = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json; charset=UTF-8',
          };

          const response = await fetch(
            'https://petstore.codingsolution24.com/api/auth/pet',
            {
              method: 'GET',
              headers: headers,
            },
          )   
      .then(response => response.json())
      .then(data => {
        if (data.status && data.data) {
          // Set the data in your component's state
          setPetData(data.data);
         
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  }
  fetchData();
  }, []);




  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.bar}>
          <TouchableOpacity>
            <Image source={require('./Images/menu.png')} />
          </TouchableOpacity>
          <Text style={styles.profileText}>{userName}</Text>
          <TouchableOpacity>
            <ImageBackground
              source={require('./Images/Ellipse2.png')}
              resizeMode="contain"
              style={styles.ellipseBar}>
             { imageUri ? (
              <Image source={{uri: imageUri}} style={styles.catImage} />
            ) : (
              <Image
                source={require('./Images/cat.png')}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}></Image>
            )}
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.bar2}>
          <View style={styles.inputContainer}>
            <Image
              source={require('./Images/search.png')}
              style={styles.icon}
            />
            <TextInput placeholder="Search Pets to adopt" />
          </View>
          <ImageBackground
            source={require('./Images/circle.png')}
            style={styles.circle}>
            <Image
              source={require('./Images/filter.png')}
              style={{height: 30, width: 30, alignSelf: 'center'}}></Image>
          </ImageBackground>
        </View>

        <FlatList
          horizontal
          data={categoryData}
          keyExtractor={item => item.id.toString()}
          style={{marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom:20}}
          renderItem={renderCategoryItem}
        />

        <FlatList
          data={petData}
          keyExtractor={item => item.id.toString()}
          style={{marginTop:30}}
          
          renderItem={renderPetItem}
        />

        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}></StatusBar>
      </View>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e1c1',
    width: '100%',
    height: '100%',
  },
  bar: {
    // flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  profileText: {
    fontFamily: 'Source Sans Pro',
    color: '#150C1A',
    fontWeight: '700',
    fontSize: 20,
    // marginBottom: 10,
    marginLeft: 80,
  },
  ellipseBar: {
    width: 55,
    height: 55,  
    marginLeft:210,
    alignItems: 'center',
    justifyContent: 'center',
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
  },

  bar2: {
    // flex:0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
  },
  bar3: {
    flexDirection: 'row',
    // overflowX: 'scroll',
    //marginBottom: 60,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 30,
    padding: 2,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 12,
    width: 330,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    margin: 10,
  },
  circle: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginRight: 10,
  },

  tabs: {
    height: 60,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  pets: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  petNames: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '700',
    marginLeft: 40,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 55,
  },
  central: {
    // flex: 0.5,
    alignItems: 'center',

    backgroundColor: '#e8e1c1',
  },
  description: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 20,
    padding: 2,
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 12,
    marginTop: -80,
    width: 380,
    height: 100,
    backgroundColor: '#FFF',
    shadowColor: 'grey',
  },
});
