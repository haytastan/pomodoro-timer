export const createPomodoro = (pomodoro) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase['profile'];
        const userId = getState().firebase['auth']['uid'];
        firestore.collection('pomodoros').add({
            session_type: pomodoro.session,
            description: '',
            userId: userId,
            createdAt: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_POMODORO', pomodoro })
        }).catch((err) => {
            dispatch({ type: 'CREATE_POMODORO_ERROR', err });
        })
    }
}