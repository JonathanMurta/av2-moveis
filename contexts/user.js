import React, {createContext, useState, useEffect} from 'react';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const UsuarioContext = createContext({});
const UsuarioProvider = ({children}) =>
{
    const [user, setUser] = useState(false);

    const ListenAuth = (userState) =>
    {
        setUser(userState)
    }

    useEffect(() =>
    {
        const listener = firebase.auth().onAuthStateChanged(ListenAuth);
        return listener;
    }, [])

    const signIn = (email, password) =>
    {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error)
        {
            console.warn("Usuário ou senha incorretos!");
        });
    }

    const signUp = (email, password) =>
    {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(resp => 
        {
            console.warn("Usuário cadastrado com sucesso!")
        })
        .catch(err =>
        {
            console.warn("Usuário já existente!");
        })
    }

    const signOut = () =>
    {
        firebase.auth().signOut()
        .then(resp => 
        {
            console.warn('Usuário deslogado com sucesso!')
        })
        .catch(err =>
        {
            console.warn(err)
        })
    }

    return (
        <UsuarioContext.Provider value={{user, signIn, signUp, signOut}}>
            {children}
        </UsuarioContext.Provider>
    )
}

export {UsuarioContext, UsuarioProvider}