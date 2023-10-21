import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

const NewParticipante = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalErrorVisible, setModalErrorVisible] = useState(false);

  const handleCadastroItem = () => {
    // Validar o nome e o valor mínimo
    if (!nome || cpf === "") {
      setModalErrorVisible(true);
      return;
    }

    // Crie um objeto com os dados a serem enviados no corpo da requisição POST
    const data = {
      nome,
      cpf: cpf // Certifique-se de converter para número
    };

    // Realize a requisição POST para o servidor
    fetch('https://leilao-rest-api.herokuapp.com/participante', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        // Lide com a resposta do servidor, se necessário
        console.log('Resposta do servidor:', responseData);

        // Limpe os campos de entrada
        setNome('');
        setCpf('');

        // Exiba o modal de sucesso
        setModalVisible(true);
      })
      .catch(error => {
        console.error('Erro ao enviar a requisição:', error);
      });
  };


  const closeModal = () => {
    setModalVisible(false);
    setModalErrorVisible(false);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Nome Completo:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={text => setNome(text)}
      />

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={text => setCpf(text)}
        keyboardType="numeric" // Define o teclado como numérico
      />

     

      <Button title="Cadastrar Item" onPress={handleCadastroItem} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Cadastro realizado!</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalCloseButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalErrorVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Nome e ou cpf invalidos!</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.modalCloseButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalCloseButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default NewParticipante;
