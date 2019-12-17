import React, { Component } from "react";
import {
    ImageBackground,
    Image,
    Platform
} from "react-native";
import { Icon, Button, Text, Root } from "native-base";
import ColorsScheme from "../../settings/ColorsScheme";


export default class AboutScreen extends Component {
    render() {
        return (
            <Root>
                <ImageBackground
                    source={require('../../assets/fundo.jpg')}
                    style={{
                        width: '100%',
                        height: '100%',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}

                    opacity={0.3}
                >
                    <Image
                        style={{ width: 257.6, height: 124, marginBottom: 20 }}
                        source={require('../../assets/icone.png')}

                    />

                    <Text
                        style={{
                            textAlign: "center",
                            color: ColorsScheme.ASENT_COLOR,
                            fontSize:12
                        }}
                    >
                          <Text style={{ fontSize:14}}>Versāo</Text>
                          <Text style={{ fontSize:14}}> 1.0.1</Text>
                    </Text>
                    <Text
                        style={{
                            textAlign: "center",
                            padding: 5,
                            color: ColorsScheme.ASENT_COLOR,
                           
                        }}
                    >
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            padding: 10,
                            fontWeight: "bold",
                            fontSize:20
                        }}
                    >
                        Desenvolvido por:
                    </Text>
                    <Text>Diogo Machado</Text>
                    <Text>José Eduardo</Text>
                    <Text>Renee Junior</Text>
                    <Text>Willian Mariano</Text>

                </ImageBackground>
                <Button
                    transparent
                    onPress={() => this.props.navigation.goBack()}
                    style={[
                        {
                            position: "absolute"
                        },
                        Platform.OS == "ios" ? { top: 15 } : {}
                    ]}
                >
                    <Icon name="arrow-back" style={{ color: "black" }} />
                </Button>
            </Root>
        );
    }
}
