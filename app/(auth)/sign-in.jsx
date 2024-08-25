import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/globalProvider";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill up all the fields");
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      // set it to global state
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      router.replace("/home"); 
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView>
        <View className="min-h-[80vh] w-full justify-center px-4 my-6">
          <Image
            source={images.echohive}
            resizeMode="cover"
            className="w-[115px] h-[135px]"
          />
          <Text className="text-2xl text-white text-semibold mt-5 font-psemibold">
            Log In to EchoHive
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles={"mt-7"}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles={"mt-7"}
          />
          <CustomButton
            title={"Sign In"}
            handlePress={submit}
            containerStyle={"mt-7"}
            isLoading={isSubmitting}
          />
          <View className=" flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an Account?
            </Text>
            <Link
              href={"/sign-up"}
              className=" text-lg font-pregular text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
