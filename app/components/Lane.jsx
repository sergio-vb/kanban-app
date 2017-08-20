import React from 'react';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Notes from './Notes';
import LaneHeader from './LaneHeader';

const Lane = ({
    lane, notes, NoteActions, LaneActions, ...props
}) => {

    const editNote = (id, task) => {
        NoteActions.update({id, task, editing: false});
    };
    // const addNote = e => {
    //     e.stopPropagation();
    //     const noteId = uuid.v4();

    //     NoteActions.create({
    //         id: noteId,
    //         task: 'New task'
    //     });
    //     LaneActions.attachToLane({
    //         laneId: lane.id,
    //         noteId
    //     });
    // };
    const deleteNote = (noteId, e) => {
        e.stopPropagation();

        LaneActions.detachFromLane({
            laneId: lane.id,
            noteId
        });
        NoteActions.delete(noteId);
    };
    const activateNoteEdit = id => {
        NoteActions.update({id, editing: true});
    };

    return (
        <div {...props}>
            {/* <div className="lane-header">
                <div className="lane-add-note">
                    <button onClick={addNote}>+</button>
                </div>
                <div className="lane-name">{lane.name}</div>
            </div> */}
            <LaneHeader lane={lane} />
            <Notes 
                notes={selectNotesByIds(notes, lane.notes)}
                onNoteClick={activateNoteEdit}
                onEdit={editNote}
                onDelete={deleteNote} />
        </div>
    );

};

function selectNotesByIds(allNotes, noteIds = []){

    return noteIds.reduce( (notes, id) => {
        //Concatenate possible matching ids to the result
        return notes.concat(allNotes.filter(note => note.id === id));
    }, []);

}

export default connect(
    ({notes}) => ({
        notes
    }), {
        NoteActions,
        LaneActions
    }
)(Lane)