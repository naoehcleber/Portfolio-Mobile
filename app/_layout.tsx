import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarLabel: 'Home'
      }}/>
      <Tabs.Screen name="(tabs)/academica" options={{
        title: 'Perfil Acadêmico',
        tabBarLabel: 'Perfil Acadêmico'
      }}/>
      <Tabs.Screen name="(tabs)/profissional" options={{
        title: 'Perfil Profissional',
        tabBarLabel: 'Perfil Profissional'
      }}/>
      <Tabs.Screen name="(tabs)/jogo" options={{
        title: 'Jogo',
        tabBarLabel: 'Jogo da forca'
      }}/>
    </Tabs>
  );
}
