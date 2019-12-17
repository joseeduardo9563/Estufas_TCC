import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/home/HomeScreen';
import LogInformacoesScreen from './src/screens/Informacoes/LogInformacoesScreen';
import LoginScreen from './src/screens/Login/LoginScreen';
import AboutScreen from './src/screens/About/AboutScreen';
const AppNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    LogInformacoes: { screen: LogInformacoesScreen },
    About: { screen: AboutScreen },
    Home: { screen: HomeScreen },
    // Select: { screen: SelectScreen },
    // Inscricao: { screen: InscricaoScreen },
    // CadastroEvento: { screen: CadastroEventoScreen },
    // CadastroCategoria: { screen: CadastroCategoriaScreen },
    // Listapessoa: { screen: listapessoaScreen },
    // Evento: { screen: EventoScreen },
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false
    }
  }
)

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    constructor(prop) {
        super(prop);
    }

    render() {
        return <AppContainer />;
    }
}