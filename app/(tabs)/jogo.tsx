import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions, TextInput, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';




// Lista de palavras em português
const words = [
    "lamente", "surreal", "parede", "harmonia", "mascote", "menina", 
    "desfrutar", "caderno", "caixa", "skis", "plantas", "estribo", 
    "abaixo", "manchar", "acumular", "conhaque", "canal", "bata", 
    "segundo", "molas", "integral", "rosto", "voto", "quarto", 
    "permanente", "vinhedo", "departamento", "cidade", "mapas", 
    "palmeiras", "espada",
];

// Lógica para escolher uma palavra aleatória
const chooseWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};

const MAX_TRIES = 7;

// --- Imagens da Forca (simuladas por texto ou emoji para simplicidade RN) ---
// Em um projeto real, você usaria SVGs ou imagens, mas aqui simplificamos a representação.
const HangmanArt = (triesLeft) => {
    const errorsMade = MAX_TRIES - triesLeft;

    // Os estágios estão ordenados pelo número de erros cometidos (0 a 7)
    const stages = [
        `  _____  \n |/      \n |       \n |       \n |       \n |       \n---`, // 0 Erros (Poste Vazio)
        `  _____  \n |/    | \n |       \n |       \n |       \n |       \n---`, // 1 Erro (Topo)
        `  _____  \n |/    | \n |    ( )\n |       \n |       \n |       \n---`, // 2 Erros (Cabeça)
        `  _____  \n |/    | \n |    ( )\n |     | \n |     | \n |       \n---`, // 3 Erros (Tronco)
        `  _____  \n |/    | \n |    ( )\n |    /| \n |     | \n |       \n---`, // 4 Erros (Braço Esq)
        `  _____  \n |/    | \n |    ( )\n |    /|\\\n |     | \n |       \n---`, // 5 Erros (Braço Dir)
        `  _____  \n |/    | \n |    ( )\n |    /|\\\n |     | \n |    /  \n---`, // 6 Erros (Perna Esq)
        `  _____  \n |/    | \n |    ( )\n |    /|\\\n |     | \n |    / \\\n---`, // 7 Erros (Perna Dir - DERROTA)
    ];

    // errorsMade vai de 0 (7 tentativas restantes) a 7 (0 tentativas restantes)
    return stages[errorsMade] || stages[MAX_TRIES];
};


