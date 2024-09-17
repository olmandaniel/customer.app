import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomerForm } from "./components/CustomerForm";
import { Customer } from "./types/customer";

const createCustomerOnApi = async (data: Customer) => {
    try {
        console.log(data)
        const response = await fetch(
            `http://10.0.2.2:8000/customers`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const json = await response.json();
        if (response.status > 300) {
            Alert.alert("Error",
                json.error,
                [{ text: "OK" }])
        } else {
            Alert.alert("Sucess",
                "Cliente creado correctamente",
                [{ text: "OK" }])
        }
        return json;
    } catch (error) {
        console.error(error);
    }
};

export default function CreateCustomerScreen ({navigation}) {
    const handleCreate = async (data: Customer) => {
        await createCustomerOnApi(data)
        navigation.navigate('Home')
    }

    return (<SafeAreaView style={styles.container}>
         <ScrollView><CustomerForm handleEdit={handleCreate} title="Crear cliente" /></ScrollView>
    </SafeAreaView>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
});