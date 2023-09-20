import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Loader from '../../../components/Loader';
import styles from './styles';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyNetworkList = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();
  const selector = useSelector(state => state.Home.SearchMyNetworkList);
  const isFetching = useSelector(state => state.Home.isFetching);
  const [arr, setArr] = useState([]);
  const isFocuse = useIsFocused();
  useEffect(() => {
    myNetworkList();
  }, [isFocuse]);

  const dispatch = useDispatch();

  const myNetworkList = async () => {
    const user_id = await AsyncStorage.getItem('user_id');

    dispatch({
      type: 'Search_MyNetwork_Request',
      url: '/getNetworkRetailer',
      userId: user_id,
      role: '6',
    });
  };

  let widthArr = [80, 120, 120, 120, 120, 200, 120, 120];

  return (
    <View style={{flex: 1}}>
      {isFetching ? <Loader /> : null}
      <View>
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              color: '#032E63',
              marginLeft: 10,
              marginVertical: 10,
            }}>
            My Network
          </Text>
          <ScrollView horizontal={true}>
            <View>
              <FlatList
                data={selector}
                renderItem={({item}) => (
                  <View
                    style={{
                      borderWidth: 1,
                      marginVertical: 10,
                      marginLeft: 30,
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Retailer Name 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.CompanyName}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        City
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.CityName}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        State
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.StateName}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Assign Category 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.CategoryType}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text
                        style={{fontSize: 16, fontWeight: '700', width: '40%'}}>
                        Is products show on Retailer s App{' '}
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>
                        {item.IsShowInRetailerApp}
                      </Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Status 
                      </Text>
                      <Text>:</Text>
                      <Text style={{width: '60%'}}>{item.Status}</Text>
                    </View>
                    <View style={styles.txt}>
                      <Text style={{fontSize: 16, fontWeight: '700'}}>
                        Action 
                      </Text>
                      <Text>:</Text>
                      <TouchableOpacity style={{width: '60%',
                      
                    }}>
                        <Text
                          style={{
                            width: '60%',
                            color: 'blue',
                            fontWeight: '700',
                          }}>
                          Remove 
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </View>
      </View>

      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#032e63',
          bottom: 35,
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 40,
          right: 25,
          height: hp(10),
          width: wp(20),
        }}>
        <Ionicons name="chatbubbles-outline" size={45} color={'white'} />
      </TouchableOpacity> */}
    </View>
  );
};
export default MyNetworkList;

const data = [
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
  ['01', 'Rohan sahu', 'MP', 'Indore', 'Lorem', 'lorem', 'pending', 'pending'],
];
