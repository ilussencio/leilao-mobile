import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function Leilao() {
  const [itens, setItens] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedCliente, setSelectedCliente] = useState('');

  const buscarItens = () => {
    fetch('https://leilao-rest-api.herokuapp.com/itemdeleilao')
      .then(response => response.json())
      .then(data => {
        setItens(data);
        if (data.length > 0) {
          setSelectedItem(data[0].nome);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os itens:', error);
      });
  };

  const buscarClientes = () => {
    fetch('https://leilao-rest-api.herokuapp.com/participante')
      .then(response => response.json())
      .then(data => {
        setClientes(data);
        if (data.length > 0) {
          setSelectedCliente(data[0].nome);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os clientes:', error);
      });
  };

  useEffect(() => {
    buscarItens();
    buscarClientes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione um item:</Text>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
      >
        {itens.map(item => (
          <Picker.Item key={item.id} label={item.nome} value={item.nome} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecione um cliente:</Text>
      <Picker
        selectedValue={selectedCliente}
        onValueChange={(clienteValue, clienteIndex) => setSelectedCliente(clienteValue)}
      >
        {clientes.map(cliente => (
          <Picker.Item key={cliente.id} label={cliente.nome} value={cliente.nome} />
        ))}
      </Picker>

      <Text style={styles.selectedItemText}>Item Selecionado: {selectedItem}</Text>
      <Text style={styles.selectedItemText}>Cliente Selecionado: {selectedCliente}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  selectedItemText: {
    fontSize: 16,
    marginTop: 16,
  },
});
