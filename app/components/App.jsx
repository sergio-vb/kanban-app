import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';

export default class App extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            notes: [
                {
                    id: uuid.v4(),
                    task: 'Build Kan Ban'
                },
                {
                    id: uuid.v4(),
                    task: 'Do laundry'
                }
            ]
        };
    }

    render(){
        const {notes} = this.state;

        return (
            <div>
                <button onClick={() => console.log('Add note')}>+</button>
                <Notes notes={notes}/>
            </div>
        );
    }

}