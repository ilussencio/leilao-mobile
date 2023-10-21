import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Participante from "../screens/Participante";
import NewParticipante from '../screens/Participante/NewParticipante';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function ParticipanteNavigation(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Participante" component={Participante} />
            <Stack.Screen name="NovoParticipante" component={NewParticipante} />
        </Stack.Navigator>
    );
}