import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Customer } from "../types/customer";

type CustomerFormProps = {
    customer?: Customer;
    handleEdit: Function;
    title: string;
};

export function CustomerForm({ customer, handleEdit, title }: CustomerFormProps) {

    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            name: customer?.name,
            lastname: customer?.lastname,
            email: customer?.email,
            phone: customer?.phone,
            document: customer?.document,
            address: customer?.address,
            birthdate: customer?.birthdate,
            gender: customer?.gender,
            country: customer?.country,
        },
    })

    const onSubmit = (data) => {
        handleEdit(data);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Controller
                control={control}
                name="name"
                rules={{
                    required: 'El nombre es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Nombre"
                    />
                )}
            />
            {errors.name && <Text style={styles.errorMessage}>{errors.name.message}</Text>}
            <Text>Apellido:</Text>
            <Controller
                control={control}
                name="lastname"
                rules={{
                    required:  'El apellido es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Apellido"
                    />
                )}
            />
            {errors.lastname && <Text style={styles.errorMessage}>{errors.lastname.message}</Text>}
            <Text>Email:</Text>
            <Controller
                control={control}
                name="email"
                rules={{
                    required:  'El correo es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Correo"
                        keyboardType="email-address"
                    />
                )}
            />
            {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
            <Text>Celular:</Text>
            <Controller
                control={control}
                name="phone"
                rules={{
                    required:  'El celular es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Celular"
                        keyboardType="phone-pad"
                    />
                )}
            />
            {errors.phone && <Text style={styles.errorMessage}>{errors.phone.message}</Text>}
            <Text>DNI:</Text>
            <Controller
                control={control}
                name="document"
                rules={{
                    required:  'El dni es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="DNI"
                        keyboardType="numeric"
                    />
                )}
            />
            {errors.document && <Text style={styles.errorMessage}>{errors.document.message}</Text>}
            <Text>Dirección:</Text>
            <Controller
                control={control}
                name="address"
                rules={{
                    required:  'La dirección es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Dirección"
                    />
                )}
            />
            {errors.address && <Text style={styles.errorMessage}>{errors.address.message}</Text>}
            <Text>Género:</Text>
            <Controller
                control={control}
                name="gender"
                rules={{
                    required:  'El genero es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Genero"
                    />
                )}
            />
            {errors.gender && <Text style={styles.errorMessage}>{errors.gender.message}</Text>}
            <Text>País:</Text>
            <Controller
                control={control}
                name="country"
                rules={{
                    required:  'El país es requerido',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="País"
                    />
                )}
            />
            {errors.country && <Text style={styles.errorMessage}>{errors.country.message}</Text>}
            <Text>Seleccione su fecha de nacimiento</Text>
            <Controller
                control={control}
                name="birthdate"
                rules={{
                    required:  'La fecha de nacimiento es requerida',
                    
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="1970-05-05"
                        inputMode="text"

                    />
                )}
            />
            {errors.birthdate && <Text style={styles.errorMessage}>{errors.birthdate.message}</Text>}
            <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '100%',
        marginBottom:8,
        height: 40
    },
    errorMessage: {
        color: 'red',
        marginBottom: 4,
    },
});