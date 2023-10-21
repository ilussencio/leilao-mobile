import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartaoParticipante from './CartaoParticipante';

const Participante = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const handleExcluir = (id) => {
    console.log('Excluindo item...');

    fetch(`https://leilao-rest-api.herokuapp.com/participante/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          //reload
        } else {
          // Lida com erros, por exemplo, exibindo uma mensagem de erro
          console.error("Erro ao excluir");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir" + error);
      });

  };

  useEffect(() => {
    // Realize a requisição GET para obter os itens do leilão
    fetch('https://leilao-rest-api.herokuapp.com/participante/')
      .then(response => response.json())
      .then(data => {
        setItems(data);
      })
      .catch(error => {
        console.error('Erro ao obter os itens do leilão:', error);
      });
  });

  return (
    <View style={styles.container}>
      
      <View  style={styles.button}>
        <Button
          title="Adicionar Participante"
          onPress={() => navigation.navigate('NovoParticipante')}
        />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartaoParticipante
            id={item.id}
            nome={item.nome}
            cpf={item.cpf}
            onExcluir={handleExcluir}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginBottom: 10,
  },
});

export default Participante;
