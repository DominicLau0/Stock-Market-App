import { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { getHeaderTitle } from '@react-navigation/elements'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomNavigationBar({ navigation, route, options, back }){
    const title = getHeaderTitle(options, route.name);

    const [contains_symbol, setContainsSymbol] = useState(false);
    const [loadingStorage, setLoadingStorage] = useState(true);

    const storeStockSymbol = async (symbol, company_name) => {
        try{
            if((await AsyncStorage.getAllKeys()).includes(symbol)){
                await AsyncStorage.removeItem(symbol);
                setContainsSymbol(false);
            }else{
                await AsyncStorage.setItem(symbol, company_name);
                setContainsSymbol(true)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const searchContainSymbol = async () => {
        let keys = [];

        try{
            keys = await AsyncStorage.getAllKeys();

            if(await route.params !== undefined){
                if(keys.includes(await route.params.symbol)){
                    setContainsSymbol(true);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingStorage(false);
        }
    }

    useEffect(() => {
		searchContainSymbol();
	}, [])

    return(
        <Appbar.Header style={{backgroundColor: "#ffdab9"}}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            {back ? (
                loadingStorage ? (
                    null
                ) : (
                    contains_symbol ? (
                        <Appbar.Action icon="check" onPress={() => storeStockSymbol(route.params.symbol, route.params.company_name)} />
                    ) : (
                        <Appbar.Action icon="plus" onPress={() => storeStockSymbol(route.params.symbol, route.params.company_name)} />
                    )
                )
            ) : null}
        </Appbar.Header>
    )
}