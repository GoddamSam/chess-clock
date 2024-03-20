let initialClick=true;



const T1=document.getElementById("time1");
const T2=document.getElementById("time2");

const play=document.getElementById('play');
const pause=document.getElementById('pause');
const reset=document.getElementById('reset');


let Timer1={
    'id':'t1',
    'min':1,
    'sec':0,
    'timerId':null,
    'isOn':false
}

let Timer2={
    'id':'t2',
    'min':1,
    'sec':0,
    'timerId':null,
    'isOn':false
}

if(Timer1.isOn||initialClick)
{
    T1.addEventListener('click',startClock);
}

if(Timer2.isOn||initialClick)
{
    T2.addEventListener('click',startClock);
}

function startClock(e){
    const clickedTimer=e.target.id;

    if(initialClick===true)
    {
        if(clickedTimer==='time1')
        {

        Timer1.timerId=setInterval(function(){
            displayTime(Timer1.id)},1000);
            tick(Timer1);
            T1.style.backgroundColor='#0f059c';
            T1.style.color="#fff";

        Timer1.isOn=true;
        }
        else
        {
            
        Timer2.timerId=setInterval(function(){
            displayTime(Timer2.id)},1000);
            tick(Timer2);
            T2.style.backgroundColor='#0f059c';
            T2.style.color='#fff';
        Timer2.isOn=true;
        }
    }
    else{
    if(clickedTimer==='time1'){
        clearInterval(Timer1.timerId);
        T1.style.backgroundColor='#5ec3e2';
        T1.style.color='#000'
        Timer1.isOn=false;
        clearInterval(Timer2.timerId);
        Timer2.timerId=setInterval(function(){
            displayTime(Timer2.id)},1000);
            tick(Timer2);
            T2.style.backgroundColor='#0f059c';
            T2.style.color='#fff';
        Timer2.isOn=true;
        
    }
    else{
        clearInterval(Timer2.timerId);
        T2.style.backgroundColor='#5ec3e2';
        T2.style.color='#000';
        Timer2.isOn=false;
        clearInterval(Timer1.timerId);
        Timer1.timerId=setInterval(function(){
            displayTime(Timer1.id)},1000);
            tick(Timer1);
            T1.style.backgroundColor='#0f059c';
            T1.style.color='#fff';
        Timer1.isOn=true;
        
    }
}
initialClick=false;
}

function displayTime(timerID)
{
    if(timerID==='t1')
    {
         if(Timer1.min===0&&Timer1.sec===0)
         alarm();
         else if(Timer1.sec===0){
            Timer1.sec=59;
            Timer1.min--;
        }
        else
        Timer1.sec--;

        if(Timer1.sec<10)
       {
        if(Timer1.min<10)
        T1.innerHTML=`0${Timer1.min}:0${Timer1.sec}`;
        else 
        T1.innerHTML=`${Timer1.min}:0${Timer1.sec}`;
       }
        else
        {
            if(Timer1.min<10)
            T1.innerHTML=`0${Timer1.min}:${Timer1.sec}`;
            else 
            T1.innerHTML=`${Timer1.min}:${Timer1.sec}`;
        }
    }
    else{
        if(Timer2.min===0&&Timer2.sec===0)
        alarm();
        else if(Timer2.sec===0){
           Timer2.sec=59;
           Timer2.min--;
       }
       else
       Timer2.sec--;

       if(Timer2.sec<10)
       {
        if(Timer2.min<10)
        T2.innerHTML=`0${Timer2.min}:0${Timer2.sec}`;
        else 
        T2.innerHTML=`${Timer2.min}:0${Timer2.sec}`;
       }
        else
        {
            if(Timer2.min<10)
            T2.innerHTML=`0${Timer2.min}:${Timer2.sec}`;
            else 
            T2.innerHTML=`${Timer2.min}:${Timer2.sec}`;
        }
    }
}

function alarm()
{
    var audio=new Audio('negative_beeps-6008.mp3');
    audio.volume=1.0;
    audio.play();

    audio.addEventListener('ended',function(){
        
        

        clearInterval(Timer1.timerId);
        Timer1.min=1;
        Timer1.sec=0;
        Timer1.isOn=false;
        T1.removeEventListener('click',startClock);
    
        clearInterval(Timer2.timerId);
        Timer2.min=1;
        Timer2.sec=0;
        Timer2.isOn=false;
        T2.removeEventListener('click',startClock);

        audio.pause();
    })
}

function tick(Timer)
{
    
    if(!Timer.isOn)
    {
    const audio=new Audio('mouse-click-153941.mp3');
    audio.volume=1.0;
    audio.play();
    }
}

play.addEventListener('click',function(){
    if(Timer1.isOn===true)
    {
        clearInterval(Timer1.timerId);
        Timer1.timerId=setInterval(function(){
            displayTime(Timer1.id)},1000);
    }

    if(Timer2.isOn===true)
    {
        clearInterval(Timer2.timerId);
        Timer2.timerId=setInterval(function(){
            displayTime(Timer2.id)},1000);
    }

    play.style.cursor='default';
})

pause.addEventListener('click',function(){
   if(Timer1.isOn===true)
    clearInterval(Timer1.timerId);
   
   if(Timer2.isOn===true)
    clearInterval(Timer2.timerId); 

    play.style.cursor='pointer';
})

reset.addEventListener('click',function(){
    clearInterval(Timer1.timerId);
    Timer1.min=1;
    Timer1.sec=0;
    Timer1.isOn=false;
    T1.addEventListener('click',startClock);

    clearInterval(Timer2.timerId);
    Timer2.min=1;
    Timer2.sec=0;
    Timer2.isOn=false;
    T2.addEventListener('click',startClock);

    initialClick=true;

    T1.style.backgroundColor='#5ec3e2';
    T2.style.backgroundColor='#5ec3e2';

    T1.style.color='#000';
    T2.style.color='#000';

    T1.innerHTML=`10:00`;
    T2.innerHTML=`10:00`;
})