import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Appbar, PaperProvider, Card, Avatar, IconButton, Button } from 'react-native-paper';
import Stock_date_buttons from './components/Stock_date_buttons'

export default function App() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [company_name, setCompanyName] = useState([]);
	const [stock_option, setStockOption] = useState("1 Day");

	function change_graph(type){
		if(type === "1 Day"){
			stock_api_call("5", Math.floor(new Date().setHours(0,0,0)/1000));
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
	
	const stock_api_call = async (resolution, beginning) => {
		let stock_array = [];

		try{
			const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=${resolution}&from=${beginning}&to=${Math.floor(Date.now()/1000)}&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
			const stock = await response.json();

			for(let i = 0; i<stock.c.length; i++){
				let json = {timestamp: stock.t[i]*1000, open: stock.o[i], high: stock.h[i], low: stock.l[i], close: stock.c[i]}
				stock_array.push(json);
			}
			
			setData(stock_array);
		}catch(error){
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const company_info = async () => {
		try{
			const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=AAPL&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
			let company_info_array = [];
			company_info_array.push(await response.json());
			setCompanyName(company_info_array);

		}catch(error){
			console.error(error);
		} finally {
			stock_api_call("5", Math.floor(new Date().setHours(0,0,0)/1000));
		}
	}

	useEffect(() => {
		company_info();
	}, [])

	return (
		<PaperProvider>
			<SafeAreaView style={{backgroundColor: "#ffdab9", height: "100%"}}>
				<Appbar.Header style={{backgroundColor: "#ffdab9"}} statusBarHeight={0}>
					<Appbar.BackAction onPress={() => {}} />
					<Appbar.Content title="Title" />
					<Appbar.Action icon="plus" onPress={() => {}} />
				</Appbar.Header>
				{isLoading? (
					<ActivityIndicator />
				) : (
					<>
						<Text style={{fontSize: 35, fontWeight: "bold", marginLeft: 20}}>{company_name[0].name}</Text>
						<Text style={{fontSize: 25, fontWeight: "500", marginLeft: 20}}>$127.27 USD</Text>
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
									<Stock_date_buttons option={stock_option} change_graph={change_graph}/>
								</View>
							</CandlestickChart.Provider>
						</GestureHandlerRootView>
					</>
				)}
				<Text style={{fontSize: 30, fontWeight: "bold", marginLeft: 20, marginTop: 20}}>News</Text>
				<Card.Title
					title="Card Title"
					subtitle="Card Subtitle"
					left={(props) => <Avatar.Icon {...props} icon="folder" />}
					right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
				/>
			</SafeAreaView>
		</PaperProvider>
	);
}