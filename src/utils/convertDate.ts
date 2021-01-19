export default function convertDate(inDate: Date): String {
    const date = new Date(inDate);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
    const minute = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
    const second = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`;

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}