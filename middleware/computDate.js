function getNow() {
    let dayNow = new Date().getDate()
    return dayNow
    let monthNow = now.substr(5,2)
    let yearNow = now.substr(2,2)
}

function compareToNow(todo){
    //getNow()
    let dayNow = new Date().getDate()
    let restDays = (todo.date.day - dayNow) - 1

    if (restDays > 0) return `Il vous reste ${restDays} jours pour terminer cette tâche.`
    if (restDays < 0) {
        let month31 = [ '01', '03', '05', '07', '08', '10', '12' ]
        let month30 = [ '04', '06', '09', '11' ]
        let month28 = [ '02' ]
        if ( month31.includes(todo.date.month) ) restDays = (31 - dayNow) + Number(todo.date.day - 1)
        if ( month30.includes(todo.date.month) ) restDays = (30 - dayNow) + Number(todo.date.day - 1)
        if ( month28.includes(todo.date.month) ) restDays = (28 - dayNow) + Number(todo.date.day - 1)
        return `Il vous reste ${restDays} jours pour terminer cette tâche.`
    }
    if (restDays === 0) return `Cette tâche doit être terminée aujourd'hui.`

}

export { getNow, compareToNow }





