import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Text } from "react-native";


export default function Stock_info_box(props){
    const [searchResult, setSearchResult] = useState("");
    const [searchLoading, setSearchLoading] = useState(true);

    async function stock_symbol_lookup(stock_name){
        try{
            let stock_string = stock_name.toUpperCase();
            let counter = 0;

            setSearchResult(await props.stocks_symbol.filter(function(single_stock){
                if((single_stock.description.includes(stock_string) || single_stock.displaySymbol.includes(stock_string)) && counter !== 10){
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
    
    if(searchLoading){
        return(
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )
    }

    return(
        <>
            {searchResult.map(single_stock => {
                return(
                    <Fragment key={single_stock.displaySymbol}>
                        <Text>{single_stock.description}</Text>
                    </Fragment>
                )
            })}
        </>
    )
}