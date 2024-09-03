import { View, Text, Touchable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constant'
import { ScrollView } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function Categories({activeCategory, handleChangeCategory , categories}) {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="space-x-5"
                contentContainerStyle={{
                    paddingHorizontal: 12,
                }}
            >
                {categories.map((category, index) => {
                    let isActive = category.strCategory == activeCategory
                    let activeButtonClass = isActive ? "bg-[#f64e32]" : "bg-black/10"
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={()=> handleChangeCategory(category.strCategory)}
                            className="flex items-center space-y-1 "
                        >
                            <View className = {"rounded-xl p-[6px] " + activeButtonClass}>
                                <Image
                                    source={{ uri: category.strCategoryThumb }}
                                    style={{
                                        width: hp(7),
                                        height: hp(7),
                                    }}

                                    className="rounded-full flex items-center"
                                >

                                </Image>
                            </View>
                            <Text className = "text-neutral-900" style = {{ fontSize : hp(1.8)}}>{category.strCategory}</Text>

                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
            
        </View>
)}