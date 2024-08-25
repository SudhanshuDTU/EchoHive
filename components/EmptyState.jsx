import { images } from "../constants";
import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import {router} from 'expo-router'

const EmptyState = ({ title, subTitle }) => {
  return (
    <View className=" justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center mt-2 font-psemibold text-white">{title}</Text>
      <Text className=" font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <CustomButton title="Create video" handlePress={()=> router.push('/create') } containerStyle="w-full my-5"/>
    </View>
  );
};

export default EmptyState;
