import React, { useEffect, useRef, useState } from 'react';
import {ActivityIndicator,Dimensions, Image, Linking, SafeAreaView, StyleSheet, Text,TouchableOpacity,View,} from 'react-native';
import { Camera, useCameraDevices, useCameraPermission, useCameraDevice } from 'react-native-vision-camera';

const {height,width} = Dimensions.get('window');

function Cam(props){
    const camera = useRef(null);
    const device = useCameraDevice("front");
    const [imagedata,setimagedata] = useState('');
    const [takephotoclicked,setTakePhotoclicked] = useState(true);
    useEffect(()=>{
      async function getPermission(){
        const permission = await Camera.requestCameraPermission();
        console.log((`Camera permission status: ${permission}`));
        if(permission === 'denied') await Linking.openSettings();
      }
      getPermission();
    },[]);
    
   if (device === null){ return <Text> Camera not available </Text>;}
  
   const takepicture = async () =>{
    if(camera != null){
      const photo = await camera.current.takePhoto();
      setimagedata(photo.path);
      setTakePhotoclicked(false);
      console.log(photo);
  
    }
   };
   return(
    <View style={{flex:1,alignItems:'center',top:43}}>
      <Camera
        ref={camera}
        style={{width:width-50,height:height-280,borderRadius:50}}
        device={device} 
        isActive={true} 
        photo={true}
         />
         <TouchableOpacity 
         style={{
           width:70,
           height:70,
           borderRadius:100,
           borderWidth:5,
           borderColor:'white',
           opacity:20,
           position:'absolute',
           bottom:250,
           alignSelf:'center'
         }}
         onPress={()=>{takepicture()}}
         ></TouchableOpacity>
         <View style={{flex:1}}>
      <TouchableOpacity
        style={{
            // flex:1,
          width: 100,
          height: 35,
          borderRadius: 20,
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
        }} onPress={()=> props.navigation.navigate("Feed")}>
        <Text
          style={{
            flex: 1,
            textAlignVertical:'center',
            textAlign:'center',
            color: 'white',
            fontSize:19 
          }}>
          Feed
        </Text>
      </TouchableOpacity>
      </View>
      </View>
   );
}

export default Cam;