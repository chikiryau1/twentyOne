import {play} from './twentyOne'

document.addEventListener('DOMContentLoaded', () => {
    const twentyOne = play();
    twentyOne.next();
    const player1More = document.querySelector('#p1More');
    const player1Hold = document.querySelector('#p1Hold');
    const player1Info = document.querySelector('#p1Info');

    player1More.addEventListener('click', () => {
        player1Info.innerText = twentyOne.next(true).value['Player1'];
    });

    player1Hold.addEventListener('click', () => {
        player1Info.innerText = twentyOne.next(false).value['Player1'];
    })
});
