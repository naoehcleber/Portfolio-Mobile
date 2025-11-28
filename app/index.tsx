import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Image } from 'expo-image';

export default function Index() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link", err));
  };
  
  return (
     <ScrollView style={styles.container}>
      
      
      <View style={styles.main}>
        
        {/* Seção Pessoal */}
        <View style={styles.personal}>
          
          {/* Usa o componente Image placeholder */}
          
          <Image style={styles.pfpContainer} source={require('../assets/images/pfp.png')}/>
          
          
          <Text style={styles.h1}>João Victor Rocha Fernandes</Text>
          <Text style={styles.p}>Estudante de ciência da computação na UNICAP. Desenvolvedor Fullstack. Interesse em Redes de computadores, DevOps e Infraestrutura.</Text>
          
          <View style={styles.socialLinks}>
            {/* Ícones com TouchableOpacity para interação */}
            <TouchableOpacity onPress={() => openLink("https://github.com/naoehcleber")}>
              <FontAwesome5 name="github" size={30} color="#1F2937" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink("https://www.linkedin.com/in/joão-victor-rocha-980a12290")}>
              <FontAwesome5 name="linkedin" size={30} color="#4F46E5" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        
        
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Container principal, ocupa toda a tela.
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Cor de fundo suave (semelhante ao que Taildwind faria)
  },
  
  // Estilo para o NavBar (simulação)
  navBar: {
    padding: 15,
    backgroundColor: '#4F46E5', // Fundo roxo
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40, // Ajuste para a barra de status
    borderBottomWidth: 3,
    borderBottomColor: '#3730A3',
  },
  navText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  
  // Layout principal do conteúdo
  main: {
    padding: 20,
    gap: 30, // Espaçamento entre as seções pessoal e profissional
  },
  
  // Seção Pessoal (Foto e Links)
  personal: {
    alignItems: 'center', // Centraliza a foto e o texto
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  // Container/Simulação da PFP
  pfpContainer: {
    width: 150,
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#4F46E5', // Fundo placeholder
    alignItems: 'center',
    justifyContent: 'center',
  },
  pfpText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 20,
  },
  icon: {
    padding: 5,
  },
  
  // Seção Profissional (Currículo)
  professional: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5', // Roxo como destaque para os títulos
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 2,
  },
  p: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 10,
    lineHeight: 20,
  },
  
  // Estilos para o componente Projects (Simulado)
  projectsContainer: {
    marginTop: 5,
    paddingLeft: 10,
  },
  projectItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: 'bold',
    marginTop: 8,
  }
});


