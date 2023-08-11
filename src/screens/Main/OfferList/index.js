import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatusBar from '../../../components/StatusBar';
import styles from './style';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader';
import axios from "axios";
import { RadioButton } from "react-native-paper";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";

const OfferList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(false)
  const [template, setTemplate] = useState('')
  const [description, setDescription] = useState('')
  const selector = useSelector(state => state.Offer.OfferListData)
  const selector2 = useSelector(state => state)
  const isFetching = useSelector(state => state.Offer.isFetching)
const[temp,setTemp]=useState()
 

  const addTemp = async (item) => {
    const Token = await AsyncStorage.getItem('loginToken')
    const user_id = await AsyncStorage.getItem('user_id')
    if (template == '') {
      Toast.show('Please enter template name')
    }
    else if (description == '') {
      Toast.show('Please enter description name')
    }
    else {
      try {
        setFetching(true)
        const data = new FormData()
        data.append('offertemplate', template)
        data.append('templatedescription', description)
        const response = await axios({
          method: 'POST',
          data: data,
          headers: {
            'content-type': 'multipart/form-data',
            "Olocker": `Bearer ${Token}`,
          },
          url: 'https://olocker.co/api/supplier//addOfferTemplate',
        });
        if (response.data.status == 'success') {
          setFetching(false)
          Toast.show(response.data.msg)
          dispatch({
            type: 'Template_Detail_Request',
            url: '/getOfferTemplate',
            userid: user_id
          })
        } else {
          setFetching(false);
          Toast.show(response.data.msg)
        }
      } catch (error) {
        setFetching(false)
        console.log('this isi error', error);
      }
    }
  };

  const removeTemp = async (item) => {
    const Token = await AsyncStorage.getItem('loginToken')
    const user_id = await AsyncStorage.getItem('user_id')
    try {
      setFetching(true)
      // const data= new FormData()
      // data.append('userid',template)
      // data.append('id',description)
      const data = {
        userid: user_id,
        id: item.Id
      }
      const response = await axios({
        method: 'GET',
        params: data,
        headers: {
          'content-type': 'multipart/form-data',
          "Olocker": `Bearer ${Token}`,
        },
        url: 'https://olocker.co/api/supplier//deleteOfferTemplate',
      });
      if (response.data.status == 'success') {
        setFetching(false)
        Toast.show(response.data.msg)
        dispatch({
          type: 'Template_Detail_Request',
          url: '/getOfferTemplate',
          userid: user_id
        })
      } else {
        setFetching(false);
        Toast.show(response.data.msg)
        console.log('thissi is rresponseelse');
      }
    } catch (error) {
      setFetching(false)
      console.log('this isi error', error);
    }
  };

  const handleAddOffer = async () => {
    const user_id = await AsyncStorage.getItem('user_id')
    dispatch({
      type: 'Add_Offer_Request',
      url: '/getOfferTemplate',
      userid: user_id,
      navigation
    })
  }

  useEffect(()=>{
    tempdata()
  },[])

 const tempdata =()=>{
  const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://olocker.co/api/supplier//getOfferList?start=0&length=9&search=&userid=10',
  headers: { 
    'Olocker': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTdXBwbGllciBsb2dpbiBKV1QiLCJpYXQiOjE2ODM4MDYwMjMsImV4cCI6MTcxNTM0MjAyMywiZW1haWwiOiJzdXBwbGllclRlc3RAZ21haWwuY29tIiwiaWQiOiIxMyIsInJvbGUiOiJzdXBwbGllciJ9.iHG4lvv1Qb8EgXbECjwik1MittXx3RNEmaa7Q4ZFSjw'
  }
};

