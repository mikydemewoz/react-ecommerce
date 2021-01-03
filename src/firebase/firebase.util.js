import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDrIPjFnAv-PE4JVMmCynje6eQrRrOWRYo",
    authDomain: "addis-ecommerce.firebaseapp.com",
    projectId: "addis-ecommerce",
    storageBucket: "addis-ecommerce.appspot.com",
    messagingSenderId: "240715627906",
    appId: "1:240715627906:web:bfd4be5d0cebcbc701e39b",
    measurementId: "G-8DECXJJKBF"
}

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return
    
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await userRef.set({
                displayName,
                email,
                createdAt
            })
        }catch(error){
            console.log('error creating user',error.message)
        }
    }
    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase 