import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Colors from "../res/colors";

export default function ProductDetail({ route }) {
    const { params: item } = route

    console.log(item)

    return (<View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
            <Text style={styles.textHeader}>
                {item.name}
            </Text>
            <View style={styles.divider}/>
        </ScrollView>
    </View>)
}

const styles = StyleSheet.create({
    container: {
		flex: 1,
		backgroundColor: Colors.WhiteSmoke,
		paddingTop: 40,
	},
    divider: {
		width: "100%",
		height: 4,
		backgroundColor: Colors.EerieBlack,
		marginBottom: 8,
		marginTop: 16,
		borderRadius: 2,
	}, 
	scrollContainer: {
		flex: 1,
		padding: 24,
	},
    textHeader: {
		fontSize: 24,
		textAlign: "left",
		fontWeight: "bold",
	},
})