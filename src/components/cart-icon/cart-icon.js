import React from 'react'

import { ReactComponent as ShoppingIcon } from '../../assets/11.2 shopping-bag.svg.svg'

import {connect} from 'react-redux'
import { selectCartItemsCount } from '../../reducer/cart-reducer/cart.selectors'
import { createStructuredSelector } from 'reselect'

import './cart-icon.style.scss'
import { toggleCartHidden } from '../../reducer/cart-reducer/cart.action'

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch =>({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps,mapDispatchToProps)(CartIcon)