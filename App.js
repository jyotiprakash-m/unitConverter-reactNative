
/**
 * npm i react-native-tab-view
 * npm i @react-native-community/picker
 * npm i @react-native-picker/picker
 * npm i @expo/vector-icons
 * npm i expo-constants
 * npm i convert-units
 * npm i react-native-reanimated
 * npm i react-native-gesture-handler
 */

import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {TabView,TabBar} from 'react-native-tab-view'
import convert  from 'convert-units'
// import Constants from 'expo-constants'

const measure = convert().measures()
// console.log(measure)

const mainColor="#3642cc"
// Measure view function

const MeasureView = ({measure}) => <Text>{measure}</Text>


export default function App() {

  const [index,setIndex] = useState(0)

  const [routes] = useState(measure.map((m) => ({
    key:m,
    title:m
  })))

  // render scene funcyion

  const renderScene = ({route}) =>{
      return(
        <MeasureView measure={route.key} />
      )
  }

  

  // console.log(routes)
  return (
    <View style={styles.scene}>
      <Text style={styles.title}>Unit Converter</Text>
      <TabView
        navigationState={{index,routes}}
        renderScene = {renderScene}
        onIndexChange = {setIndex}
        initialLayout = {{
          width:Dimensions.get('window').width
        }}
        
        renderTabBar ={(props) => (
          <TabBar
            {...props}
            scrollEnabled
            tabStyle={{width:'auto'}}
            style={{backgroundColor:mainColor}}
            indicatorStyle ={{backgroundColor:'white'}}

          />
        )}
      >

      </TabView>
    </View>
  )
}

const styles = StyleSheet.create({
  scene:{
    flex:1,
    
  },
  title:{
    padding:15,
    fontWeight:'bold',
    color:mainColor,
    fontSize:20,
    textAlign:'center',
    textTransform:'uppercase'
  }
})