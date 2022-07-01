import React, { useState, useEffect } from 'react'
import { FlatList, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Pressable,Dimensions } from 'react-native'
import { ColorUtil } from '../utils/ColourUtils'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ResponsiveUtil } from '../utils/ResponsiveUtils'
import axios from 'axios'
import { ApiUtils, ImageService } from '../utils/ApiUtils'
const NewsScreen = ({navigation}) => {
    const [healthtipsdata, sethealthtipsdata] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        getdata()

    }, [])
    const getdata = async () => {
        setloading(true)
        await axios.get(ApiUtils.NewsAll).then(data => {
            const maindata = data.data;
            console.log(maindata)
            setloading(false)
            sethealthtipsdata(maindata.data)

        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <View style={styles.container}>
                <View style={{
                    position: 'absolute',
                    top: 10,
                    left: 0,
                    zIndex: 1,
                    flexDirection:"row",
                    alignItems:"center"
                    // backgroundColor:ColorUtil.Gray
                }}>
                    <AntDesign
                        onPress={() => {
                            navigation.goBack()
                        }} name="left" color={ColorUtil.Purple} size={25} />
                           <Text style={[styles.cardttiletext, { 
                               fontSize:ResponsiveUtil.font(20) ,
                               marginLeft:ResponsiveUtil.width(20)
                        }]} numberOfLines={1}>News</Text>
                              
                </View>
    
              {
                  loading ? <ActivityIndicator style={{marginTop:ResponsiveUtil.height(30)}} color={ColorUtil.Purple} size={25}  />
              :   
              <FlatList
              style={{ 
                  marginTop: ResponsiveUtil.width(60),
                  paddingHorizontal:ResponsiveUtil.width(10)
             }}
              showsVerticalScrollIndicator={false}
              data={healthtipsdata}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              numColumns={2}
              ItemSeparatorComponent={() => (
                  <View style={{ height: 0 }} />
              )}
              renderItem={({ item, index }) => {
                  return (
                      <Pressable
                      onPress={() => {
                        navigation.navigate('NewsDetailScreen', { id: index })
                    }}
                          style={{
                              width: ((Dimensions.get('screen').width) / 2) - 20,
                              backgroundColor: ColorUtil.white,
                              borderRadius: 10,
                              overflow: "hidden",
                              elevation: 3,
                              margin: ResponsiveUtil.width(5),
                              marginBottom: ResponsiveUtil.height(8),
                              // flexDirection: 'row'

                          }}
                          key={index}>
                          <Image style={{
                              height: ResponsiveUtil.height(100),
                              width: Dimensions.get('screen').width / 2 - 20,
                              alignSelf: "center"
                          }}
                              source={{
                                  uri: `${ImageService.news}${item.Image}`
                              }} />
                          <View style={{
                              paddingHorizontal: ResponsiveUtil.width(10),
                              paddingBottom: ResponsiveUtil.height(5),
                              justifyContent: "space-between",
                              flexDirection: "row",
                              flex: 1
                          }}>
                              <View>
                                  <Text style={[styles.cardttiletext, { marginTop: ResponsiveUtil.height(5) }]} numberOfLines={2}>{item.Title}</Text>
                                  {/* <Text style={[styles.carddestext, { marginTop: ResponsiveUtil.height(5) }]} numberOfLines={1}>{item.Description}</Text> */}
                              </View>
                              {/* <View style={{ alignSelf: "center" }}>
                              <AntDesign name="right" size={25} color={ColorUtil.black} />
                          </View> */}
                          </View>


                      </Pressable>
                  )
              }}

          />
              }
            </View>
    )
}

export default NewsScreen

const styles = StyleSheet.create({
    cardttiletext: {
        fontFamily: "Nunito-ExtraBold",
        fontSize: ResponsiveUtil.font(14),
        color: '#555'
    },
    carddestext: {
        fontFamily: "Nunito-Regular",
        fontSize: ResponsiveUtil.font(12),
        color: '#555'
    }
})