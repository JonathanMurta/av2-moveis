import React, {useState, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import {Container, Texto, ContainerGroupsUser, ButtonArea, ButtonAbsolutePlus, ContainerSelectGroups, TextoSelectGroups, ContainerGroupsUserSelectGroups, ButtonAreaSelectGroups} from './styles';
import Chat from '../Chat'
import { createStackNavigator } from '@react-navigation/stack';

import {UsuarioContext} from '../../contexts/user';

import logoImg from '../../assets/logo.png'

import firebase from 'firebase';
import 'firebase/firestore';

const Groups = ({navigation}) =>
{
    const {user} = useContext(UsuarioContext);
    const [groups, setGroups] = useState(['']);

    useEffect(() =>
    {
        const listener = firebase.firestore().collection('myGroups').onSnapshot((snap) =>
        {
            snap.docs.map(doc =>
            {
                firebase.firestore().collection('groups').where('id', '==', doc.data().idGroup).onSnapshot((snap) =>
                {
                    const data = snap.docs.map(doc =>
                    {
                        return {
                            id: doc.id,
                            ... doc.data()
                        }
                    })

                    setGroups(data);
                })
            })
        })

        return () => listener()
    }, [])
    
    return (
        <Container>
            {groups.map(groups => (
                <ContainerGroupsUser style={{ backgroundColor: groups.color}} >
                    <ButtonArea onPress={() => {navigation.navigate('Chat', {group: groups.id})}}>
                        <Texto>{groups.name}</Texto>
                    </ButtonArea>
                </ContainerGroupsUser>
            ))}
            <ButtonAbsolutePlus onPress={() => {navigation.navigate('Selecionar Grupos')}}>+</ButtonAbsolutePlus>
        </Container>
    )
}

const SelectGroups = () =>
{
    const {user} = useContext(UsuarioContext);
    const [groups, setGroups] = useState(['']);

    useEffect(() =>
    {
        const listener = firebase.firestore().collection('groups').onSnapshot((snap) =>
        {
            const data = snap.docs.map(doc =>
            {
                return {
                    id: doc.id,
                    ... doc.data()
                }
            })
    
            setGroups(data);
        })

        return () => listener()
    }, [])

    const addGroup = (group) =>
    {
        firebase.firestore().collection('myGroups').where('user', '==', user.email).where('idGroup', '==', group).get().then(snap =>
        {
            if(!snap.empty)
                console.warn("Você já está nesse grupo!")
            else
            {
                firebase.firestore().collection('myGroups').add({
                    idGroup: group,
                    user: user.email
                })
                console.warn("Grupo adicionado!")
            }
        })
    }
    
    return (
        <ContainerSelectGroups>
            {groups.map(groups => (
                <ContainerGroupsUserSelectGroups style={{ backgroundColor: groups.color}} >
                    <ButtonAreaSelectGroups onPress={() => {addGroup(groups.id)}}>
                        <TextoSelectGroups>{groups.name}</TextoSelectGroups>
                    </ButtonAreaSelectGroups>
                </ContainerGroupsUserSelectGroups>
            ))}
        </ContainerSelectGroups>
    )
}

const Stack = createStackNavigator();

// export default Groups

export default () =>
{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Grupos" component={Groups} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Selecionar Grupos" component={SelectGroups} />
        </Stack.Navigator>
    )    
}