import React, {useState, useContext} from 'react';
import {Text, Image, ActivityIndicator} from 'react-native';
import {Container,
        CaixaLogin,
        Botao,
        BotaoTexto,
        ContainerBotoes,
        Input,
        InputTexto,
        ContainerButtons,
        Button,
        ButtonText,
        ForgotPassword,
        Logo,
        CaixaTextoChamada,
        TextoChamada,
        TextoGrupou} from './styles';

import logoImg from '../../assets/logo.png'

import {UsuarioContext} from '../../contexts/user'

const Login = () =>
{
    const {signIn, signUp} = useContext(UsuarioContext)
    const [currentButton, setCurrentButton] = useState('aluno');
    const [email, setEmail] = useState("jonathanfla0805@hotmail.com");
    const [password, setPassword] = useState("080598");
    const [carregando, setCarregando] = useState(false);

    function handleSignIn()
    {
        try
        {
            signIn(email, password)
        } catch(err)
        {
            console.warn(err);
        }
    }

    function handleSignUp()
    {
        setCarregando(true)
        try
        {
            signUp(email, password)
        } catch(err)
        {
            console.warn(err);
        } finally
        {
            setCarregando(false);
        }
        
    }

    return (
        <Container>
            <Logo>
                <Image source={logoImg} style={{width: 300, height: 100}} />
            </Logo>
            <CaixaTextoChamada>
                <TextoChamada>
                    Problemas para formar
                </TextoChamada>
                <TextoChamada>
                    um grupo de trabalho
                </TextoChamada>
                <TextoChamada>
                    O <TextoGrupou>Grupou! </TextoGrupou> resolve!
                </TextoChamada>
            </CaixaTextoChamada>
            <CaixaLogin>
                <ContainerBotoes>
                    <Botao onPress={() => {setCurrentButton('aluno')}} lastClick={currentButton == 'aluno' ? true : false}>
                        <BotaoTexto onPress={() => {setCurrentButton('aluno')}} lastClick={currentButton == 'aluno' ? true : false}>Aluno</BotaoTexto>
                    </Botao>
                    <Botao onPress={() => {setCurrentButton('professor')}} lastClick={currentButton == 'professor' ? true : false}>
                        <BotaoTexto onPress={() => {setCurrentButton('professor')}} lastClick={currentButton == 'professor' ? true : false}>Professor</BotaoTexto>
                    </Botao>
                </ContainerBotoes>
                <InputTexto>E-mail</InputTexto>
                <Input placeholder="Digite seu e-mail" onChangeText={text => setEmail(text)} value={email} />
                <Input placeholder="Digite sua senha" onChangeText={text => setPassword(text)} secureTextEntry={true} value={password} />
                <InputTexto>Senha</InputTexto>
                <ForgotPassword>
                    Esqueci minha senha
                </ForgotPassword>
                <ContainerButtons>
                    <Button invert={true} onPress={() => {handleSignUp()}} >
                    {carregando ?
                        <ActivityIndicator color="#ae1b73" /> :
                        <ButtonText invert={true}>Cadastre-se</ButtonText>
                    }
                    </Button>
                    <Button onPress={() => {handleSignIn()}}>
                        <ButtonText>Entrar</ButtonText>
                    </Button>
                </ContainerButtons>
            </CaixaLogin>
        </Container>
    )
}

export default Login