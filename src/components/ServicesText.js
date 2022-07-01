import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'

const ServicesText = ({text,style}) => {
    return (
        
            <Text style={[{
                marginTop: ResponsiveUtil.height(8),
                fontFamily: "Nunito-Regular",
                fontSize: ResponsiveUtil.font(16),
                alignItems:"center"
            },style]}>{text}</Text>
        
    )
}

export default ServicesText

const styles = StyleSheet.create({})
