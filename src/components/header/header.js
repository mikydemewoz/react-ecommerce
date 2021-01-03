import React from 'react'
import { Link } from 'react-router-dom'
import './header.style.scss'
import { ReactComponent as Logo } from '../../assets/4.3 crown.svg.svg'
import {auth} from '../../firebase/firebase.util'
import { connect } from 'react-redux'
import CartIcon from '../cart-icon/cart-icon'
import CartDropdown from '../cart-dropdown/cart-dropdown'
import {createStructuredSelector} from 'reselect'
import {selectCartHidden} from '../../reducer/cart-reducer/cart.selectors'
import {selectCurrentUser} from '../../reducer/user-reducer/user.selector'

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop' >SHOP</Link>
            <Link className='option' to='/contact' >CONTACT</Link>
            {
                currentUser?
                <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcon/>
        </div>
        {
            hidden?null:<CartDropdown/>
        }
    </div>
)

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)