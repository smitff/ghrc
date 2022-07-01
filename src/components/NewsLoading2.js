import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
const NewsLoading2 = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={{
           flexDirection:"row",
           marginTop:ResponsiveUtil.height(10)
        }}>
            <ShimmerPlaceholder style={{
                marginLeft: ResponsiveUtil.width(5),
                width: Dimensions.get('screen').width / 1.6, height: 160, borderRadius: 10
            }} />
            <ShimmerPlaceholder style={{
                marginLeft: ResponsiveUtil.width(5),
                width: Dimensions.get('screen').width / 1.6, height: 160, borderRadius: 10
            }} />
        </View>
    )
}

export default NewsLoading2

const styles = StyleSheet.create({})
