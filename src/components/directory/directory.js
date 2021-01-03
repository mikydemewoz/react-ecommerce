import React from 'react'
import MenuItem from '../menu-item/menuItem'
import './directory.style.scss'
import { selectDirectorySections } from '../../reducer/directory/directory.selector'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

 const Directory = ({sections}) => (
   <div className='directory-menu'>
     {
       sections.map(({ id, ...others }) => (
         <MenuItem key={id} {...others} />
       ))
     }
   </div>
 )

 const mapStateToProps = createStructuredSelector({
   sections: selectDirectorySections
 })

export default connect(mapStateToProps)(Directory)