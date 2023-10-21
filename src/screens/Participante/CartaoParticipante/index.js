import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function CartaoParticipante({ id, nome, cpf, onExcluir }) {
  const handleExcluir = () => {
    onExcluir(id);
  };

  return (
    <View style={styles.cartao}>
      <View style={styles.dados}>
        <Text style={styles.id}>{`ID: ${id}`}</Text>
        <Text style={styles.nome}>{`Nome: ${nome}`}</Text>
        <Text style={styles.cpf}>{`CPF: ${cpf}`}</Text>
      </View>
      <TouchableOpacity onPress={handleExcluir} style={styles.botaoExcluir}>
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dados: {
    flex: 1,
  },
  id: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nome: {
    fontSize: 16,
  },
  cpf: {
    fontSize: 14,
    color: "blue",
  },
  botaoExcluir: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  textoBotaoExcluir: {
    color: "white",
  },
});
