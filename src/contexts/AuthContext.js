import React, { useContext, useState, useEffect } from 'react';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

//Context creation
const AuthContext = React.createContext();

//Get acces to the Auth Context from the useAuth function
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider( {children} ){

    //Usestate hook to know at all time which is the active user
    const [currentUser, setCurrentUser] = useState();

    //Firebase login with google
    function login(){

        //When login is called, we launch the mecanism of sign in with google
        signInWithPopup(auth, provider).then((result) => {

            //Only4 once the user is authenticate, we can then verify he has the right email domain.
            if(result.user.email.split("@")[1] !== "smcq.qc.ca"){
                //If he doesn't, then we log him out 
                logout();
            } else {
                console.log("signinwithpopup worked");
            }

        }).catch((error) => {
            console.log(error);
        })
    }

    function logout(){
        try {
            return auth.signOut()
        } catch(error){
            //Message to create
        }
    }

    //Firebase notify you when the user gets set
    useEffect(() => {

        //gonna be called when signInWithPopup is called
        //this auth.onAuthStateChange, when it is called, return
        //a method that unsuscribe us from the listener whenever
        //we unmount
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        //make sure we unsuscribe when we are done
        return unsubscribe;
    }, [])


    //Contain all the informations we want to provide with authentication
    const value = {
        currentUser,
        login,
        logout
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

