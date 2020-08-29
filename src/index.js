import React, { useState, useEffect } from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    api.get('projects').then(response =>{
      
      setProjects(response.data);
    });
  },[]);

  async function handleAddProject(){
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Carlos Kenny'
    });

    const project = response.data;

    setProjects([...projects, project]);

  }

  return (
      <> 
        <StatusBar barStyle="light-content" backgroundColor="#155515"/>
        
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({item: project })=> (
              <Text style={styles.projects}>{project.title}</Text>
            )}
          />
          <TouchableOpacity 
            activeOpacity={0.6} 
            style={styles.button} 
            onPress={handleAddProject}
            >
              <Text style={styles.textButton}>Adicionar Projeto</Text>
          </TouchableOpacity>

        </SafeAreaView>
        
        {/* <View style={styles.container}>
              {projects.map(project => (
                <Text style={styles.title} key={project.id}>{project.title}</Text>
                )
              )}
              </View>*/}
      </>
    );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#155515',
    
  },
  projects: {
    color: '#FFF',
    fontSize: 30,
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});