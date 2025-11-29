import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Image } from 'expo-image';

export default function Sobre(){

    return(
        <ScrollView>
            <Text style={styles.sectionTitle}>Tecnologias Usadas</Text>
            <View>
                <Text style={styles.h2}> React-Native </Text>
                <Image source={require('../../assets/images/icon.png')}/>
                <Text style={styles.h2}> Expo Go </Text>
                <Image source={require('../../assets/images/react-logo.png')}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 15,
    paddingHorizontal: 20, // Alinha o título com o padding dos cards
  },
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
});