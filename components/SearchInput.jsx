import { View, Text, TextInput, TouchableOpacity,Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'
import {usePathname,router} from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')
  return (
      <View className=' flex-row  items-center border-2 border-red-900  w-full px-4 bg-blue-400 h-16 rounded-2xl focus:border-secondary   space-x-4'>
        <TextInput className='flex-1 text-black mt-1 font-pregular text-base' value={query} onChangeText={(e)=> setQuery(e)} onSubmitEditing={()=>{
            if(!query){
                return Alert.alert('Missing query',"Please input something to search results across database")
            }
            if(pathname.startsWith('/search')){
                router.setParams({query})
            }else{
                router.push(`/search/${query}`)
            }
        }} placeholder={"Search for a video topic"} placeholderTextColor={'black'}  />
        <TouchableOpacity onPress={()=>{
            if(!query){
                return Alert.alert('Missing query',"Please input something to search results across database")
            }
            if(pathname.startsWith('/search')){
                router.setParams({query})
            }else{
                router.push(`/search/${query}`)
            }
        }}>
            <Image source={icons.search} className='w-5 h-5' resizeMode='contain'/>
        </TouchableOpacity>
      </View>
   
  )
}

export default SearchInput