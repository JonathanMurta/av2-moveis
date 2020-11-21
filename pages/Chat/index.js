import React, {useState, useContext, useEffect} from 'react';
import {Text, ScrollView} from 'react-native';
import {Container, Texto, ContainerButtons, Button, ButtonText, Input, ContainerMessages, Message, ContainerMessageUser, TitleMessage} from './styles';

import {UsuarioContext} from '../../contexts/user';

import logoImg from '../../assets/logo.png'

import firebase from 'firebase';
import 'firebase/firestore';

const Chat = ({route, navigation}) =>
{
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(['']);
    const {user} = useContext(UsuarioContext);
    const {group} = route.params;

    const ListenUpdateMessages = (snap) =>
    {

        const data = snap.docs.map(doc =>
        {
            return {
                id: doc.id,
                ... doc.data()
            }
        })

        setMessages(data);
    }

    useEffect(() =>
    {
        const listener = firebase.firestore().collection('groupsMessage').where('group', '==', group).onSnapshot(ListenUpdateMessages)

        return () => listener()
    }, [])

    const handleAddMessages = () =>
    {
        if(newMessage == "")
        {
            console.warn('Preencha o campo')
            return
        }

        try
        {
            firebase.firestore().collection('groupsMessage').add({
                group: group,
                message: newMessage,
                user: user.email,
                date: Date.now()
            })
            setNewMessage("");
        } catch(err)
        {
            console.warn("Erro de comunicação, tente novamente mais tarde");
        }
    }

    return (
        <Container>
            {/* <Texto>{user.email}</Texto> */}
            <ScrollView style={{width: '100%'}}>
                <ContainerMessages>
                    {messages.map(message => (
                        message.user == user.email ?
                        <ContainerMessageUser style={{backgroundColor: '#054740'}}>
                            <Message  style={{textAlign: 'right'}}>{message.message}</Message>
                        </ContainerMessageUser>
                        :
                        <ContainerMessageUser>
                            <TitleMessage >{message.user}</TitleMessage>
                            <Message>{message.message}</Message>
                        </ContainerMessageUser>
                    ))}
                </ContainerMessages>
            </ScrollView>
            <ContainerButtons>
                <Input placeholder="Digite sua mensagem" onChangeText={text => setNewMessage(text)} value={newMessage} />
                <Button invert={true} onPress={() => {handleAddMessages()}}>
                    <ButtonText invert={true}>Enviar</ButtonText>
                </Button>
            </ContainerButtons>
        </Container>
    )
}

export default Chat