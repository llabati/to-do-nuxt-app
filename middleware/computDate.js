function compareToNow(todo){

    let dayNow = new Date().getDate()
    let restDays = (Number(todo.day) - dayNow) === 0 ? 0 : (Number(todo.day) - dayNow) - 1
    console.log(restDays)
    let month31 = [ '01', '03', '05', '07', '08', '10', '12' ]
    let month30 = [ '04', '06', '09', '11' ]
    let month28 = [ '02' ]
    let delay = 0

    if (restDays > 0) return `Il vous reste ${restDays} jours pour terminer cette tâche.`
    if (restDays === 0) return `Cette tâche doit être terminée aujourd'hui.`
    if (restDays < 0) {
        if ( month31.includes(todo.month) ) { 
            delay = (31 - dayNow) + Number(todo.day - 1)
            return `Vous avez encore ${delay} jours pour terminer cette tâche.`
        }
        if ( month30.includes(todo.month) ) { 
            delay = (30 - dayNow) + Number(todo.day - 1)
            return `Vous avez encore ${delay} jours pour terminer cette tâche.`
        }
        if ( month28.includes(todo.month) ) { 
            delay = (28 - dayNow) + Number(todo.day - 1)
            return `Vous avez encore ${delay} jours pour terminer cette tâche.`
        }
    }

}

export { compareToNow }





