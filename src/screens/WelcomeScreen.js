import { View, Text, Image ,TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'

// Importing essential library
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import Animated from 'react-native-reanimated'

export default function WelcomeScreen() {
  const animation = useRef(null);
  const navigation = useNavigation();
  return (
    <View className = "bg-[#f64e32] flex-1 justify-center items-center space-y-10 relative ">
      <Image 
      source = {require("../../assets/images/background.png")}
      style = {{
        position : "absolute",
        width : wp(190),
        height : wp(190),
        resizeMode : "cover",
      }}
       />
   
   {/* logo and animation using the lottie file */}
       <View >
       <LottieView className = ""
       autoPlay 
       ref={animation}
       style = {  {
        width : wp(80),
        height : hp(40),
        
       } }
       source={require("../../assets/lottie/logo.json")}
       />
       </View>

  {/* Title and sub heading */}
   <View className = "flex item-center space-y-2 bottom-10">
       <Text className = "text-white font-extrabold tracking-widest "
       style = {{fontSize : hp(5)}}>
        Meal Mate
       </Text>

       <Text className = " font-medium text-white item-center flex tracking-widest"
       style = {{
        fontSize : hp(2.5)
       }}> 
        Your Mate to Foods
       </Text>
   </View>

   {/* Toucable button */}
   <View>
    <TouchableOpacity 
    style = {{
      backgroundColor : "white",
      paddingVertical : hp(2),
      paddingHorizontal : hp(5),
      borderRadius : hp(2)
    }}
    onPress={ () => navigation.navigate("Home")}
    >
      <Text 
      style = {{
        color:"orange",
        fontSize : hp(2.5),
        fontWeight : "bold"
      }}
      >Get Started 

     {/* <LottieView  
       autoPlay 
      ref={animation} 
      style = {{
          width : wp(1),
          height : hp(1),
          top : hp(5)
      }} 
      source={require("../../assets/lottie/arrow-anima.json")}/> */}
        
        </Text>
    </TouchableOpacity>
   </View>
    </View>
)}





 