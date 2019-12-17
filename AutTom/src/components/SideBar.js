import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    AsyncStorage,
    TouchableHighlight,
    SectionList,
    Text,
    StyleSheet
} from 'react-native';

import { ListItem, Right, Left, Body } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome5';
import ComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const iconSize = 20;
const iconColor = '#666666';

class SideBarDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: {},
            hasUsuario: false
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('@usuario').then(val => {
            if (val) {
                this.setState({ usuario: JSON.parse(val), hasUsuario: true });
            }
        });
    }

    getMenuItems() {
        const { navigate } = this.props.navigation;

        let arr = [
            {
                title: 'Menu',
                data: [
                    {
                        type: 'item',
                        action: () => navigate('Home'),
                        icon: (
                            <Icon
                                solid
                                color={iconColor}
                                size={iconSize}
                                name={'home'}
                            />
                        ),
                        name: 'Home',
                        displayName: 'Início'
                    },

                    {
                        type: 'item',
                        action: () =>
                            navigate('LogInformacoes'),
                        icon: (
                            <Icon
                                color={iconColor}
                                size={iconSize}
                                name={'info'}
                            />
                        ),
                        displayName: 'Log de Informações',
                        name: 'LogInformacoes'
                    },
                    {
                        type: 'item',
                        action: () => navigate('About'),
                        icon: (
                            <Icon
                                color={iconColor}
                                size={iconSize}
                                name={'info-circle'}
                            />
                        ),
                        displayName: 'Sobre',
                        name: 'Sobre'
                    },

                    {
                        type: 'item',
                        action: () =>
                            navigate('Login'),
                        icon: (
                            <Icon
                                color={iconColor}
                                size={iconSize}
                                name={'times'}
                            />
                        ),
                        displayName: 'Sair',
                        name: 'Sair'
                    }
                ]
            },
        ];
        let obb1 = {
            type: 'item',
            action: () => navigate('Perfil'),
            icon: (
                <Icon solid color={iconColor} size={iconSize + 1} name={'user'} />
            ),
            displayName: 'Perfil',
            name: 'Perfil'
        };
        let obb2 = {

            type: 'item',

            action: () => {
                navigate('Carteirinha', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 2}
                    name={'id-card'}
                />
            ),
            displayName: 'Cartão virtual',
            name: 'Cartao virtual'
        };
        let obb3 = {
            type: 'item',
            action: () => this.props.openModalIR(),
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 1}
                    name={'hand-holding-usd'}
                />
            ),
            displayName: 'Imposto de Renda',
            name: 'Imposto de Renda'
        };

        let obb4 = {
            type: 'item',
            action: () => {
                navigate('Financeiro', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 3}
                    name={'money-bill'}
                />
            ),
            displayName: 'Financeiro',
            name: 'Financeiro'
        };

        let obb5 = {

            type: 'item',

            action: () => {
                navigate('Contrato', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize - 2}
                    name={'file-signature'}
                />
            ),
            displayName: 'Detalhes do Contrato',
            name: 'Contrato'
        };

        let obb6 = {

            type: 'item',
            action: () => {
                navigate('Utilizacoes2', {
                    data: this.state.usuario
                })
            },
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize + 7}
                    name={'clipboard-list'}
                />
            ),
            displayName: 'Utilizações',
            name: 'Utilizacoes'
        };

        let obb7 = {

            type: 'item',
            action: () =>
                AsyncStorage.clear().then(() => navigate('Select')),
            icon: (
                <Icon
                    solid
                    color={iconColor}
                    size={iconSize}
                    name={'sign-out-alt'}
                />
            ),
            displayName: 'Sair',
            name: 'Sair'
        };



        if (this.state.hasUsuario) {
            if(this.state.usuario.empresa == 250){
                arr[2].data.splice(-1, 0, obb1, obb2, obb3, obb4, obb5, obb6, obb7); // por aq tbm o obb3
            } else {
                arr[2].data.splice(-1, 0, obb1, obb2, obb5, obb6, obb7); // por aq tbm o obb3
            }
            
        }
        // else {
        //     arr[2].data.push(obb3);
        // }

        return arr;
    }

    renderItem(item) {
        return (
            <TouchableHighlight>
                <ListItem noBorder icon onPress={item.item.action}>
                    <Left>{item.item.icon}</Left>
                    <Body>
                        <Text>{item.item.displayName}</Text>
                    </Body>
                    <Right />
                </ListItem>
            </TouchableHighlight>
        );
    }

    renderSection(section) {
        return (
            <Text style={styles.sectionHeader}>{section.section.title}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/icone.png')}
                    style={{
                        height: 145,
                        width: '100%',
                        alignSelf: 'stretch',
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />

                <SectionList
                    style={{ marginTop: 122 }}
                    sections={this.getMenuItems()}
                    renderItem={item => this.renderItem(item)}
                    renderSectionHeader={section => this.renderSection(section)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white'
    },
    sectionHeader: {
        paddingTop: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 8,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44
    }
});

export default SideBarDrawer;
