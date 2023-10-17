import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const eyeOpenIcon = require('./Images/eye.png');
  const eyeCloseIcon = require('./Images/eye-disable.png');
  
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
   
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderPasswordToggleIcon = () => {
    return (
      <TouchableOpacity onPress={togglePasswordVisibility}>
        <Image
          source={showPassword ? eyeOpenIcon : eyeCloseIcon }
          style={{ width: 24, height: 24, position:'relative', left:250 }}
        />
      </TouchableOpacity>
    );
  };

  const forgotPassword = () => {
    navigation.navigate("Profile");
  };

  const handleLogin = () => {
   
    if (rememberMe) {
      saveUserData(email, password);
    }

    else{
      saveUserData(email, password);
    }


   
  };

  const handleSignUp = () => {
 
    navigation.navigate('SignUp');
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  
  const handlePasswordChange = (text) => {
    setPassword(text);
  };


const saveUserData = async (email, password) => {

  setIsLoading(true);
  fetch("https://petstore.codingsolution24.com/api/auth/login", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
      "email": email,
      "password": password
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        // "Authorization": "Bearer "+ token
    }
})
 
// Converting to JSON
.then(response => response.json())
 
// Displaying results to console
.then(async(json) => {
  console.log("json", json)
  if(json.status){
    const token = json.access_token;
    console.log(json.access_token);
    await AsyncStorage.setItem('userToken', token);

    navigation.navigate('Home');
  }
  else{
    alert("credentials not true");
  }

}).finally(() => {
  setIsLoading(false); 
});

};

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, justifyContent: 'flex-end', marginLeft: 15}}>
        <Text style={styles.firstText}>Hi, Welcome Back! 👋</Text>
        <Text style={styles.secondText}>Hello again, you’ve been missed! </Text>
      </View>
      <View style={{flex: 0.4, justifyContent: 'center'}}>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/mail-icon.png')}  style={styles.icon} />
          <TextInput placeholder="Email or Phone numbers"  onChangeText={handleEmailChange} value={email}/>
        </View>
        <View style={styles.inputContainer}>
        <Image source={require('./Images/lock-icon.png')}  style={styles.icon} />
        <TextInput
        secureTextEntry={!showPassword}
        placeholder="Password"
        onChangeText={handlePasswordChange}
        value={password}
      />
      {renderPasswordToggleIcon()}
        </View>
        <View style={styles.checkbox}>
          <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
            {rememberMe ? (
              <Image source={require('./Images/re.png')}  tintColor="grey"
                style={{marginLeft: 15, width:20, height:20}}
              />
            ) : (
              <Image
              source={require('./Images/check.png')} 
              
              style={{marginLeft: 15,}}
              />
            )}
            <Text style={styles.label}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={forgotPassword}>
            <Text
              style={{
                fontSize: 14,
                color: '#E1082F',
                fontFamily: 'Roboto',
                marginLeft: 150,
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 0.3, alignItems: 'center'}}>
        <TouchableOpacity onPress={handleLogin} style={styles.pressable}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </View>

      <View style={styles.wrap}>
        <Text style={styles.text}>Don’t have any account?</Text>
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpText}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      <StatusBar translucent={true} backgroundColor="transparent" barStyle={'dark-content'}/>
    </View>
  );
};

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
    margin: 20,
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
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'black',
  },
  signUpButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#E1b45F',
  },
});

export default LoginScreen;
