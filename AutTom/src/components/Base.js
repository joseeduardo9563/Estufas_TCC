import React, { Component } from 'react';
import { Linking, AsyncStorage } from 'react-native';
import { Drawer, Root, Container, Text, View } from 'native-base';

import SideBar from './SideBar';
import MyFooter from './MyFooter';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ColorsScheme from '../settings/ColorsScheme';
import Share from 'react-native-share';
import { NavigationEvents } from 'react-navigation'

Drawer.defaultProps.styles.mainOverlay.elevation = 0;

export default class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            isVisibleIR: false
        };
    }

    closeDrawer = () => {
        this.drawer._root.close();
    };

    openDrawer = () => {
        this.drawer._root.open();
    };
    openModal = () => {
        this.closeDrawer();
        this.setState({ isVisible: true });
    };
    closeModal = () => {
        this.setState({ isVisible: false });
    };
    openModalIR = () => {
        this.closeDrawer();
        this.setState({ isVisibleIR: true });
    };
    closeModalIR = () => {
        this.setState({ isVisibleIR: false });
    };

    render() {
        return (
            
                
                <Drawer
                    ref={ref => {
                        this.drawer = ref;
                    }}
                    content={
                        <SideBar
                            navigation={this.props.navigation}
                            openModal={this.openModal.bind(this)}
                            openModalIR={this.openModalIR.bind(this)}
                        />
                    }
                    onClose={() => this.closeDrawer()}
                >
                    <Root>

                        <Container style={{ backgroundColor: '#f8f8f8' }}>
                            {this.props.children}
                        </Container>
                        <MyFooter
                            openModal={this.openModal.bind(this)}
                            navigation={this.props.navigation}
                            openDrawer={this.openDrawer}
                        />
                    </Root>
                </Drawer>
            
        );
    }
}
