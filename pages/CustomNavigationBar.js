import { Appbar } from "react-native-paper";
import { getHeaderTitle } from '@react-navigation/elements'

export default function CustomNavigationBar({ navigation, route, options, back }){
    const title = getHeaderTitle(options, route.name);

    return(
        <Appbar.Header style={{backgroundColor: "#ffdab9"}}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />
            {back ? <Appbar.Action icon="plus" onPress={() => {}} /> : null}
        </Appbar.Header>
    )
}