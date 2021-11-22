const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let today = new Date();
let options = {weekday: 'long'};
let currentDay = today.toLocaleDateString('fr-FR', options);

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let OrderedDays = daysOfWeek.slice(daysOfWeek.indexOf(currentDay)).concat(daysOfWeek.slice(0, daysOfWeek.indexOf(currentDay)));

export default OrderedDays;
