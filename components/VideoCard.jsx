import { View, Text,Image, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import {Video,ResizeMode } from 'expo-av'
import { createBookmark } from '../lib/appwrite';

const VideoCard = ({video:{$id,title,thumbnail,video,creator:{username,avatar}}}) => {
    const [play, setPlay] = useState(false)
    const handleBookmark = async () => {
        try {
            await createBookmark($id);
            Alert.alert("Success", "Video added to bookmarks!");
        } catch (error) {
            Alert.alert("Error", "Failed to add bookmark.");
        }
    };

  return (
    <View className=' items-center flex-col px-4 mb-14'>
        <View className='flex-row gap-3 items-start'>
            <View className=' justify-center items-center flex-row flex-1'>
                <View className='w-[46px] border-secondary h-[46px] rounded-lg border justify-center items-center p-0.5'>
                    <Image source={{uri: avatar}} className='w-full h-full rounded-lg'/>
                </View>
                <View className=' justify-center flex-1 ml-3 gap-y-1'>
                     <Text className='text-white font-psemibold text-sm' numberOfLines={1}>
                        {title}
                     </Text>
                     <Text className='text-xs font-pregular text-gray-100' numberOfLines={1}>{username}</Text>
                </View>
            </View>
            <View className=' pt-2'>
            <TouchableOpacity onPress={handleBookmark}>
                <Image source={icons.save} className='h-5 w-5' resizeMode='contain'/>
                </TouchableOpacity>
            </View>
        </View>

     {play ? <Video source={{uri:video}} className='w-full h-60 rounded-xl mt-3' resizeMode={ResizeMode.CONTAIN} useNativeControls shouldPlay onPlaybackStatusUpdate={(status)=>{if(status.didJustFinish){setPlay(false)}}}/>
      : <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center' activeOpacity={0.7} onPress={()=>setPlay(true)}>
           <Image source={{uri:thumbnail}} className=' w-full h-full rounded-xl mt-3' resizeMode='cover'/>
           <Image source={icons.play} className=' w-12 h-12 absolute' resizeMode='contain'/>
        </TouchableOpacity>}
      
    </View>
  )
}

export default VideoCard