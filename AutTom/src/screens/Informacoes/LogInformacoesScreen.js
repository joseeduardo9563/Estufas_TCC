import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import {
    Spinner,
    Text,
    Content,
    Card,
    CardItem,
    Body,
} from 'native-base';
import Base from '../../components/Base';
import HeaderGoBack from '../../components/HeaderGoBack';
import RenderIf from '../../components/RenderIf';
import { NavigationEvents } from 'react-navigation';
import firebase from 'firebase';

export default class SelectIsoladaScreen extends Component {
    constructor(props) {
        super(props);
        const idUsuario = this.props.navigation.getParam('id',null);
        this.state = {
            idUsuario: idUsuario,
            arrObj: [],
            isLoading: false,
            valor: '',
            temperatura: '',
            ml: '',
            solo: '',
            ar: '',
            arrObjtemp: null,
            arrObjAr: null,
            arrObjML: null,
            arrObjsolo: null
        };
    }

    UNSAFE_componentWillMount() {
        this.doloading();
    }

    componentDidMount() {
        this.doloading();
    }

    doloading(){
        this.connection();
    }
    connection = async () => {
        var firebaseConfig = {
            apiKey: "**********************************",
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
        let arrsolo = [];
        let arrAr = [];
        let arrcons = [];
        let arrtemp = [];
        let obj = {};

        var nTemp = firebase.database().ref("Temperatura");
        nTemp.limitToLast(5).on("child_added", (snapshot) => {
            let obj = {
                temperatura: snapshot.val()
            }
            arrtemp.push(obj);
            this.setState({ temperatura: snapshot.val(), arrObjtemp: arrtemp });
        });

        var nAr = firebase.database().ref("Umidade");
        nAr.limitToLast(5).on("child_added", (snapshot) => {
            let obj = {
                umidadeAr: snapshot.val()
            }
            arrAr.push(obj);
            console.log(snapshot.val());
            this.setState({ ar: snapshot.val(), arrObjAr: arrAr });
        });

        var nML = firebase.database().ref("MiliLitros");
        nML.limitToLast(5).on("child_added", (snapshot) => {
            if(snapshot.val() != 0){
                obj = {
                    consumo: snapshot.val()
                }
            }
            arrcons.push(obj);
            console.log(snapshot.val());
            this.setState({ ml: snapshot.val(), arrObjML: arrcons });
        });

        var nSolo = firebase.database().ref("Umidade-solo");
        nSolo.limitToLast(5).on("child_added", (snapshot) => {
            let obj = {
                umidadeSolo: snapshot.val()
            }
            console.log(snapshot.val());
            arrsolo.push(obj);
            this.setState({ solo: snapshot.val(), arrObjsolo: arrsolo });
        });
        console.log("state", this.state);
    }

    umidSolo(umid) {
        const maximo = 820;
        const minimo = 365;

        let range = maximo - minimo;

        let porcentagem = Math.round(Math.abs(((umid - minimo) / range * 100) - 100));

        return porcentagem;
    }

    boolValue() {
        if (this.state.arrObjAr && this.state.arrObjML &&
            this.state.arrObjsolo && this.state.arrObjtemp) {
            return true;
        } else {
            return false;
        }
    }

    
    render() {
        // let P = 0;
        console.log("render state",this.state);
        return (
            <Base navigation={this.props.navigation}>

                <NavigationEvents
                    onWillFocus={payload => this.setState({ isLoading: false })}
                />
                <HeaderGoBack
                    navigation={this.props.navigation}
                    title={'Log de Informações'}
                    goBack={true}
                />
                <RenderIf condition={!this.state.isLoading} else={<Spinner />}>
                    <Content style={{ marginBottom: 55, marginRight: 20, backgroundColor: '#f5f5f5', width: '100%'}}>
                        {this.boolValue() ? (

                        
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isLoading}
                                    onRefresh={this.doloading.bind(this)}
                                />
                            }
                        >
                            <View style={{ margin: 20 }}>

                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}
                                >Últimos Logs</Text>
                            </View>

                            <View style={{
                                margin: 10
                            }}>
                                <Card transparent>
                                    {this.state.arrObjtemp.map((item,index) => {
                                        
                                        return (
                                            <CardItem style={{
                                                borderRadius: 10,
                                            }}
                                                key={index}
                                            >
                                                <Body>
                                                    
                                                    <Text style={{
        
                                                    }}>Temperatura interna no momento da irrigação:   {this.state.arrObjtemp[this.state.arrObjtemp.length - 1 - index].temperatura}°C</Text>
                                                    
                                                </Body>
        
                                            </CardItem>
                                            
                                        )
                                        
                                    })}
                                    
                                </Card>
                            </View>
                        </ScrollView>
                        ) : (
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
                        )}
                    </Content>
                </RenderIf>
            </Base>
        );
    }
}
