import React from 'react';
import moment from 'moment'

export default function Book(props) {
    return(
        <div className='book'>
            <h2>{props.title}</h2>
            <div className='book_author'>
                by {props.author}
            </div>
            <div className='book_publisher'>
                Published by: {props.publisher}
                on {moment(props.published_date).format('DD MM YYY')}
            </div>
            <div className='book_description'>
                {props.description}
            </div>
            <div className='book_details'>
                Rank {props.rank} this week
            </div>
        </div>
    )
}