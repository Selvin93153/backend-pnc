// src/screens/AboutProject.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutProject = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sistema de Control de Armas y Equipo Táctico</Text>
      <Text style={styles.subtitle}>PNC Guatemala – Delegación Antinarcótica</Text>
      <Text style={styles.description}>
        Este sistema informático permite gestionar el registro, asignación y control del armamento
        y equipo táctico utilizado por la Policía Nacional Civil (PNC) en la Delegación
        Antinarcótica de Ciudad Pedro de Alvarado, Jutiapa.
        {'\n\n'}
        El sistema fue desarrollado como un prototipo utilizando tecnologías modernas como React,
        Node.js (NestJS), PostgreSQL y Docker, e incluye autenticación basada en roles para mayor
        seguridad.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0a3d62',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#3c6382',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2f3640',
  },
});

export default AboutProject;
