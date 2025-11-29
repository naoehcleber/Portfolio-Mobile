import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.2;

const skillsList = [
    'Linguagens de programação: Python, JavaScript, Java, C/C++',
    'Banco de dados: MySQL, MariaDB, Postgres (relacionais) e MongoDB (não relacional)',
    'Frameworks: React, Django, Express, SpringBoot',
    'Ferramentas: Docker',
];

const ProjectCard = ({ title, description, imageUrl, githubUrl }) => {
  
  // Função para abrir o link do GitHub
  const handlePress = () => {
    // Usa a API Linking do React Native para abrir o URL no navegador externo
    Linking.openURL(githubUrl).catch(err => console.error("Couldn't load page", err));
  };

  // Observação: No React Native, não é possível usar URLs relativos (/images/...) 
  // para imagens. Você deve usar:
  // 1. Imagens locais (importadas) ou 
  // 2. URLs absolutas (http://...).
  // Para este exemplo, vou usar URLs de placeholder para simular.

  return (
    <View style={cardStyles.card}>
      
      {/* Imagem do Projeto - usa URL de placeholder como simulação */}
      <Image 
        source={{ uri: imageUrl }} 
        style={cardStyles.image}
        // Fallback: Se a imagem falhar, podemos mostrar um ícone ou um texto, mas 
        // para simplicidade, apenas tentaremos carregar.
      />
      
      <View style={cardStyles.body}>
        
        {/* Título do Cartão (equivalente ao Card.Title) */}
        <Text style={cardStyles.title}>{title}</Text>
        
        {/* Descrição do Projeto (equivalente ao Card.Text) */}
        <Text style={cardStyles.text}>{description}</Text>
        
        {/* Botão "Ver" (equivalente ao Link/Button) */}
        <TouchableOpacity 
          style={cardStyles.button} 
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={cardStyles.buttonText}>Ver</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};


export default function Academica(){
    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link", err));
    };

    const projectsData = [
    {
      title: "Pomodojo",
      description: "Projeto em Django para promover o Método de Estudos Pomodoro.",
      imageUrl: "https://placehold.co/400x150/059669/ffffff?text=Pomodojo", 
      githubUrl: "https://github.com/naoehcleber/Pomodojo"
    },
    {
      title: "PokeBolsa",
      description: "Projeto em React e NextJS simulando um mercado de ações com API de PokémonTCG.",
      imageUrl: "https://placehold.co/400x150/EF4444/ffffff?text=PokeBolsa",
      githubUrl: "https://github.com/Vinimtt/Pokebolsa"
    },
    {
      title: "Fórum",
      description: "Projeto em React e ExpressJS imitando um fórum de imagens com uso de MongoDB.",
      imageUrl: "https://placehold.co/400x150/3B82F6/ffffff?text=Fórum",
      githubUrl: "https://github.com/naoehcleber/Forum"
    },
  ];

    return(
        <ScrollView style={styles.sectionContainer}>
      
          {/* Equivalente ao <h2>, estilizado como um título de seção (h2) */}
          <Text style={styles.h2}>Formações Acadêmicas</Text>
          
          {/* Equivalente ao <p>, estilizado como um parágrafo (p) */}
          <Text style={styles.p}>
              Bacharelado em Ciência da Computação — 2023 - Atual
          </Text>
          <View style={styles.sectionContainer}>
      
      {/* Equivalente ao <h2>, estilizado como um título de seção (h2) */}
      <Text style={styles.h2}>Conhecimentos Técnicos</Text>
      
      {/* Container para a lista de habilidades */}
      <View style={styles.skillsContainer}>
        {/* Mapeia e renderiza cada habilidade como um item de lista simples */}
        {skillsList.map((skill, index) => (
          <View key={index} style={styles.listItem}>
            {/* Usa um ponto (•) para simular um marcador de lista */}
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.p}>{skill}</Text>
          </View>
        ))}
      </View>
      
        <View style={styles.container}>
      <Text style={styles.sectionTitle}>Portfólio de Projetos</Text>
      {/* ScrollView horizontal é o equivalente de CardGroup para layout de galeria em RN */}
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardGroup}
      >
        {projectsData.map((project, index) => (
          <ProjectCard 
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            githubUrl={project.githubUrl}
          />
        ))}
      </ScrollView>
    </View>
          </View>
  </ScrollView>

        
    )
}
const cardStyles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 20, // Espaçamento entre os cartões
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden', // Importante para o borderRadius funcionar na imagem
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8, // Sombra para Android
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  image: {
    width: '100%',
    height: 150, // Altura fixa para a imagem
    resizeMode: 'cover', // Garante que a imagem cubra a área
  },
  body: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#059669', // Cor verde Emerald
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto', // Empurra o botão para baixo (se o corpo for flexível)
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  sectionContainer: {
    // A simple container for the section, mimicking an area of the previous portfolio card
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  // Estilo para o cabeçalho (equivalente ao <h2>)
  h2: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#4F46E5', // Indigo color for emphasis
    marginTop: 15, 
    marginBottom: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB', // Light border for separation
    paddingBottom: 2, 
  },
  // Estilo para o parágrafo (equivalente ao <p>)
  p: { 
    fontSize: 14, 
    color: '#4B5563', // Dark gray text
    marginBottom: 10, 
    lineHeight: 20, // Improved readability
  },
   skillsContainer: {
    marginTop: 5,
  },
  listItem: {
    flexDirection: 'row', // Organiza o marcador (bullet) e o texto lado a lado
    marginBottom: 5, // Espaçamento entre os itens da lista
  },
  bullet: {
    fontSize: 14,
    color: '#4B5563',
    marginRight: 8, // Espaçamento entre o marcador e o texto
    fontWeight: 'bold',
    lineHeight: 20,
  },

  container: {
    paddingVertical: 20,
    backgroundColor: '#F3F4F6', // Fundo leve para destaque da seção
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15,
    paddingHorizontal: 20, // Alinha o título com o padding dos cards
  },
  cardGroup: {
    // Adiciona padding à esquerda para o primeiro cartão não ficar colado
    paddingHorizontal: 20, 
    paddingBottom: 10, // Espaço para a sombra inferior
  },
});