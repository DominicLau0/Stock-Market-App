import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, Text } from "react-native";
import { PaperProvider, Searchbar, ActivityIndicator, MD2Colors } from "react-native-paper";

import Stock_info_box from "../components/Stock_info_box";
import Home_stock_info_box from "../components/Home_stock_info_box";
import Stock_news_component from "../components/Stock_news_component"

export default function Home({ navigation }){
    const [searchQuery, setSearchQuery] = useState("");
	const [newSearchQuery, setNewSearchQuery] = useState(false);
	const [stocks_symbol, setStocksSymbol] = useState("");
	const [stock_symbol_loading, setStockSymbolLoading] = useState(true);
	const [news_list, setNewsList] = useState("");
	const [newsLoading, setNewsLoading] = useState(true);

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

	const news_api = async () => {
		try{
			//Get news from finnhub
			const get_news = await fetch(`https://finnhub.io/api/v1/news?category=general&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
			const news = await get_news.json();

			let counter = 0;

			let news_array = await news.filter(function(single_news){
				if(counter!==15 && single_news.image !==""){
					counter++;
					return true;
				}else{
					return false;
				}
			}).map(single_news => ({id: single_news.id, headline: single_news.headline, image: single_news.image, datetime: single_news.datetime, source: single_news.source, url: single_news.url}))

			setNewsList(news_array);

		} catch(error){
			console.error(error);
		} finally {
			setNewsLoading(false);
		}
	}

	useEffect(() => {
		stock_symbol_api();
		news_api();
	}, [])

    return(
        <PaperProvider>
            <SafeAreaView style={{backgroundColor: "#ffdab9", height: "100%"}}>
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={(query) => {onChangeSearch(query); setNewSearchQuery(true)}}
                        value={searchQuery}
                        style={{backgroundColor: "#d2b48c", margin: 10}}
						autoCorrect={false}
						autoCapitalize="none"
                    />
                    {searchQuery !== "" && newSearchQuery ? (
						stock_symbol_loading ? (
							<ActivityIndicator animating={true} color={MD2Colors.red800} />
						) : (
                        	<Stock_info_box search={searchQuery} stocks_symbol={stocks_symbol} setNewSearchQuery={setNewSearchQuery} navigation={navigation}/>
						)
                    ) : (
						<>
							<Text style={{fontSize: 25, fontWeight: "bold",  margin: 10}}>Followed Stocks</Text>
							<Home_stock_info_box navigation={navigation}/>
							<Text style={{fontSize: 25, fontWeight: "bold",  margin: 10}}>Market News</Text>
							{newsLoading ? (
								null
							) : (
								<Stock_news_component news={news_list} />
							)}
						</>
                    )}
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    )
}