import { Pressable, View, Image, Text } from "react-native";
import { openBrowserAsync } from "expo-web-browser";

export default function Stock_date_buttons(props){
    return(
        props.news.map(single_news => {
            return (
                <Pressable onPress={() => openBrowserAsync(single_news.url)} key={single_news.id}>
                    <View style={{margin: 10, marginTop: 0, backgroundColor: "#f4a460", borderWidth: 0, borderRadius: 10, flexDirection: "row", marginBottom: 15}}>
                        <Image
                            style={{width: 100, height: 100, borderWidth: 0, borderRadius: 10, margin: 10}}
                            src={single_news.image}
                        />
                        <View style={{ flexShrink: 1}}>
                            <Text numberOfLines={1} style={{margin: 10, marginBottom: 0, marginLeft: 0, fontSize: 20, fontWeight: "700"}}>{single_news.source}</Text>
                            <Text numberOfLines={4} style={{fontSize: 16, fontWeight: "500", marginRight: 10}}>{single_news.headline}</Text>
                        </View>
                    </View>
                </Pressable>
            )
        })
    )
}