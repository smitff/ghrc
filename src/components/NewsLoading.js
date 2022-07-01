import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
const NewsLoading = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={{
           flexDirection:"row",
           marginTop:ResponsiveUtil.height(10)
        }}>
            <ShimmerPlaceholder style={{
                marginLeft: ResponsiveUtil.width(5),
                width: Dimensions.get('screen').width / 2, height: 150, borderRadius: 10
            }} />
            <ShimmerPlaceholder style={{
                marginLeft: ResponsiveUtil.width(5),
                width: Dimensions.get('screen').width / 2, height: 150, borderRadius: 10
            }} />
        </View>
    )
}

export default NewsLoading

const styles = StyleSheet.create({})
