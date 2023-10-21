import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Item from "../screens/Item";
import NewItem from "../screens/Item/NewItem";
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function ItemNavigation(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Item" component={Item} />
            <Stack.Screen name="NovoItem" component={NewItem} />
        </Stack.Navigator>
    );
}