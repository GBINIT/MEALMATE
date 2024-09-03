import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View className = "flex-1 justify-center items-center mt-20">
        <ActivityIndicator size={'large'}></ActivityIndicator>
      
    </View>
  )
}