import { observer } from "mobx-react-lite"
import * as React from "react"
import {
  ImageBackground,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle
} from "react-native"
import { navigate } from "../navigators"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface FeaturedImageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  image: ImageSourcePropType
  keyword: string
}

export const FeaturedImage = observer(function FeaturedImage(props: FeaturedImageProps) {
  const { image, keyword } = props
  const title = keyword.split(",")[0]
  return (
    <ImageBackground source={image} imageStyle={$imageContainerStyle} style={$containerStyle}>
      <Pressable onPress={() => navigate("PropertySearch", { keyword })}>
        <Text text={title} preset="subheading" style={$text} />
      </Pressable>
    </ImageBackground>
  )
})

const $imageContainerStyle: ImageStyle = {
  borderRadius: 5,
}
const $containerStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginRight: 5,
  flexBasis: "50%",
}

const $text: TextStyle = {
  paddingVertical: 100,
  color: colors.white,
  fontFamily: typography.primary.bold,
  letterSpacing: 0.9,
  fontSize: 21,
}
