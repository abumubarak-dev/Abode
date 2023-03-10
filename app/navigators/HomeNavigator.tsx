import { AntDesign, Ionicons } from "@expo/vector-icons"
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"

import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useUser from "../hooks/useUser"
import { InboxScreen, PaymentScreen, ProfileScreen, SearchScreen, WishlistScreen } from "../screens"
import { colors, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { navigate } from "./navigationUtilities"

export type HomeNavigatorParamList = {
  Search: undefined
  Inbox: undefined
  Wishlist: undefined
  Profile: undefined
  Payment: undefined
}

export type HomeTabScreenProps<T extends keyof HomeNavigatorParamList> = CompositeScreenProps<
  BottomTabScreenProps<HomeNavigatorParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<HomeNavigatorParamList>()

export const HomeNavigator = () => {
  const { bottom } = useSafeAreaInsets()
  const { displayName, email, uid } = useUser()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
        tabBarIconStyle: $tabIcon,
        tabBarStyle: {
          ...$tabBar,
          height: bottom + 64,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="message1"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: "Wish Lists",
          headerShown: true,

          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="hearto"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-receipt-outline"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            if (!uid) {
              navigate("Authentication")
            } else {
              navigate("Profile")

            }
          }
        }}
        options={{
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={22}
              color={focused ? colors.palette.primary50 : colors.gray50}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
const $tabBar: ViewStyle = {
  backgroundColor: colors.white,
  elevation: 0,
  borderTopColor: colors.lightgrey,
  borderTopWidth: 1,
}

const $tabBarItem: ViewStyle = {
  paddingTop: 10,
}

const $tabBarLabel: TextStyle = {
  fontSize: 9.8,
  fontFamily: typography.primary.normal,
  flex: 1,
  paddingTop: 8,
}
const $tabIcon: TextStyle = {
  color: colors.lightgrey,
}
