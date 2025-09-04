import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Esconder a barra de abas já que só temos uma tela
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Palavreco',
        }}
      />
    </Tabs>
  );
}
