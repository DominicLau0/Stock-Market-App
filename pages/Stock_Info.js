import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, ActivityIndicator, MD2Colors } from 'react-native-paper';

import Stock_date_buttons from '../components/Stock_date_buttons';
import Stock_news_component from '../components/Stock_news_component';

export default function Stock_Info({ route }){
    const [isLoading, setLoading] = useState(true);
	const [newsLoading, setNewsLoading] = useState(true);
	const [currentStockPriceLoading, setCurrentStockPriceLoading] = useState(true);

	const [data, setData] = useState([]);
	const [stock_option, setStockOption] = useState("1 Day");
	const [news_list, setNewsList] = useState("");
	const [current_stock_price, setCurrentStockPrice] = useState();

	const { symbol, company_name } = route.params;

	function change_graph(type){
		if(type === "1 Day"){
			if(new Date().getHours() >= 0 && new Date().getHours() < 4){
				stock_api_call("5", Math.floor(new Date().setDate(new Date().getDate()-1)/1000));
			}else{
				stock_api_call("5", Math.floor(new Date().setHours(0,0,0)/1000));
			}
			setStockOption("1 Day");
		}else if(type === "1 Week"){
			stock_api_call("60", Math.floor(new Date().setDate(new Date().getDate()-7)/1000));
			setStockOption("1 Week");
		}else if(type === "1 Month"){
			stock_api_call("D", Math.floor(new Date().setMonth(new Date().getMonth()-1)/1000));
			setStockOption("1 Month");
		}else if(type === "6 Months"){
			stock_api_call("D", Math.floor(new Date().setMonth(new Date().getMonth()-6)/1000));
			setStockOption("6 Months");
		}else if(type === "1 Year"){
			stock_api_call("W",Math.floor(new Date().setFullYear(new Date().getFullYear()-1)/1000));
			setStockOption("1 Year")
		}
	}

	const stock_price_api = async () => {
		try{
			const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
			const stock_price = await response.json();

			setCurrentStockPrice(stock_price.c);
		} catch(error){
			console.error(error);
		} finally {
			setCurrentStockPriceLoading(false);
		}
	}
	
	const stock_api_call = async (resolution, beginning) => {
		try{
			let stock_array = [];

			//Get stock quotes from finnhub
			const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${beginning}&to=${Math.floor(Date.now()/1000)}&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
			const stock = await response.json();

			if(stock && stock.c){
				for(let i = 0; i<await stock.c.length; i++){
					let json = {timestamp: stock.t[i]*1000, open: stock.o[i], high: stock.h[i], low: stock.l[i], close: stock.c[i]}
					stock_array.push(json);
				}
			}

			setData(stock_array);

		}catch(error){
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const news_api = async () => {
		try{
			//Current Date
			let current_month = new Date().getUTCMonth() + 1;
			if(current_month < 10){
				current_month = "0" + current_month;
			}

			let current_day = new Date().getUTCDate();
			if(current_day < 10){
				current_day = "0" + current_day;
			}

			let current_date = new Date().getUTCFullYear() + "-" + current_month + "-" + current_day;

			//Last week date
			let date = new Date();
			date.setDate(new Date().getDate()-7);

			let last_week_month = date.getUTCMonth() + 1;
			if(last_week_month < 10){
				last_week_month = "0" + last_week_month;
			}

			let last_week_day = date.getUTCDate();
			if(last_week_day < 10){
				last_week_day = "0" + last_week_day;
			}

			let last_week_date = date.getUTCFullYear() + "-" + last_week_month + "-" + last_week_day;

			//Get news from finnhub
			const get_news = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${last_week_date}&to=${current_date}&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
			const news = await get_news.json();

			let counter = 0;

			let news_array = await news.filter(function(single_news){
				if(single_news.headline.toUpperCase().includes(company_name.replace(/,?\s*(llc|inc|co|corp)\.?$/i, '')) && counter!==10 && single_news.image !==""){
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
		change_graph("1 Day");
		stock_api_call("5", Math.floor(new Date().setHours(0,0,0)/1000));
		news_api();
		stock_price_api();
		const interval = setInterval(() => {
			stock_price_api();
		}, 5000)
		return () => clearInterval(interval);
	}, [])

	return (
        <PaperProvider>
            <SafeAreaView style={{backgroundColor: "#ffdab9", height: "100%"}}>
                <ScrollView>
                    { isLoading || newsLoading || currentStockPriceLoading? (
                        <ActivityIndicator animating={true} color={MD2Colors.red800} />
                    ) : (
                        <>
                            <Text style={{fontSize: 35, fontWeight: "bold", marginLeft: 20}}>{company_name}</Text>
                            <Text style={{fontSize: 25, fontWeight: "500", marginLeft: 20}}>${current_stock_price} USD</Text>
                            <GestureHandlerRootView>
                                <CandlestickChart.Provider data={data}>
                                    <CandlestickChart>
                                        <CandlestickChart.Candles />
                                        <CandlestickChart.Crosshair />
                                    </CandlestickChart>
                                    <View style={{marginLeft: 20, marginRight: 20, borderTopColor: 'black', borderTopWidth: StyleSheet.hairlineWidth,}}>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={{width: "40%"}}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={{color: "#708090"}}>Open   </Text>
                                                    <CandlestickChart.PriceText type="open" />
                                                </View>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={{color: "#708090"}}>High    </Text>
                                                    <CandlestickChart.PriceText type="high" />
                                                </View>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={{color: "#708090"}}>Low     </Text>
                                                    <CandlestickChart.PriceText type="low" />
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={{color: "#708090"}}>Close   </Text>
                                                    <CandlestickChart.PriceText type="close" />
                                                </View>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={{color: "#708090"}}>Date    </Text>
                                                    <CandlestickChart.DatetimeText />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                <View style={{flexDirection: "row", marginTop: 10, justifyContent: "center"}}>
                                    <Stock_date_buttons option={stock_option} change_graph={change_graph} />
                                </View>
                                </CandlestickChart.Provider>
                            </GestureHandlerRootView>
                            <Text style={{fontSize: 30, fontWeight: "bold", marginLeft: 20, marginTop: 20, marginBottom: 10}}>News</Text>
							{ news_list.length === 0? (
								<Text style={{marginLeft: 20, fontSize: 20}}>No news available.</Text>
							) : (
								<Stock_news_component news={news_list} />
							)}
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </PaperProvider>
	);
}