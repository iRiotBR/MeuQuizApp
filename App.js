import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, Image, TextInput } from 'react-native'; // Importa TextInput aqui
import { questions } from './src/questions';

const App = () => {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('black');

  const handleStart = () => {
    if (name.trim()) {
      setStarted(true);
      setFeedbackMessage('');
    } else {
      Alert.alert('Por favor, insira seu nome.');
    }
  };

  const handleOptionPress = (isCorrect) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection

    setSelectedOption(isCorrect ? 'correct' : 'incorrect');
    setFeedbackColor(isCorrect ? 'green' : 'red');
    setFeedbackMessage(isCorrect ? 'PARABÉNS! VOCÊ ACERTOU.' : 'OOPZ, VOCÊ ERROU.');

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setFeedbackMessage('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000); // 1 second delay before moving to the next question
  };

  const handleFinish = () => {
    Alert.alert(`Quiz Finalizado! Você acertou ${score} de ${questions.length} perguntas.`);
    setStarted(false);
    setName('');
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedbackMessage('');
  };

  if (!started) {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/adventurers_logo.png')} style={styles.logo} />
        <Text style={styles.title}>Bem-vindo ao Quiz dos Aventureiros!</Text>
        <Text style={styles.subtitle}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
        />
        <Button title="Começar" onPress={handleStart} />
      </View>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Finalizado!</Text>
        <Text style={styles.title}>Você acertou {score} de {questions.length} perguntas.</Text>
        <Button title="Reiniciar" onPress={handleFinish} />
      </View>
    );
  }

  const { question, options } = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            { backgroundColor: selectedOption === (option.isCorrect ? 'correct' : 'incorrect') ? feedbackColor : 'white' }
          ]}
          onPress={() => handleOptionPress(option.isCorrect)}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
      {feedbackMessage ? (
        <Text style={[styles.feedbackMessage, { color: feedbackColor }]}>{feedbackMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  feedbackMessage: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
