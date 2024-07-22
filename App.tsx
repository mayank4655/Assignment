import React, { useEffect, useRef, useState } from 'react';
import {ActivityIndicator,Dimensions, Image, Linking, SafeAreaView, StyleSheet, Text,TouchableOpacity,View,} from 'react-native';
import { Camera, useCameraDevices, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';
import Cardswipe from './components/Cardswipe';
import Cam from './components/Cam';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();
const {height,width} = Dimensions.get('window');
function App () {
  
  const [imagedata,setimagedata] = useState('');
  
  
  const takepicture = async () =>{
    if(camera != null){
      const photo = await camera.current.takePhoto();
      setimagedata(photo.path);
      
      console.log(photo);
      
    }
  };
  return (
    <NavigationContainer>
    <View style={{flex:1,backgroundColor: '#F5F0E6'}}>
        <Stack.Navigator>
          <Stack.Screen name="Camera" component={Cam} options={{title:'Camera',headerTitleAlign:'center'  }}/>
          <Stack.Screen name="Feed" component={Cardswipe} options={{headerTitleAlign:'center'}}/>
     </Stack.Navigator>
    </View>
     </NavigationContainer>
  );
}


{/* <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          {imagedata !=='' && (
            <Image source={{uri: 'file://'+imagedata}} style={{width:'90%',height:400}}
            ></Image>
          )}
            <TouchableOpacity
            style={{
              width:'90%',
              height:50,
              borderWidth:1,
              alignSelf:'center',
              borderRadius:10,
              alignItems:'center',
              justifyContent:'center'
            }} onPress={()=>{setTakePhotoclicked(true);}}>
              <Text>Click Photo</Text>
            </TouchableOpacity>
        </View> */}
export default App;
