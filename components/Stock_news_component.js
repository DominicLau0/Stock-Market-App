import { Pressable, View, Image, Text, Linking } from "react-native"

export default function Stock_date_buttons(props){
    return(
        props.news.map(single_news => {
            return (
                <Pressable onPress={() => { Linking.openURL(single_news.url) } } key={single_news.id}>
                    <View style={{margin: 20, marginTop: 0, backgroundColor: "#f4a460", borderWidth: 0, borderRadius: 10, flexDirection: "row"}}>
                        <Image
                            style={{width: 100, height: 100, borderWidth: 0, borderRadius: 10, margin: 10}}
                            src={single_news.image}
                        />
                        <View style={{ flexShrink: 1}}>
                            <Text numberOfLines={1} style={{margin: 10, marginBottom: 0, marginLeft: 0, fontSize: 20, fontWeight: "700"}}>{single_news.source}</Text>
                            <Text numberOfLines={4} style={{fontSize: 16, fontWeight: "500"}}>{single_news.headline}</Text>
                        </View>
                    </View>
                </Pressable>
            )
        })
    )
}