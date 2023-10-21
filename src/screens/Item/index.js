import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartaoItem from './CartaoItem';
const ItemList = () => {
  const [items, setItems] = useState([]);
  const navigation = useNavigation();

  const handleExcluir = (id) => {
    console.log('Excluindo item...');

    fetch(`https://leilao-rest-api.herokuapp.com/itemdeleilao/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          //reload
        } else {
          // Lida com erros, por exemplo, exibindo uma mensagem de erro
          console.error("Erro ao excluir o item do leilão");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o item do leilão: " + error);
      });

  };

  useEffect(() => {
    // Realize a requisição GET para obter os itens do leilão
    fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao')
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
          title="Novo Item"
          onPress={() => navigation.navigate('NovoItem')}
        />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartaoItem
            id={item.id}
            nome={item.nome}
            leilaoAberto={item.leilaoAberto}
            lanceVencedor={item.lanceVencedor}
            valorMinimo={item.valorMinimo}
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

export default ItemList;
