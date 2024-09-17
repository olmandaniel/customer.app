import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { Customer } from "./types/customer";
import { CustomerForm } from "./components/CustomerForm";
import { SafeAreaView } from "react-native-safe-area-context";

const getCustomerFromApi = async (id: number) => {
    try {
        const response = await fetch(
            `http://10.0.2.2:8000/customers/${id}`,
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

const updateCustomerOnApi = async (id:number, data: Customer) => {
    try {
        const response = await fetch(
            `http://10.0.2.2:8000/customers/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export default function EditCustomerScreen({ route, navigation }) {
    const { customerId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Customer | null>(null);
    const getCustomer = async () => {
        try {
            setLoading(true);
            const response = await getCustomerFromApi(customerId)
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = async (data: Customer) => {
        await updateCustomerOnApi(customerId, data)
        navigation.navigate('Home')
    }

    useEffect(() => {
        getCustomer();
    }, []);

    return (<SafeAreaView style={styles.container}>
        {isLoading ? (
            <ActivityIndicator />
        ) : (
            <ScrollView><CustomerForm customer={data!} handleEdit={handleEdit} title="Editar cliente"/></ScrollView>)}
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    }
});