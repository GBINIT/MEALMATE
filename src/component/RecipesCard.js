import { View, Text, Pressable , Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { LinearGradient } from 'expo-linear-gradient'

export default function RecipesCard({index , navigation , item}) {
  
  if (!item) {
    return null; // or return a placeholder component
  }
  
  let isEven = index%2 ==0
  return (
    <View>
      <Pressable 
       style = {{
        width : "100%",
        paddingRight : isEven ? 8 : 0,
        borderRadius: 20,
        overflow:"hidden",
       }}
       className = "flex justify-center mb-4 space-y-1"
       onPress={ () => navigation.navigate("RecipeDetail", {...item})}
      >
      
       <Image 
       source={{
        uri :item.strMealThumb,
       }}

       style = {{
        width : "100%",
        height : index % 3 == 0 ? heightPercentageToDP(25) : heightPercentageToDP(35),
        borderRadius : 35,
       }}
       className = " relative "
       >
        </Image> 

        <LinearGradient 
        colors={["transparent" , "#000000"]}
        style = {{
          position : "absolute",
          bottom : 0,
          width : "100%",
          height : heightPercentageToDP(20),
          borderBottomLeftRadius :35,
          borderBottomRightRadius :35
          
          }}
          start={{x : 0.5 , y : 0}}
          end={{x:0.5 , y : 1}}
        />

        <Text
       style = {{
        fontSize : heightPercentageToDP(2.3)
       }}

       className = "font-semibold ml-2 absolute text-white bottom-7 left-2 max-w-[80%]"
        >
          {
            item.strMeal.length >  20 ? item.strMeal.slice(0,20) + "..." : item.strMeal
          }
        </Text>
      </Pressable>
    </View>
  )
}