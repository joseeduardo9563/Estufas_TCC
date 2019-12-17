import React from 'react';
import {
    View,
    StatusBar,
    Image,
    ToastAndroid
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {
    Root,
    Content,
    H3,
    Form,
    Item,
    Input,
    Button,
    Text,
} from 'native-base';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    
    constructor() {
        super();
        this.state = {
            login: '',
            senha: '',
        }
    }

    UNSAFE_componentWillMount() {
        this.connection();
    }

    componentDidMount() { 
        this.connection();
    }

    connection = async () => {
        var firebaseConfig = {
            apiKey: "************************************",
            authDomain: "project-tcc-6ecd6.firebaseapp.com",
            databaseURL: "https://project-tcc-6ecd6.firebaseio.com",
            projectId: "project-tcc-6ecd6",
            storageBucket: "project-tcc-6ecd6.appspot.com",
            messagingSenderId: "310433900699",
            appId: "1:310433900699:web:859204a10b8142f3be7e3e",
            measurementId: "G-LZ6TQWE8BJ"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    auth = async () => {
        try{
            const user = await firebase.auth().signInWithEmailAndPassword(this.state.login, this.state.senha);

            AsyncStorage.setItem(
                "User",
                JSON.stringify(this.state.login, this.state.senha)
            ).then(() => {
                this.props.navigation.navigate("Home");
            });
        } catch(err){
            console.log(err);
            ToastAndroid.show('Email ou senha errada.',3000);
        }
        
    }

    render() {
        return (
            <Root>
                <StatusBar
                    backgroundColor={"#000000"}
                    barStyle="light-content"
                />
                    <Content style={{ width: '100%' }}>
                        <View
                            style={[
                                {
                                    padding: 20,
                                    marginTop: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }
                            ]}
                        >
                            <Image
                                style={{ width: 250, height: 124 }}
                                source={require('../../assets/icone.png')}
                            />
                        </View>
                        <H3
                            style={{
                                padding: 10,
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            CONTROLE E AUTOMAÇÃO
                        </H3>
                        <Form style={{ padding: 10 }}>
                            <Item
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Text style={{ marginBottom: -13 }}>
                                    Login:
                                </Text>
                                <Input
                                    style={{
                                        width: '100%',
                                        marginTop: 10,
                                        marginBottom: -10
                                    }}
                                    keyboardType={'email-address'}
                                    onChangeText={val =>
                                        this.setState({ login: val })
                                    }
                                />
                            </Item>
                            <Item
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingTop: 10
                                }}
                            >
                                <Text style={{ marginBottom: -13 }}>
                                    Senha:
                                </Text>
                                <Input
                                    secureTextEntry
                                    style={{
                                        width: '100%',
                                        marginTop: 10,
                                        marginBottom: -10
                                    }}
                                    onChangeText={val =>
                                        this.setState({ senha: val })
                                    }
                                />
                            </Item>
                         

                                <Button
                                    style={{
                                    
                                        margin: 10,
                                        backgroundColor:
                                            "#ffc90d"
                                    }}

                                    block
                                    rounded
                                    
                                    // onPress={() => this.login()}
                                    onPress={() => this.auth()}
                                >
                                    <Text
                                        style={{
                                            alignItems: "center",
                                            color: "#000000"
                                        }}
                                    >Entrar</Text>
                                </Button>
                             
                           
                           
                        </Form>               
                    </Content>
            </Root>
        )
    }
}