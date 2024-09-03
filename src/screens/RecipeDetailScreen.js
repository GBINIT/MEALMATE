import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { CachedImage } from '../../utils/index.js'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import axios, { Axios } from 'axios'
export default function RecipeDetailScreen(props) {
  const item = props.route.params;
  console.log(item);
  
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavourite, setIsFavourite] = useState(false)

  // effect to get the mealsdata 
  useEffect(() => {
    if (item?.idMeal) {
      getMealData(item.idMeal);
    }
  }, [item?.idMeal]);

  const getMealData = async (id) => {
  try {
    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

    if (res && res.data && res.data.meals && res.data.meals.length > 0) {
      setMeal(res.data.meals[0]);
    } else {
      console.error('No meal data found');
    }
  } catch (error) {
    console.error('Error fetching meal data:', error);
  } finally {
    setLoading(false);
  }
};

  // arrow function to get the instructions for meal 
  const getIngredient = (meal) => {

    if (!meal) return [];
    let index = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        index.push(i);
      }
    }
    return index;
  }
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}  
    >
      <StatusBar style="white"></StatusBar>
      {/* <Text>RecipeDetail</Text> */}
      {/* Recipe Image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(40),
            borderRadius :15,
            margin:heightPercentageToDP(5),
            resizeMode : "cover"
          }}
        >
        </CachedImage>

      </View>
      <Text>RecipeDetailScreen</Text>
    </ScrollView>
  )
}