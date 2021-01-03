import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import { selectCollectionsForPreview } from '../../reducer/shop/shop.selector'
import CollectionPreview from '../collection-preview/collection-preview'

import './collection-overview.style.scss'

const CollectionOverview = ({ collections })=> (
    <div className='collection-overview'>
        {
            collections.map(({ id, ...otherCollectionProps }) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ))
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview)