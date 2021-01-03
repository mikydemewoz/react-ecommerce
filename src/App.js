import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'

import HomePage from './pages/homePage/homePage'
import ShopPage from './pages/shop/shopPage'
import CheckoutPage from './pages/checkout/checkout'
import SignInSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up'
import Header from './components/header/header'
import { auth, createUserProfileDocument } from './firebase/firebase.util'
import { setCurrentUser } from './reducer/user-reducer/user.actions';
import { createStructuredSelector } from 'reselect'
import { selectCurrentUser } from './reducer/user-reducer/user.selector'



class App extends React.Component {
  
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
      }
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' 
          render={
            ()=> this.props.currentUser ? 
            (<Redirect to='/' />) :
            (<SignInSignUp/>)
          } />
        </Switch>
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
