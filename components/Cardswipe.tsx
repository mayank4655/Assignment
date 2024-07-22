import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from './Card';
// import { Image } from 'react-native-reanimated/lib/typescript/Animated';

const Cardswipe = (props,imagedata) => {
  const [data, setData] = useState([
    {image: require('../Assests/Black.png'), id: 1, title: 'Black'},
    {image: require('../Assests/Captain.png'), id: 1, title: 'Captain'},
    {image: require('../Assests/Dead.png'), id: 1, title: 'Dead'},
    {image: require('../Assests/Thor.png'), id: 1, title: 'Thor'},
    
  ]);

  useEffect(() => {
    if (!data.length) {
      setData(imagedata);
    }
  }, [data]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      console.log('released:' + 'dx:' + dx + 'dy:' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 100;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 500,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          // friction: 5
        }).start();
      }
    },
  });

  const removeCard = useCallback(() => {
    setData(prepState => prepState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);
  return (
    <>
      <View style={{flex: 1}}>
        {data
          .map((item, index) => {
            let isFirst = index === 0;
            let dragHandler = isFirst ? panResponser.panHandlers : {};
            return (
              <Card
                item={item}
                isFirst={isFirst}
                swipe={swipe}
                {...dragHandler}
              />
            );
          })
          .reverse()}
      </View>
      <View style={{flex:1}}>
      <TouchableOpacity
        style={{
            // flex:1,
          width: 100,
          height: 35,
          borderRadius: 20,
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
        }} onPress={()=> props.navigation.navigate("Camera")}>
        <Text
          style={{
            flex: 1,
            textAlignVertical:'center',
            textAlign:'center',
            color: 'white',
            fontSize:19 
          }}>
          Camera
        </Text>
      </TouchableOpacity>
      </View>
    </>
  );
};

export default Cardswipe;