export default function Jogo (){
    // Estados do Jogo
    const [palavra, setPalavra] = useState(chooseWord());
    const [display, setDisplay] = useState(Array(palavra.length).fill("_"));
    const [received, setReceived] = useState("");
    const [tentativas, setTentativas] = useState(MAX_TRIES);
    const [mensagem, setMensagem] = useState("");
    const [erros, setErros] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    // Função para tratar a entrada da letra
    const updateState = () => {
        const input = received.toLowerCase().trim();
        
        if (gameOver || tentativas === 0) return;
        if (!input || input.length !== 1 || !/^[a-z]$/.test(input)) {
            // Em React Native, usamos Alert ou Modal, não `window.alert()`
            alert("Erro: Por favor, digite apenas uma letra válida (a-z).");
            setReceived("");
            return;
        }

        if (display.includes(input) || erros.includes(input)) {
            alert(`Atenção: A letra '${input.toUpperCase()}' já foi tentada!`);
            setReceived("");
            return;
        }

        let found = false;
        const novoDisplay = display.map((d, i) => {
            if (palavra[i] === input) {
                found = true;
                return input;
            }
            return d;
        });
        
        setDisplay(novoDisplay);

        if (!found) {
            setTentativas(t => t - 1);
            setErros(prev => [...prev, input].sort());
        }
        
        setReceived("");
    };

    // Efeito para verificar o FIM do Jogo: Derrota
    useEffect(() => {
        if (tentativas === 0 && !gameOver) {
            setMensagem(`Perdeu! A palavra era: ${palavra.toUpperCase()}`);
            setGameOver(true);
        }
    }, [tentativas, palavra, gameOver]);

    // Efeito para verificar o FIM do Jogo: Vitória
    useEffect(() => {
        if (display.join("") === palavra && !gameOver) {
            setMensagem("🎉 Parabéns, você ganhou!");
            setGameOver(true);
        }
    }, [display, palavra, gameOver]);

    // Função para reiniciar o jogo
    const resetGame = () => {
        const novaPalavra = chooseWord();
        setPalavra(novaPalavra);
        setDisplay(Array(novaPalavra.length).fill("_"));
        setTentativas(MAX_TRIES);
        setMensagem("");
        setReceived("");
        setErros([]);
        setGameOver(false);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Jogo da Forca</Text>
            
            {/* Display da Forca (Arte ASCII) */}
            <View style={styles.hangmanArtContainer}>
                <Text style={styles.hangmanArt}>{HangmanArt(tentativas)}</Text>
            </View>

            {/* Mensagem de Status */}
            <Text style={[styles.message, gameOver ? styles.messageGameOver : styles.messagePlaying]}>
                {mensagem || `Você tem ${tentativas} tentativas restantes.`}
            </Text>

            {/* Palavra a ser adivinhada */}
            <Text style={styles.wordDisplay}>
                {display.join(" ")}
            </Text>

            {/* Input e Botão de Envio (Somente se o jogo não tiver acabado) */}
            {!gameOver && tentativas > 0 ? (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Digite uma letra"
                        value={received}
                        onChangeText={setReceived}
                        maxLength={1}
                        autoCapitalize="none"
                        onSubmitEditing={updateState} // Permite enviar com a tecla enter/go
                        editable={!gameOver}
                    />
                    <TouchableOpacity 
                        style={styles.sendButton}
                        onPress={updateState}
                    >
                        <Text style={styles.sendButtonText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

            {/* Letras erradas */}
            <View style={styles.errorContainer}>
                <Text style={styles.errorLabel}>Letras Erradas:</Text>
                <Text style={styles.errorList}>{erros.join(" ").toUpperCase()}</Text>
            </View>
            
            {/* Botão de Reiniciar (Visível após o jogo terminar ou se o usuário quiser recomeçar) */}
            <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetGame}
            >
                <Text style={styles.resetButtonText}>
                    {gameOver ? "Jogar Novamente" : "Reiniciar Jogo"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

// Estilos usando StyleSheet do React Native
const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda a tela
        backgroundColor: '#F7F7F7',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 40 : 60, // Ajuste para status bar
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 32,
        fontWeight: '900',
        color: '#333',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    hangmanArtContainer: {
        backgroundColor: '#EFEFEF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        width: '100%',
        maxWidth: 200,
        alignItems: 'center',
    },
    hangmanArt: {
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', // Usar fonte monoespaçada para ASCII art
        fontSize: 16,
        lineHeight: 18,
        color: '#444',
        textAlign: 'left',
    },
    message: {
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    messagePlaying: {
        color: '#059669', // Verde para o estado normal/jogo
    },
    messageGameOver: {
        color: '#EF4444', // Vermelho para fim de jogo
        fontWeight: '800',
    },
    wordDisplay: {
        fontSize: 36,
        letterSpacing: 10,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 30,
        backgroundColor: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        elevation: 2,
    },
    inputContainer: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 300,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        flex: 1,
        height: 50,
        borderColor: '#D1D5DB',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        textAlign: 'center',
        marginRight: 10,
        backgroundColor: '#FFF',
    },
    sendButton: {
        backgroundColor: '#3B82F6', // Azul primário
        padding: 12,
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    errorContainer: {
        flexDirection: 'row',
        marginBottom: 30,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFE4E6', // Fundo vermelho claro
        borderRadius: 8,
    },
    errorLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#991B1B', // Vermelho escuro
        marginRight: 10,
    },
    errorList: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#EF4444',
        letterSpacing: 3,
    },
    resetButton: {
        backgroundColor: '#10B981', // Verde esmeralda para botão de ação
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 12,
        width: '80%',
        maxWidth: 300,
        marginTop: 20,
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    resetButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    }
});