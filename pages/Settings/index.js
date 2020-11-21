import React, {useState, useContext} from 'react';
import {Text} from 'react-native';
import {Container, ContainerButtons, Button, ButtonText} from './styles';

import {UsuarioContext} from '../../contexts/user';

import logoImg from '../../assets/logo.png'

const Settings = () =>
{
    const {signOut} = useContext(UsuarioContext)
    return (
        <Container>
           <ContainerButtons>
                <Button invert={true} onPress={() => {signOut()}}>
                    <ButtonText invert={true}>Sair</ButtonText>
                </Button>
            </ContainerButtons>
        </Container>
    )
}

export default Settings