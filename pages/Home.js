import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, Text } from "react-native";
import { PaperProvider, Searchbar, Button, ActivityIndicator, MD2Colors } from "react-native-paper";

import Stock_info_box from "../components/Stock_info_box";

export default function Home({ navigation }){
    const [searchQuery, setSearchQuery] = useState("");
	const [newSearchQuery, setNewSearchQuery] = useState(false);
	const [stocks_symbol, setStocksSymbol] = useState("");
	const [stock_symbol_loading, setStockSymbolLoading] = useState(true);

    const onChangeSearch = query => setSearchQuery(query);

    async function stock_symbol_api(){
		try{
			const get_stock_names = await fetch("https://finnhub.io/api/v1/stock/symbol?exchange=US&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0");
			const stock_names = await get_stock_names.json();

			setStocksSymbol(stock_names);

		} catch(error){
			console.error(error);
		} finally {
			setStockSymbolLoading(false);
		}
    }

	useEffect(() => {
		stock_symbol_api();
	}, [])

    return(
        <PaperProvider>
            <SafeAreaView style={{backgroundColor: "#ffdab9", height: "100%"}}>
                <ScrollView>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(query) => {onChangeSearch(query); setNewSearchQuery(true)}}
                        value={searchQuery}
                        style={{backgroundColor: "#d2b48c", margin: 10}}
                    />
                    {searchQuery !== "" && newSearchQuery ? (
						stock_symbol_loading ? (
							<ActivityIndicator animating={true} color={MD2Colors.red800} />
						) : (
                        	<Stock_info_box search={searchQuery} stocks_symbol={stocks_symbol} setNewSearchQuery={setNewSearchQuery}/>
						)
                    ) : (
						<>
							<Text style={{fontSize: 25, fontWeight: "bold",  margin: 10}}>Followed Stocks</Text>
							<Button mode="contained" onPress={() => navigation.navigate('Stock Details')}>
								Go to details
							</Button>
						</>
                    )}
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    )
}