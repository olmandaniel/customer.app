import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Customer } from "./types/customer";
import { useIsFocused } from "@react-navigation/native";

const getCustomersFromApi = async () => {
    try {
        const response = await fetch(
            'http://10.0.2.2:8000/customers',
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

const deleteCustomerOnApi = async (id: number) => {
    try {
        const response = await fetch(
            `http://10.0.2.2:8000/customers/${id}`,
            {
                method: "DELETE",
            }
        );

        const json = await response.json();
        if (response.status > 300) {
            Alert.alert("Error",
                json,
                [{ text: "OK" }])
        }
        return json;
    } catch (error) {
        console.error(error);
    }
};

export default function HomeScreen({ navigation }) {
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Customer[]>([]);
    const getCustomers = async () => {
        try {
            setLoading(true);
            const response = await getCustomersFromApi()
            setData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (id) => {
        navigation.navigate('EditCustomer', {
            customerId: id,
        })
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            'Eliminar',
            '¿Estás seguro de que deseas eliminar este elemento?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        await deleteCustomerOnApi(id)
                        await getCustomers();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const handleCreate = () => {
        navigation.navigate('CreateCustomer')
    }


    useEffect(() => {
        if (isFocused) {
            getCustomers();
          }
    }, [isFocused]);

    return (<SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Lista de Personas</Text>
            <Button
                title="Nuevo"
                onPress={handleCreate}
            />
        </View>
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.item}>
                            <View>
                                <Text>
                                    {item.name}, {item.lastname}
                                </Text>
                                <Text>
                                    {item.phone}
                                </Text>
                                <Text>
                                    {item.email}
                                </Text>

                                <Text>
                                    {item.birthdate}
                                </Text>
                            </View>

                            <View style={styles.buttons}>
                                <Button
                                    title="Editar"
                                    onPress={() => handleEdit(item.id)}
                                />
                                <Button
                                    title="Eliminar"
                                    onPress={() => handleDelete(item.id)}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        color: 'black',
        fontSize: 16,
    },
    name: {
        fontSize: 18,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12
    },
    buttons: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: 80
    },
    button: {
        width: 80,
    },
    deleteButton: {
        backgroundColor: 'red',
    },
});