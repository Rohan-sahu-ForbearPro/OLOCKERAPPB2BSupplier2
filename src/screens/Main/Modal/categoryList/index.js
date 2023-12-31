import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';


const CategoryViewModal = ({visi, close = () => {}, ...props}) => {

  return (
    <View style={{flex: 1,}}>
      <Modal
        animationType="slide"
       transparent={true}
  
         visible={visi}
       >
        <View style={[styles.centeredView,{backgroundColor: 'rgba(52, 52, 52, 0.8)',marginTop:0}]}>
          <View style={styles.modalView}>
            <TouchableOpacity
             onPress={() =>close()}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: '#032e63',
                alignItems: 'center',
                justifyContent: 'center',
                position:'absolute',right:0,margin:10
              }}>
              <Text style={{fontSize: 18, color: 'white'}}>X</Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center', alignSelf: 'center',marginTop:40}}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '800',
                  color: '#000',
                  marginLeft: -10,
                }}>
                {props.data} List for Product SKU:{' '}
              </Text>
              <Text style={{fontSize: 24, fontWeight: '800', color: '#000'}}>
                10BAI683
              </Text>
            </View>
            <View style={styles.Card}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '45.5%',
                  }}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    ProductSku:-
                  </Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={{fontWeight: '500', fontSize: 18}}>
                    10BAI-683
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color={'#000'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                  {props.data} Name:-
                  </Text>
                </View>
                <View style={{width: '41.5%'}}>
                  <Text style={{fontWeight: '500', fontSize: 18}}>Gold</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    PreInsured :
                  </Text>
                </View>
                <View style={{width: '41.5%'}}>
                  <Text style={{fontWeight: '500', fontSize: 18}}>No</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <View style={{}}>
                  <Text style={{fontWeight: '600', fontSize: 18}}>
                    IsBestSeller :
                  </Text>
                </View>
                <View style={{}}>
                  <CheckBox />
                </View>
              </View>
            </View>
            
          </View>
        </View>
      </Modal>

     
    </View>
  );
};
export default CategoryViewModal;
