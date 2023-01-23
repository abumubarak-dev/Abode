import { RouteProp, useRoute } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"
import { FlashList } from "@shopify/flash-list"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Dimensions, View, ViewStyle } from "react-native"
import { ListingCard, Screen, SearchBar } from "../components"
import { Loader } from "../components/Loader"
import useFirestore from "../hooks/useFirestore"
import { AppStackParamList, AppStackScreenProps } from "../navigators"
import { spacing } from "../theme"
import { PROPERTY } from "../utils/firebase"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const PropertySearchScreen: FC<StackScreenProps<AppStackScreenProps, "PropertySearch">> =
  observer(function PropertySearchScreen() {
    const { queryDocuments, data, isLoading } = useFirestore()
    const route = useRoute<RouteProp<AppStackParamList, "PropertySearch">>()
    const params = route.params

    useEffect(() => {
      queryDocuments(PROPERTY, "city", params.keyword)
    }, [])

    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top"]}>
        <SearchBar keyword={params.keyword} />

        {isLoading && <Loader />}
        {data && !isLoading && (
          <View style={$listContainer}>
            <FlashList
              data={data}
              ItemSeparatorComponent={() => <View style={$separator} />}
              renderItem={({ item }) => <ListingCard key={item.id} item={item} />}
              estimatedItemSize={200}
            />
          </View>
        )}
      </Screen>
    )
  })

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: 10,
}

const $listContainer: ViewStyle = {
  height: Dimensions.get("screen").height,
}

const $separator: ViewStyle = {
  height: spacing.medium,
}
