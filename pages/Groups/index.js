import React, {useState, useContext, useEffect} from 'react';
import {Text} from 'react-native';
import {Container, Texto, ContainerGroupsUser, ButtonArea} from './styles';
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
    // const selectGroup = false
    
    // firebase.firestore().collection("groupsUser").where('user', '==', user.email).get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach(function(doc) {
    //         console.warn(doc.id, " => ", doc.data());
            
    //     });
    // })

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

    // const enterGroup = (idGroup) =>
    // {
    //     console.warn(idGroup)
    // }
    
    return (
        <Container>
            {/* <Texto>{user.email}</Texto> */}
            {groups.map(groups => (
                <ContainerGroupsUser style={{ backgroundColor: groups.color}} >
                    <ButtonArea onPress={() => {navigation.navigate('Chat', {group: groups.id})}}>
                        <Texto>{groups.name}</Texto>
                    </ButtonArea>
                </ContainerGroupsUser>
            ))}
        </Container>
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
        </Stack.Navigator>
    )    
}