import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Home_stock_info_box(props){
    const [keys, setKeys] = useState([])
    const [isLoading , setLoading] = useState(true);

    async function stored_symbols(){
        let array = [];
        try{
            let keys = await AsyncStorage.getAllKeys();

            for(let i=0; i<keys.length; i++){
                array.push({[keys[i]]: await AsyncStorage.getItem(keys[i])})
            }
            setKeys(array);
        } catch (error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

	useEffect(() => {
		stored_symbols();
        
	}, [AsyncStorage.getAllKeys()])

    return(
        <>
            { isLoading ? (
                null
            ) : (
                keys.length === 0 ? (
                    <Text style={{marginLeft: 10, fontSize: 20, marginBottom: 20}}>No Followed Stocks</Text>
                ) : (
                    keys.map(single_stock => {
                        return(
                            <Pressable onPress={() => props.navigation.navigate('Stock Details', {symbol: Object.keys(single_stock)[0], company_name: Object.values(single_stock)[0]})} key={Object.values(single_stock)[0]}>
                                <View style={{backgroundColor: "#deb887", margin: 10, borderWidth: 0, borderRadius: 10}}>
                                    <Text style={{margin: 10, marginBottom: 0, fontWeight: "bold", fontSize: 17}}>{Object.keys(single_stock)[0]}</Text>
                                    <Text style={{margin: 10, marginTop: 0}}>{Object.values(single_stock)[0]}</Text>
                                </View>
                            </Pressable>
                        )
                    })
                )
            )}
        </>
    )
}