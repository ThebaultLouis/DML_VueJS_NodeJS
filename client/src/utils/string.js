export default {
    mounths: [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'decembre'
    ],
    getDate(unixDate) {
        var date = new Date(unixDate);
        var year = date.getFullYear();
        var mounth = date.getMonth() + 1;
        var day = date.getDate();
        return day + " " + this.mounths[mounth - 1] + " " + year;
    }
}