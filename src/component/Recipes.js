import { View, Text } from 'react-native'
import React from 'react'
import RecipesCard from './RecipesCard'
import { useNavigation } from '@react-navigation/native'
import {heightPercentageToDP} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';
import Animated , {FadeIn, FadeInDown, FadeOut} from 'react-native-reanimated'
export default function Recipes({meals , categories , idMeal}) {
  
  const navigation = useNavigation();
  return (
    <Animated.View 
    className = "mx-4 space-y-4"
    // entering={FadeInDown.delay(200)
    //   .duration(700)
    //   .springify()
    //   .damping()
    // }
    >
     <Text className = "font-semibold text-netural-600" 
     style = {{
      fontSize : heightPercentageToDP(2),
     }}
     >
      {meals.length} Recipes
     </Text>
     <Animated.View
    //  entering={FadeInDown.delay(200)
    //   .duration(700)
    //   .springify()
    //   .damping()
    // }
     >
     {categories.length == 0 || meals.length == 0 ? 
     (<Loading size = "large " className = "mt-20"> </Loading>) :
     (
      <MasonryList 
       data={meals}
       keyExtractor={(item) => {item.idMeal}}
       numColumns={2}
       showsVerticalScrollIndicator={false}
       renderItem={({item , i}) => (
        <RecipesCard item={item} index={i} navigation={navigation} idMeal = {idMeal} /> 
       )}
       onEndReachedThreshold={0.1}
      /> 
     )
     }
      </Animated.View>
    </Animated.View>
  )
}