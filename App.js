import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { CandlestickChart } from 'react-native-wagmi-charts';
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [company_name, setCompanyName] = useState([]);
	
	const stock_api_call = async () => {
		let stock_array = [];

		try{
			const response = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=${Math.floor(new Date().setMonth(new Date().getMonth()-1)/1000)}&to=${Math.floor(Date.now()/1000)}&token=ci57rnpr01qp1s6rj2fgci57rnpr01qp1s6rj2g0`);
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
		}
	}

	useEffect(() => {
		company_info();
		stock_api_call();
	}, [])

	return (
		<SafeAreaView style={{backgroundColor: "#ffdab9"}}>
			{isLoading && company_name? (
				<ActivityIndicator />
			) : (
				<>
					<Text style={{fontSize: 35, fontWeight: "bold", marginLeft: 20, marginTop: 20}}>{company_name[0].name}</Text>
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
						</CandlestickChart.Provider>
					</GestureHandlerRootView>
				</>
			)}
			<Text style={{fontSize: 30, fontWeight: "bold", marginLeft: 20, marginTop: 20}}>News</Text>
		</SafeAreaView>
	);
}