export const createPomodoro = (pomodoro) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const profile = getState().firebase['profile'];
        const userId = getState().firebase['auth']['uid'];
        Date.prototype.getWeekNumber = function(){
            var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
            var dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
            return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
        };
        Date.prototype.getDayOfWeek = function(){

            var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
            var dayNum = d.getUTCDay() || 7;
            return dayNum
        }

        firestore.collection('pomodoros').add({
            session_type: pomodoro.session,
            description: '',
            userId: userId,
            createdAt: new Date(),
            weekNumOfYear: new Date().getWeekNumber(),
            dayNumOfWeek: new Date().getDayOfWeek()
        }).then( () => {
            dispatch({ type: 'CREATE_POMODORO', pomodoro })
        }).catch((err) => {
            dispatch({ type: 'CREATE_POMODORO_ERROR', err });
        })
    }
}

export const chengeUserSetting = (pomodoro) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
    }
}