axios.request(config)
.then((response) => {
  setTemp(response.data.data.offerList);
  console.log(JSON.stringify(response.data.data.offerList));
})
.catch((error) => {
  console.log(error);
});

 }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      {fetching || isFetching ? <Loader /> : null}
      <View style={{
        backgroundColor: '#032e63',
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 5 }}>
            <Image style={{ height: 20, width: 14 }} source={require('../../../assets/L.png')} />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Roboto-Medium', marginLeft: 14 }}>Offers list</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ height: 24, width: 28, }} source={require('../../../assets/Fo.png')} />
          <Image style={{ height: 22, width: 26, tintColor: '#fff', marginLeft: 15 }} source={require('../../../assets/Image/dil.png')} />
          <Image style={{ height: 24, width: 28, tintColor: "#fff", marginLeft: 15 }} source={require('../../../assets/supplierImage/more.png')} />
        </View>
      </View>
      <ScrollView>
        <View style={{ paddingHorizontal: 12, marginTop: 10 }}>
        <View style={{ marginTop:15,}}>
        <Text style={{fontSize:15,color:'#23233C',fontFamily:'Roboto-Medium'}}>Offer Template Name</Text>
        <View style={{
          width:'100%',
          borderWidth:1,
          marginTop:5,
          height:40,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          borderRadius:8,
          paddingHorizontal:6,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}>
         <TextInput
         placeholder='Offer Template Name'
         value={template}
         onChangeText={(val)=>setTemplate(val)}
         style={{color:'#030303'}}
         placeholderTextColor={'#999999'}
         />
            </View>
        </View>
        <View style={{ marginTop:15,}}>
        <Text style={{fontSize:15,color:'#23233C',fontFamily:'Roboto-Medium'}}>Offer Description</Text>
        <View style={{
          width:'100%',
          borderWidth:1,
          marginTop:5,
          height:40,
          borderRadius:8,
          paddingHorizontal:6,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}>
       <TextInput
         placeholder='Offer Discription'
         value={description}
         onChangeText={(val)=>setDescription(val)}
         style={{color:'#030303'}}
         placeholderTextColor={'#999999'}
         />
            </View>
        </View>
        
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:30}}>
            <TouchableOpacity 
            onPress={()=>addTemp()}
            style={{
                borderWidth:1,
                width:'48%',
                backgroundColor:'#032e63',
                alignItems:'center',
                justifyContent:'center',
                paddingVertical:7,
                borderRadius:15,
                flexDirection:'row'
            }}>
                <Image style={{height:11,width:11}} source={require('../../../assets/supplierImage/addPlus.png')}/>
                <Text style={{color:'#fff',fontFamily:'Roboto-Medium',marginLeft:10}}>Add Template</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('AddOffer')}
            style={{
                borderWidth:1,
                width:'48%',
                backgroundColor:'#032e63',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'row',
                paddingVertical:7,
                borderRadius:15,
            }}>
                <Image style={{height:11,width:11}} source={require('../../../assets/supplierImage/addPlus.png')}/>
                <Text style={{color:'#fff',fontFamily:'Roboto-Medium',marginLeft:10}}>Add Offer</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex:1,marginTop:15}}>
          <FlatList
            data={temp}
            style={{ marginTop: 0 }}
            renderItem={({ item }) => (
              <View style={{
                marginVertical: 7,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
                elevation: 5,
                backgroundColor: '#fff',
                minHeight: 100,
                width: '99%',
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginHorizontal: 1,
                borderRadius: 10
              }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{flexDirection:'row',width:'100%',}}>
                 <Image
                  style={{height:80,width:80,borderRadius:10}}
                  source={{uri:`https://olocker.co${item.ImageUrl}${item.ImageName}`}}
                 />
                 <View style={{marginLeft:10,width:'90%'}}>
                   <View style={{flexDirection:'row',width:'80%',justifyContent:'space-between'}}>
                   <Text style={{color:'#030303',fontSize:12,fontFamily:'Roboto-Medium'}}>{`Offer Type : ${item.OfferType}`}</Text>
                   <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('EditOfferTemp', { item })}
                    >
                      <Image style={{ width: 16, height: 16 }} source={require('../../../assets/supplierImage/pencil.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeTemp(item)}>
                      <Image style={{ width: 16, height: 16, marginLeft: 10 }} source={require('../../../assets/supplierImage/trash.png')} />
                    </TouchableOpacity>
                  </View>
                   </View> 
                   <Text style={{color:'#030303',fontSize:12,fontFamily:'Roboto-Medium'}}>{`Start Date : ${item.StartDate.substr(0,item.StartDate.indexOf(' '))}`}</Text>
                   <Text style={{color:'#030303',fontSize:12,fontFamily:'Roboto-Medium'}}>{`End Date : ${item.EndDate.substr(0,item.EndDate.indexOf(' '))}`}</Text>
                   <Text style={{color:'#030303',fontSize:12,fontFamily:'Roboto-Medium',width:'80%'}}>{`Deal Type : ${item.DealType}`}</Text>
                 </View>
                </View>
                  
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                  <TouchableOpacity 
                  onPress={()=>handleAddOffer()}
                  style={{
                    backgroundColor:'#032e63',
                    width:60,
                    height:25,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:8
                  }}>
                    <Text style={{color:'#fff',fontFamily:'Roboto-Medium'}}>Add</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    backgroundColor:'#032e63',
                    width:60,
                    height:25,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:8
                  }}>
                    <Text style={{color:'#fff',fontFamily:'Roboto-Medium'}}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          </View>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};
export default OfferList;

const Status = [
  { label: 'Active', value: 'true' },
  { label: 'In Active', value: 'false' },
];



const data = [
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
  { name: 'Lorem Ipsum', desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },

]






