import { View, Text } from 'react-native'
import React from 'react'
import RecipesCard from './RecipesCard'
import { useNavigation } from '@react-navigation/native'
import {heightPercentageToDP} from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import Loading from './Loading';

export default function Recipes({meals , categories}) {
  
  const navigation = useNavigation();
  return (
    <View className = "mx-4 space-y-4">
     <Text className = "font-semibold text-netural-600" 
     style = {{
      fontSize : heightPercentageToDP(2),
     }}
     >
      {meals.length} Recipes
     </Text>

     {categories.length == 0 || meals.length == 0 ? 
     (<Loading size = "large " className = "mt-20"> </Loading>) :
     (
      <MasonryList 
       data={meals}
       keyExtractor={(item) => {item.idMeal}}
       numColumns={2}
       showsVerticalScrollIndicator={false}
       renderItem={({item , i}) => (
        <RecipesCard item={item} index={i} navigation={navigation} /> 
       )}
       onEndReachedThreshold={0.1}
      /> 
     )
     }
      
    </View>
  )
}