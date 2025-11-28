import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Image } from 'expo-image';

const professionalExperiences = [
    {
    title: 'Analista Júnior de NOC',
    company: 'Accenture',
    period: 'Julho de 2024 - Outubro de 2024',
    },

];
export default function Profissional(){

    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link", err));
    };

    return (
    // View container para agrupar os elementos
    <View style={styles.sectionContainer}>
      
      {/* Equivalente ao <h2>, estilizado como um título de seção (h2) */}
      <Text style={styles.h2}>Experiências Profissionais</Text>
      
      {/* Mapeia e renderiza cada experiência do array */}
      {professionalExperiences.map((exp, index) => (
        <Text key={index} style={styles.p}>
          {exp.title} — {exp.company} — {exp.period}
        </Text>
      ))}
      
    </View>
  );
}

// Definição dos estilos usando StyleSheet
const styles = StyleSheet.create({
  sectionContainer: {
    // Um container simples para a seção
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    // Margem superior para separar visualmente do conteúdo acima
    marginTop: 15, 
  },
  // Estilo para o cabeçalho (equivalente ao <h2>)
  h2: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#059669', // Cor verde para dar ênfase (Emerald)
    marginTop: 15, 
    marginBottom: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB', // Borda leve para separação
    paddingBottom: 2, 
  },
  // Estilo para o parágrafo (equivalente ao <p>)
  p: { 
    fontSize: 14, 
    color: '#4B5563', // Texto cinza escuro
    marginBottom: 10, 
    lineHeight: 20, // Melhor legibilidade
  },
});