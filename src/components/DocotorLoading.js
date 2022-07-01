import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { ResponsiveUtil } from '../utils/ResponsiveUtils';
const DocotorLoading = () => {
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    return (
        <View style={{
           marginTop:ResponsiveUtil.height(10)
        }}>
            <ShimmerPlaceholder style={{
                marginTop: ResponsiveUtil.width(5),
                width: Dimensions.get('screen').width, height: 100, borderRadius: 10
            }} />
            <ShimmerPlaceholder style={{
                marginTop: ResponsiveUtil.width(5),
                width: Dimensions.get('screen').width, height: 100, borderRadius: 10
            }} />
        </View>
    )
}

export default DocotorLoading

const styles = StyleSheet.create({})
