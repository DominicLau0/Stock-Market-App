import { useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Text, View, Pressable } from "react-native";


export default function Stock_info_box(props){
    const [searchResult, setSearchResult] = useState("");
    const [searchLoading, setSearchLoading] = useState(true);

    async function stock_symbol_lookup(stock_name){
        try{
            let stock_string = stock_name.toUpperCase();
            let counter = 0;

            setSearchResult(await props.stocks_symbol.filter(function(single_stock){
                if((single_stock.description.startsWith(stock_string) || single_stock.displaySymbol.startsWith(stock_string)) && counter !== 30){
                    counter++;
                   return true; 
                }else{
                    return false;
                }
            }).map(single_stock => ({description: single_stock.description, displaySymbol: single_stock.displaySymbol})));
        
        } catch(error){
            console.error(error);
        } finally {
            setSearchLoading(false);
        }
	}

    useEffect(() => {
        stock_symbol_lookup(props.search);
    }, [props.search])

    return(
        <>
            { searchLoading ? (
                <ActivityIndicator animating={true} color={MD2Colors.red800} />
            ) : (
                searchResult.map(single_stock => {
                    return(
                        <Pressable onPress={() => props.navigation.navigate('Stock Details', {symbol: single_stock.displaySymbol, company_name: single_stock.description})} key={single_stock.displaySymbol}>
                            <View style={{backgroundColor: "#deb887", margin: 10, borderWidth: 0, borderRadius: 10}}>
                                <Text style={{margin: 10, marginBottom: 0, fontWeight: "bold", fontSize: 17}}>{single_stock.displaySymbol}</Text>
                                <Text style={{margin: 10, marginTop: 0}}>{single_stock.description}</Text>
                            </View>
                        </Pressable>
                    )
                })
            )}
        </>
    )
}