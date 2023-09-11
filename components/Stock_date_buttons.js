import { Button } from 'react-native-paper';

export default function Stock_date_buttons(props){
    let stock_time_options = ["1 Day", "1 Week", "1 Month", "6 Months", "1 Year"];

    return(
        <>
            {stock_time_options.map(option => {
                return(
                    <>
                        {
                            (() => {
                                if(props.option === option){
                                    return(
                                        <Button mode="text" key={props.option} labelStyle={{ fontWeight:"bold", fontSize: 12, marginRight: 5, marginLeft: 5 }} style={{marginRight: 5}} textColor="#b8860b" rippleColor="rgba(184, 134, 11, 0.3)" onPress={() => props.change_graph(option)}>{option}</Button>
                                    )
                                }else{
                                    return(
                                        <Button mode="text" key={option} labelStyle={{ fontSize: 12, marginRight: 5, marginLeft: 5 }} style={{marginRight: 5}} textColor="#b8860b" rippleColor="rgba(184, 134, 11, 0.3)" onPress={() => props.change_graph(option)}>{option}</Button>
                                    )
                                }
                            })()
                        }
                    </>
                )
            })}
        </>
    )
}