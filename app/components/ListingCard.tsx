import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "../theme"
import { Card } from "./Card"
import { ListingAmentiesTag } from "./ListingAmentiesTag"
import { Text } from "./Text"

export interface ListingCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>,
  item: any
}

const RADIUS = 10

export const ListingCard = observer(function ListingCard(props: ListingCardProps) {
  const { item } = props
  const data = item
  console.log("item")

  return (
    <Card
      preset="default"
      verticalAlignment="space-between"
      style={$container}
      HeadingComponent={<Image source={{ uri: data.remoteImages[0] }} style={$cardImage} />}
      ContentComponent={
        <View style={$contentContainer}>
          <Text
            style={$labelHeading}
            text={data.name}
            numberOfLines={1}
          />

          <Text
            style={$labelSubHeading}
            text={data.address}
            numberOfLines={1}
          />

          <View style={$tagContainer}>
            <ListingAmentiesTag
              label={`${data.avaliableBedroom} Bed`}
              icon={<Ionicons name="ios-bed" size={16} color={colors.gray100} />}
            />

            <ListingAmentiesTag
              label={`${data.avaliableBathroom} Bath`}
              icon={<MaterialCommunityIcons name="bathtub-outline" size={16} color={colors.gray100} />}
            />

            <ListingAmentiesTag
              label={`${data.propertySize} sqft`}
              icon={<MaterialCommunityIcons name="set-square" size={16} color={colors.gray100} />}
            />
          </View>

          <View style={$priceContainer}>
            <Text text={`$${data.cost}`} style={$priceLabel} />
            <Text style={$pricePer} text=" / year" />
          </View>
        </View>
      }
    />
  )
})

const $container: ViewStyle = {
  padding: 0,
  borderRadius: RADIUS,
  borderWidth: 0,
}

const $cardImage: ImageStyle = {
  height: 180,
  width: "100%",
  borderTopLeftRadius: RADIUS,
  borderTopRightRadius: RADIUS,
}

const $contentContainer: ViewStyle = {
  paddingHorizontal: 9,
  paddingTop: 10,
}

const $labelHeading: TextStyle = {
  fontSize: 13,
  fontFamily: typography.primary.semiBold,
}

const $labelSubHeading: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  opacity: 0.5,
}

const $tagContainer: TextStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 2,
  paddingRight: 10,
}

const $priceContainer: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 3,
}

const $priceLabel: TextStyle = {
  color: colors.palette.primary200,
  fontSize: 14,
  fontFamily: typography.primary.semiBold,
}

const $pricePer: TextStyle = {
  fontSize: 9,
  color: colors.gray,
  fontFamily: typography.primary.medium,
}
