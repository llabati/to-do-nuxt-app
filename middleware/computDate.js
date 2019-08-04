function compareToNow(todo){

    let dayNow = new Date().getDate()
    let monthNow = new Date().getMonth() + 1
    let yearNow = new Date().getFullYear()
    let nMonths = todo.month - monthNow
    let restDays
    if (todo.year === yearNow){
        restDays = ((nMonths * 30) + (todo.day - dayNow) === 0) ? 0 : (nMonths * 30) + (todo.day - dayNow) - 1     
        if (restDays === 0) return `Cette tâche doit être terminée aujourd'hui`       
    } else {
        restDays = 365 + (nMonths * 30) + (todo.day - dayNow) - 1  
    }
    return `Il vous reste ${restDays} jours pour terminer cette tâche.`
}



export { compareToNow }





