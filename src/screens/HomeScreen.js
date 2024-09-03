import { View, Text, SafeAreaView, ScrollView, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { StatusBar } from 'expo-status-bar'
import Categories from '../component/Categories'
import axios from 'axios'
import Recipes from '../component/Recipes'

export default function HomeScreen() {
  const [activeCategory , setActiveCategory] = useState("Beef")
  const [categories , setCategories] = useState([])
  const [meals ,setMeals] = useState([])
const mealId=45;
  useEffect (()=>{
    getCategories();
    getRecipes();
  },[])
  
  const handleChangeCategory = (category)=> {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const getCategories = async() => {
    try {
      const res =  await axios.get( "https://www.themealdb.com/api/json/v1/1/categories.php")
      if(res && res.data){
        setCategories(res.data.categories)
        // console.log(res.data.categories);
        
      }
    } catch (error) {
      console.log("error");
      
    }
  }

  const getRecipes = async(category = "vegan") => {
    try {
      const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      if(res && res.data){
        setMeals(res.data.meals)
        // console.log(res.data.meals);
        
      }
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar style='dark' />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          className="pt-14 space-y-6">

          {/* Avatar and bell icons */}
          <View className="mx-4 flex-row justify-between items-center">
            <AdjustmentsHorizontalIcon size={hp(4)} color={"gray"} />
            <Image
              source={require("../../assets/images/Avatar.png")}
              className="rounded-full"
              style={{
                width: hp(5),
                height: hp(5),
                resizeMode: "contain",
              }} />
          </View>

          {/* Headline*/}
          <View className="mx-4 space-y-1 mb-2 top-5">
            <View>
              <Text style={{
                fontSize: hp(3.5),
              }}
                className="font-bold text-neutral-800">Fast & delicious</Text>
            </View>
            <View>
              <Text style={{
                fontSize: hp(3.5),
              }}
                className="font-extrabold text-neutral-900">Food You <Text className="text-[#f64e32]">LOVE</Text> </Text>
            </View>
          </View>
          
          {/* Search Bar*/}
          <View className="mx-4 flex-row items-center border rounded-2xl justify-between border-[black] bg-[#f5f3f1]">
            <View>
              <TextInput placeholder=" Search recipes" placeholderTextColor={"black"} className=" flex-1 mb-1 p-3.5 "></TextInput>
            </View>
            <View className="rounded-full p-2 bg-white mx-3 " >
              <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} strokeWidth={1.5} width={33} height={33} className="" />
            </View>
          </View>

          {/* Categories */}
          <View>
            <Categories 
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
            ></Categories>
          </View>

          {/* Recipes */}
          <View>
            <Recipes meals={meals} categories={categories} idMeal = {mealId}>
              
            </Recipes> 
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  )
}