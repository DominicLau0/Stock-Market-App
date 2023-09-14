import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./pages/Home"
import Stock_Info from "./pages/Stock_Info"

import CustomNavigationBar from './pages/CustomNavigationBar';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					header: (props) => <CustomNavigationBar {...props} />,
				}}>
				<Stack.Screen name="Discover Stocks" component={Home} style={{float: "left"}}/>
				<Stack.Screen name="Stock Details" component={Stock_Info} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}