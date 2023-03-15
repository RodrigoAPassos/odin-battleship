(()=>{"use strict";const e=e=>{let a=0,i=!1;const t=e;return{isSunk:()=>(i=a==t,i),hit:()=>++a}},a=()=>{const a=(()=>{const a=[];for(let e=0;e<100;e++)a.push({hasShip:!1,shipName:null,wasShot:!1});return{grid:a,place:(i,t,s)=>{if("patrol"==s){const s=e(1);for(let e=0;e<1;e++)"h"==t?(a[i+e].hasShip=!0,a[i+e].shipName=s):(a[i+10*e].hasShip=!0,a[i+10*e].shipName=s)}else if("submarine"==s){const s=e(2);for(let e=0;e<2;e++)"h"==t?(a[i+e].hasShip=!0,a[i+e].shipName=s):(a[i+10*e].hasShip=!0,a[i+10*e].shipName=s)}else if("destroyer"==s){const s=e(3);for(let e=0;e<3;e++)"h"==t?(a[i+e].hasShip=!0,a[i+e].shipName=s):(a[i+10*e].hasShip=!0,a[i+10*e].shipName=s)}else if("battleship"==s){const s=e(4);for(let e=0;e<4;e++)"h"==t?(a[i+e].hasShip=!0,a[i+e].shipName=s):(a[i+10*e].hasShip=!0,a[i+10*e].shipName=s)}else if("carrier"==s){const s=e(5);for(let e=0;e<5;e++)"h"==t?(a[i+e].hasShip=!0,a[i+e].shipName=s):(a[i+10*e].hasShip=!0,a[i+10*e].shipName=s)}},receiveAttack:e=>1==a[e].hasShip?(a[e].wasShot=!0,a[e].shipName.hit(),"hit"):(a[e].wasShot=!0,"miss"),checkAllSunk:()=>a.filter((e=>null!=e.shipName)).every((e=>1==e.shipName.isSunk()))}})();let i,t=null,s=null,l=0;const r=(e,a)=>0==a.Gameboard.grid[e].wasShot?"hit"==a.Gameboard.receiveAttack(e)?"valid hit attack":"valid miss attack":"invalid attack",d=e=>{if(null==t){let a=Math.floor(100*Math.random());if(i=r(a,e),"valid hit attack"==i)t=a,s=a;else for(;"invalid attack"==i;)d(e)}else if(0==e.Gameboard.grid[t].shipName.isSunk()){let a;switch(l){case 0:a=t+1,a<100?i=r(a,e):l++,"valid hit attack"==i?t=a:"valid miss attack"==i?l++:(l++,d(e));break;case 1:a=s-1,a<100&&a>=0?i=r(a,e):l++,"valid hit attack"==i?s=a:"valid miss attack"==i?l++:(l++,d(e));break;case 2:a=t+10,a<100?i=r(a,e):l++,"valid hit attack"==i?t=a:"valid miss attack"==i?l++:(l++,d(e));break;case 3:a=s-10,a>=0&&(i=r(a,e)),"valid hit attack"==i&&(s=a)}}else t=null,s=null,l=0,d(e)};return{Gameboard:a,attackPlayer:r,computerAttack:d}},i=(e,a)=>{const s=document.querySelector(".player1 .shipsBoard"),l=document.querySelector(".player1 .attackBoard");for(document.querySelector(".winner").innerHTML="Player 1",s.style.visibility="visible",l.style.visibility="visible";s.firstChild&&l.firstChild;)s.removeChild(s.firstChild),l.removeChild(l.firstChild);for(let a of e.Gameboard.grid){const i=document.createElement("div");i.classList.add("cell"),i.setAttribute("data-index",e.Gameboard.grid.indexOf(a)),1==a.hasShip&&i.classList.add("hasShip"),1==a.wasShot&&0==a.hasShip&&i.classList.add("waterHit"),1==a.wasShot&&1==a.hasShip&&i.classList.add("shipHit"),null!=a.shipName&&1==a.shipName.isSunk()&&i.classList.add("shipSunk"),s.appendChild(i)}for(let s of a.Gameboard.grid){const r=document.createElement("div");r.classList.add("cell"),r.setAttribute("data-index",a.Gameboard.grid.indexOf(s)),1==s.wasShot&&1==s.hasShip&&r.classList.add("shipHit"),1==s.wasShot&&0==s.hasShip&&r.classList.add("waterHit"),null!=s.shipName&&1==s.shipName.isSunk()&&r.classList.add("shipSunk"),0==s.wasShot&&r.addEventListener("click",(()=>{e.attackPlayer(r.getAttribute("data-index"),a),a.computerAttack(e),i(e,a),t(e,a)})),l.appendChild(r)}},t=(e,a)=>{const i=document.querySelector(".player1 .attackBoard"),t=document.querySelector(".winner"),s=document.querySelector(".player1 .shipsBoard");if(1==e.Gameboard.checkAllSunk()&&1==a.Gameboard.checkAllSunk())s.style.visibility="hidden",i.style.visibility="hidden",t.innerHTML="It's a Tie!";else if(1==e.Gameboard.checkAllSunk()&&0==a.Gameboard.checkAllSunk())s.style.visibility="hidden",i.style.visibility="hidden",t.innerHTML="Player 2 Won!";else{if(0!=e.Gameboard.checkAllSunk()||1!=a.Gameboard.checkAllSunk())return;s.style.visibility="hidden",i.style.visibility="hidden",t.innerHTML="Player 1 Won!"}},s=i,l=e=>{document.querySelector(".newGameBtn").innerHTML="Restart",document.querySelector(".playVs").style.visibility="hidden",(e=>{const i=a(),t=a();i.Gameboard.place(4,"v","patrol"),i.Gameboard.place(0,"h","submarine"),i.Gameboard.place(31,"v","destroyer"),i.Gameboard.place(76,"h","battleship"),i.Gameboard.place(55,"h","carrier"),t.Gameboard.place(4,"v","patrol"),t.Gameboard.place(0,"v","submarine"),t.Gameboard.place(24,"h","destroyer"),t.Gameboard.place(74,"h","battleship"),t.Gameboard.place(54,"h","carrier"),s(i,t)})()};document.querySelector(".playVs").style.visibility="hidden",document.querySelector(".newGameBtn").addEventListener("click",(()=>{const e=document.querySelector(".playVs");"hidden"==e.style.visibility?e.style.visibility="visible":e.style.visibility="hidden"})),document.querySelector("button.PvC").addEventListener("click",(()=>l())),document.querySelector(".PvP").addEventListener("click",(()=>l()))})();