import { StyleSheet, Text, TouchableOpacity, View,Image,FlatList } from 'react-native'
import React from 'react'
import useAppwrite from '../../lib/useAppWrite';
import { getUserPosts, signOut } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/globalProvider';

import {router} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCard from "../../components/VideoCard";
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import EmptyState from '../../components/EmptyState';

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const logout =async ()=>{
    await signOut()
    setUser(null)
    setIsLogged(false)
    router.replace('/sign-in')
    
  }
  return (
    <SafeAreaView className=" bg-primary h-full">
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <VideoCard video={item}/>
      )}
      ListHeaderComponent={() => (
        <View className='w-full flex justify-center items-center mt-6 mb-12 px-4'>
          <Text className=' font-pbold text-rose-700 text-center justify-center'>Made with ❤ by Sudhanshu Jha</Text>
           <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
            <Image source={icons.logout} resizeMode='contain' className='w-6 h-6'/>
           </TouchableOpacity>
           <View className='w-16 h-16 border border-rose-900 rounded-lg justify-center items-center'>
               <Image source={{uri:user?.avatar}} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover'/>
           </View>
           {/* infobox */}
           <InfoBox title={user?.username} containerStyle='mt-5' titleStyle='text-lg'/>
           <View className=' mt-5 flex-row'>
           <InfoBox title={posts.length || 0} subtitle={"Posts"} containerStyle='justify-center items-center' titleStyle='text-xl'/>
          
           </View>

        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subTitle="No videos found for this search query"
        />
      )}

    />
  </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})