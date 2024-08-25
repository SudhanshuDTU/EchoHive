import React, { useEffect, useState } from "react";
import { View, FlatList, Text, ScrollView, RefreshControl,Alert } from "react-native";
import { getBookmarkedVideos } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import {SafeAreaView} from 'react-native-safe-area-context'
import useAppwrite from "../../lib/useAppWrite";

const Bookmark = () => {
  const {data:videos,refetch} = useAppwrite(getBookmarkedVideos);
 
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  };

  return (
    <SafeAreaView className=" bg-primary h-full px-4 ">
      
      <Text className="text-2xl text-white font-psemibold my-4">Bookmarks</Text>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListEmptyComponent={() => (
          <Text className="text-white">No Bookmarked Videos</Text>
        )}
        
        className=' mt-10'
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}

      />

     
    </SafeAreaView>
  );
};

export default Bookmark;
