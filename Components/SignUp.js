import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleTerms = () => {
    setTerms(!terms);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

const handleHaveAccount=()=>{
  navigation.navigate("Login");
}


  const handleSignUp = () => {
 
    if (name && email && password && terms) {
      saveUserData(name, email, password);
   
      
    } else {
      console.log("data not saved");
    }
  };

  const saveUserData = async (name, email, password) => {
    setIsLoading(true);
 
    fetch('https://petstore.codingsolution24.com/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(async(json) => {
        console.log("json", json);
       
        if(json.status){
          const token = json.access_token;

          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userName', name);
           navigation.navigate('Login');
        }
        else{
          alert("credentials not true");
        }
      
      }).finally(() => {
        setIsLoading(false); 
      });
      
  };
  return (
    <KeyboardAvoidingView>
    <ScrollView>
    <View style={styles.container}>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'center',
          margin: 10,
          marginTop:70,
          padding: 10,
        }}>
        <Text style={styles.firstText}>Create Account</Text>
        <Text style={styles.secondText}>
          Please fill in the form to continue
        </Text>
        <Image source={require('../Components/Images/logoFaded.png')} 
        style={{position:'absolute', right:-5,width:150, height:200}}></Image>
      </View>
      <View style={{flex: 0.4, justifyContent: 'center', margin: 10, marginTop:50}}>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/user.png')}  style={styles.icon} />
          <TextInput placeholder="Enter your full name" onChangeText={(text) => setName(text)} 
          value={name}/>
        </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/mail-icon.png')}  style={styles.icon} />
          <TextInput placeholder="Email or Phone numbers" onChangeText={(text) => setEmail(text)} 
          value={email}/>
        </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/lock-icon.png')}  style={styles.icon} />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)} 
            value={password}
          />
          <TouchableOpacity style={{right: 20, position: 'absolute'}}>
            {showPassword ? (
               <Image source={require('./Images/eye.png')}
                style={{marginLeft: 15}}
              />
            ) : (
              <Image source={require('./Images/eye-disable.png')}
                style={{marginLeft: 15}}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/lock-icon.png')}  style={styles.icon} />
          <TextInput placeholder="Confirm Password" />
        </View>
        <View style={styles.checkbox}>
          <TouchableOpacity onPress={toggleTerms} style={styles.checkbox}>
            {terms ? (
              <Image source={require('./Images/check.png')} 
                style={{marginLeft: 15}}
              />
            ) : (
              <Image
              source={require('./Images/re.png')} 
                
                tintColor="grey"
                style={{marginLeft: 15, width:20, height:20}}
              />
            )}
            <Text style={styles.label}>I agree to terms and conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{flex: 0.2, alignItems: 'center', justifyContent: 'flex-end', marginTop:120}}>
        <TouchableOpacity style={styles.pressable} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
      <View style={styles.wrap}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleHaveAccount}>
          <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle={'dark-content'}/>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e1c1',
    height: '100%',
    width: '100%',
  },
  firstText: {
    color: '#1D1A19',
    fontFamily: 'Source Sans Pro',
    fontSize: 32,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  secondText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 2,
    margin: 10,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
    margin: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  pressable: {
    width: 380,
    height: 56,
    borderRadius: 52,
    backgroundColor: ' rgba(106, 93, 123, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  wrap: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    marginBottom:20
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#E1b45F',
  },
});
