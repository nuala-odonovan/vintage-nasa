import React from 'react'

export default class Test extends React.Component {
    constructor(){
        super()
    }

    render(){
        return(
            <button onClick={() => console.log('clicked')}>TEST</button>
        )
    }
}