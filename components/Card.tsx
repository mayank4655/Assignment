import React from 'react'
import { Animated, Dimensions, Image, View } from 'react-native'
const {height,width} = Dimensions.get('window');

const Card = ({item,isFirst,swipe, ...rest})=> {
  return (
    <Animated.View
    style={[{
        width:width-20,
        height:height-250,
        alignSelf:'center',
        position:'absolute',
        top:40,
        borderRadius:10
    },
    isFirst && {transform: [...swipe.getTranslateTransform()]},
    ]} {...rest}>
        <Image source={item.image}
        style={{width:'100%',height:'100%',borderRadius:10}}
        />
    </Animated.View>
  )
}

export default Card
