
/**
 * npm i react-native-tab-view
 * npm i @react-native-community/picker
 * npm i @react-native-picker/picker
 * npm i @expo/vector-icons
 * npm i expo-constants
 * npm i convert-units
 * npm i react-native-reanimated
 * npm i react-native-gesture-handler
 * npm i expo-font
 */

import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions,TextInput,Image } from 'react-native'
import {TabView,TabBar} from 'react-native-tab-view'
import convert  from 'convert-units'
import {Picker} from '@react-native-picker/picker'

// import {SimpleLineIconns} from '@expo/vector-icons'
const measure = convert().measures()
// console.log(measure)

const mainColor="#3642cc"
// Measure view function

const MeasureView = ({measure,value,setValue}) => {

  const units = convert().possibilities(measure)

  const [formUnit,setFormUnit] = useState(units[0])
  const [toUnit,setToUnit] = useState(units[1])

  const [valueConverted,setValeConverted] = useState(0)


  useEffect(()=>{
    setValeConverted(convert(+value).from(formUnit).to(toUnit).toFixed(2))

  },[value,formUnit,toUnit])

  return(
    <View style={styles.scene}>
        <View style={styles.row}>
          <Picker style={styles.column} selectedValue = {formUnit} onValueChange={setFormUnit}>
              {units.map((unit,index) => (
                <Picker.Item label={unit} value={unit} key ={index} />
              ) )}
          </Picker>
          <View style={styles.column}>
                <TextInput 
                  value={value} 
                  onChangeText={setValue}
                  keyboardType='numeric'
                  style={styles.input}
                
                />
          </View>
        </View>
        <View style={styles.imageContainer}>
        <Image
          source={require('./down-arrow.png')}
          style={styles.image}
        />
        </View>
        
        <View style={styles.row}>
          <Picker style={styles.column} selectedValue = {toUnit} onValueChange={setToUnit}>
              {units.map((unit,index) => (
                <Picker.Item label={unit} value={unit} key ={index} />
              ) )}
          </Picker>
          <View style={styles.column}>
                <Text style = {[styles.input,{fontSize:35,fontWeight:'bold',height:100}]}>{valueConverted} {''}</Text>
          </View>
        </View>
    </View>
    
  )
}


export default function App() {

  const [index,setIndex] = useState(0)

  const [routes] = useState(measure.map((m) => ({
    key:m,
    title:m
  })))

  // render scene funcyion
  const [value,setValue] = useState('0')


  const renderScene = ({route}) =>{
      return(
        <MeasureView measure={route.key} value={value} setValue={setValue} />
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
  },
  row:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  },
  column:{
    flex:1,
    marginLeft:10,
    marginRight:10,
  },
  input:{
    height:60,
    fontSize:25,
    borderColor:mainColor,
    borderBottomWidth:1,
    alignItems:'center'
  },
  imageContainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'

  },
  image:{
    width:40,
    height:40
  }
})