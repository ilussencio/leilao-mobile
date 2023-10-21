import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ItemNavigation from './ItemNavigation';
import Leilao from '../screens/Leilao';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParticipanteNavigation from './ParticipanteNavigation';

const Tab = createBottomTabNavigator();

export default function BottonNavigation(){
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Item Leilão') {
                iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Leilão') {
                iconName = focused ? 'hammer' : 'hammer-outline';
            } else if (route.name === 'Participante') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}

      >
            <Tab.Screen name="Item Leilão" component={ItemNavigation}/>
            <Tab.Screen name="Leilão" component={Leilao} />
            <Tab.Screen name="Participante" component={ParticipanteNavigation} />
        </Tab.Navigator>
    );
}