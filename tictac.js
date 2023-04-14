let music = new Audio('music/music.mp3');
let click = new Audio('music/click.wav');
let gameover = new Audio('music/gameover1.wav');
let isgameover =false;
let reset = document.querySelector('#reset');
let soundoff = document.querySelector('.soundoff');
let soundon = document.querySelector('.soundon');
music.volume=0.15;
click.volume=0.2;
gameover.volume=0.25;

let turn = 'X';

const changeTurn=()=>{
    return turn === 'X'?'0':'X';
}

const checkWin = ()=>{
    let boxtext=document.getElementsByClassName('boxtext');
    let wins = [
        [0,1,2,15,-10,90],
        [3,4,5,15,0,90],
        [6,7,8,15,10,90],
        [0,3,6,5,0,0],
        [1,4,7,15,0,0],
        [2,5,8,25,0,0],
        [0,4,8,15,0,135],
        [2,4,6,15,0,45]
    ]
    wins.forEach(e=>{
        if((boxtext[e[0]].innerText===boxtext[e[1]].innerText)&&(boxtext[e[2]].innerText===boxtext[e[1]].innerText)&&(boxtext[e[0]].innerText!=='')){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText+" Won";
            isgameover=true;
            gameover.play();
            document.querySelector('.img').getElementsByTagName('img')[0].style.width = "150px";
            document.querySelector('.line').style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            document.querySelector('.line').style.width="7px";

        }
        
    })

}
music.play();
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element=>{
    let boxtexts = element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        if(boxtexts.innerText === ''){
            boxtexts.innerText = turn;
            turn=changeTurn();
            click.play();
            checkWin();
            if(!isgameover){
            document.getElementsByClassName('info')[0].innerText = 'Turn for '+turn;
            }
        }
    })
})

reset.addEventListener('click',()=>{
    let boxtexts=document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element=>{
        element.innerText="";
    })
    turn = "X";
    isgameover=false;
    document.querySelector('.line').style.width="0px";
    document.getElementsByClassName('info')[0].innerText = 'Turn for '+turn;
    document.querySelector('.img').getElementsByTagName('img')[0].style.width='0px';
})

soundoff.addEventListener('click',()=>{
    music.pause();
})

soundon.addEventListener('click',()=>{
    music.play();
})
