import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const FormField = ({title,value,placeholder,handleChangeText,otherStyles,...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-gray-100 font-pmedium'>{title}</Text>
      <View className='border-2 border-red-900 flex-row w-full px-4 bg-blue-400 h-16 rounded-2xl focus:border-secondary items-center '>
        <TextInput className='flex-1 text-white font-psemibold mt-2 text-base' value={value} onChangeText={handleChangeText} placeholder={placeholder} placeholderTextColor={'black'} secureTextEntry={title === 'Password' && !showPassword}/>
        {title === "Password" && (<TouchableOpacity onPress={()=>{setshowPassword(!showPassword)}}>
          <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6' resizeMode='contain'/>
        </TouchableOpacity>)}
      </View>
    </View>
  )
}

export default FormField