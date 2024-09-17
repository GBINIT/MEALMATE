import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../../utils/index.js';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import Loading from '../component/Loading.js';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function RecipeDetailScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

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
      setIsLoading(false);
    }
  };

  const getIngredient = (meal) => {
    if (!meal) return [];
    let index = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        index.push(i);
      }
    }
    return index;
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 30,
      }}  
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(100),
            height: hp(40),
            borderRadius: 15,
            margin: hp(5),
            resizeMode: "cover"
          }}
        />
      </View>

      <View className="w-full absolute flex-row justify-between items-center pt-10">
        <TouchableOpacity 
          className="p-2 rounded-full bg-white ml-5"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3)} color="#f64e32" strokeWidth={5} />
        </TouchableOpacity>

        <TouchableOpacity 
          className="p-2 rounded-full bg-white mr-5"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon size={hp(3)} color={isFavourite ? "red" : "gray"} strokeWidth={5} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <>
          <View 
            className="px-4 flex justify-between space-y-4 bg-white mt-[-40]"
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              paddingTop: hp(4),
            }}
          >

            {/* Meal Name  */}
            <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)
            }
            className="px-4 space-y-2">
              <Text
                className="font-bold flex-1 text-neutral-700"
                style={{ fontSize: hp(3) }}
              >
                {meal?.strMeal}
              </Text>
              <Text
                className="font-medium flex-1 text-neutral-700"
                style={{ fontSize: hp(2.5) }}
              >
                {meal?.strArea}
              </Text>
            </Animated.View>
          </View>
          
          {/* Ingredients */}
          <Animated.View 
          entering={FadeInDown.delay(400)
            .duration(700)
            .springify()
            .damping(12)
          }
          className="space-y-4 px-8 py-4">
            <Text 
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2">
              {getIngredient(meal).map((i) => (
                <View className="flex-row space-x-2 items-center" key={i}>
                  <View 
                    className="rounded-full bg-[#f64e32]"
                    style={{
                      width: hp(1.5),
                      height: hp(1.5)
                    }}
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      className="font-medium text-neutral-800"
                      style={{ fontSize: hp(1.8) }}
                    >
                      {meal["strIngredient" + i]}
                    </Text>
                    <Text
                      className="font-extrabold text-neutral-700"
                      style={{ fontSize: hp(1.8) }}
                    >
                      {meal["strMeasure" + i]}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
          
          {/* instruction */}
          <Animated.View 
          entering={FadeInDown.delay(600)
            .duration(700)
            .springify()
            .damping(12)
          }
          className="px-8 py-4">
            <Text
              className="font-bold flex-1 text-neutral-700"
              style={{ fontSize: hp(2.5) }}
            >
              Instructions
            </Text>
            <Text
              className="text-neutral-700"
              style={{ fontSize: hp(1.8) }}
            >
              {meal?.strInstructions}
            </Text>
          </Animated.View>
        </>
      )}
    </ScrollView>
  );
}