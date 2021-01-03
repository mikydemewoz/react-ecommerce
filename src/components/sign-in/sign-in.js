import React from 'react'
import CustomButton from '../custom-button/custom-button'
import FormInput from '../form-input/formInput'
import './sign-in-style.scss'
import {signInWithGoogle, auth} from '../../firebase/firebase.util'

class SignIn extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { email,password } = this.state

        try{
            await auth.signInWithEmailAndPassword(email,password)
            this.setState({ email: '', password: '' })
        }catch(error){
            console.error(error)
        }
        
    }

    handleChange = event => {
        const { value, name } = event.target

        this.setState({[name]: value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email' 
                    type='email' 
                    value={this.state.email} 
                    handleChange={this.handleChange}
                    label='email'
                    required
                     />

                    <FormInput 
                    name='password' 
                    type='password' 
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    label='password'
                    required
                     />

                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>{' '}Sign in with Google{' '}</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn