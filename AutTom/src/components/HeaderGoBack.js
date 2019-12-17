import React, { Component } from "react";
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    Text
} from "native-base";
import RenderIf from './RenderIf';

export default class HeaderGoBack extends React.Component {
    render() {
        return (
            <Header
                androidStatusBarColor={"#000000"}
                style={{ backgroundColor: "#ffc90d" }}
            >
                <RenderIf condition={this.props.goBack} else={
                    <Left>
                        
                    </Left>
                }>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" style={{ color: "white" }} />
                        </Button>
                    </Left>
                </RenderIf>
                <Body style={{ flex: 3 }}>
                    <Title style={{ color: "white" }}>{this.props.title}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
