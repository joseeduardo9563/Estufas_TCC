import React, { Component } from 'react';
import {
    View,
    Platform,
    RefreshControl,
    ScrollView
} from 'react-native';
import {
    Spinner,
    Text,
    Content,
    H3,
    Row,
    Col,
    Grid
} from 'native-base';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import RenderIf from '../../components/RenderIf';
import { NavigationEvents } from 'react-navigation';
import firebase from 'firebase';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const idUsuario = this.props.navigation.getParam('id', null);
        this.state = {
            isLoading: false,
            valor: '',
            temperatura: '',
            ml: '',
            solo: '',
            ar: '',
        };
    }
    _doFetch = async url =>
        fetch(url)
            .then(response => response.json())
            .then(responseJson => responseJson)
            .catch(error => {
                console.error(error);
            });

    // getCategoria(){

    // }

    UNSAFE_componentWillMount() {
        this.doloading();
    }

    componentDidMount() {
        this.doloading();
    }

    doloading() {
        this.connection();
    }

    connection = async () => {
        var firebaseConfig = {
            apiKey: "********************************",
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

        this.setState({ isloading: false });

        var nTemp = firebase.database().ref("Temperatura");
        nTemp.limitToLast(1).on("child_added", (snapshot) => {
            this.setState({ temperatura: snapshot.val() });
        });

        var nAr = firebase.database().ref("Umidade");
        nAr.limitToLast(1).on("child_added", (snapshot) => {
            console.log(snapshot.val());
            this.setState({ ar: snapshot.val() });
        });

        var nML = firebase.database().ref("MiliLitros");
        nML.limitToLast(1).on("child_added", (snapshot) => {
            console.log(snapshot.val());
            if(snapshot.val()!== 0) {
                this.setState({ ml: snapshot.val() });
            }
            
        });

        var nSolo = firebase.database().ref("Umidade-solo");
        nSolo.limitToLast(1).on("child_added", (snapshot) => {
            console.log(snapshot.val());
            this.setState({ solo: snapshot.val() });
        });
        console.log("state", this.state);
    }

    umidSolo() {
        const maximo = 820;
        const minimo = 365;

        let range = maximo - minimo;

        let porcentagem = Math.round(Math.abs(((this.state.solo - minimo) / range * 100) - 100));

        return porcentagem;
    }

    boolValue() {
        if (this.state.temperatura != "" && this.state.ml != "" &&
            this.state.solo != "" && this.state.ar != "") {
            return true;
        } else {
            return false;
        }
    }

    consumo(){
        if(this.state.ml >= 1000){
            return Math.round(this.state.ml / 1000);
        } else {
            return Math.round(this.state.ml);
        }
    }

    render() {
        return (
            <Base navigation={this.props.navigation}>

                <NavigationEvents
                    onWillFocus={payload => this.setState({ isLoading: false })}
                />
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'AutTom'}
                    goBack={false}
                />
                <RenderIf condition={!this.state.isLoading} else={
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 105
                        }}
                    >
                        <View style={{ flexDirection: "column" }}>
                            {Platform.OS == "ios" ? <Spinner /> :
                                <Spinner
                                    size={85}
                                    color={"#ffc90d"}
                                    Container={{ Content: 'center' }}
                                />

                            }
                            <Text style={{ color: '#000000', textAlign: "center" }}>Carregando...</Text>
                        </View>

                    </View>
                }>

                    <Content style={{ marginBottom: 55, marginRight: 20, width: '100%' }}>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isLoading}
                                        onRefresh={this.doloading.bind(this)}
                                    />
                                }
                            >
                                <View style={{ margin: 20 }}>
                                    <H3
                                        style={{
                                            fontWeight: 'bold',
                                            color: '#000000'
                                        }}
                                    >
                                        BEM VINDO AO AUTTOM
                                    </H3>
                                    <Text style={{ fontSize: 12 }}>
                                        Informações principais da estufa
                                    </Text>
                                </View>

                                <View style={{ margin: 20 }}>

                                    <Grid>
                                        {/* <Row style={{
                                    padding: 10
                                }}>
                                    <Col>
                                        <Text>Hora Atual: </Text>
                                    </Col>

                                    <Col>
                                        <Text>13:45</Text>
                                    </Col>
                                </Row>
                                <Row></Row> */}

                                        <Row style={{
                                            padding: 10
                                        }}>
                                            <Col>
                                                <Text>Temperatura: </Text>
                                            </Col>

                                            <Col>
                                                <Text>{this.state.temperatura}°C</Text>
                                                {/* <Text>21°C</Text> */}
                                            </Col>
                                        </Row>

                                        <Row style={{
                                            padding: 10
                                        }}>
                                            <Col>
                                                <Text>Umidade do solo: </Text>
                                            </Col>

                                            <Col>
                                                {/* <Text>80%</Text> */}
                                                <Text>{this.umidSolo()}%</Text>
                                            </Col>
                                        </Row>

                                        <Row style={{
                                            padding: 10
                                        }}>
                                            <Col>
                                                <Text>Umidade do ar : </Text>
                                            </Col>

                                            <Col>
                                                {/* <Text>72%</Text> */}
                                                <Text>{this.state.ar}%</Text>
                                            </Col>
                                        </Row>

                                        <Row style={{
                                            padding: 10
                                        }}>
                                            <Col>
                                                <Text>Consumo de água: </Text>
                                            </Col>

                                            <Col>
                                                <Text>{this.consumo()} {this.state.ml >= 1000 ? "L" : "ML"}</Text>
                                                {/* <Text>43 L</Text> */}
                                            </Col>
                                        </Row>


                                        {/* <Row style={{
                                        padding: 10
                                    }}>
                                        <Col>
                                            <Text>Status de funcionamento: </Text>
                                        </Col>

                                        <Col>
                                            <Text>Ativado</Text>
                                        </Col>
                                    </Row> */}

                                    </Grid>
                                </View>
                            </ScrollView>
                        
                    </Content>
                </RenderIf>
            </Base>
        );
    }
}
