import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './Home';
import CreateCustomerScreen from './CreateCustomer';
import EditCustomerScreen from './EditCustomer';



const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen name="CreateCustomer" component={CreateCustomerScreen} />
        <Stack.Screen name="EditCustomer" component={EditCustomerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
