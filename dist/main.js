(()=>{"use strict";const e=e=>{let i=0,t=!1;const a=e;return{isSunk:()=>(t=i==a,t),hit:()=>++i}},i=()=>{const i=(()=>{const i=[];for(let e=0;e<10;e++){i[e]=[];for(let t=0;t<10;t++)i[e][t]={hasShip:!1,nearShip:!1,shipName:null,wasShot:!1}}return{grid:i,place:(t,a,n,r)=>{if("patrol"==r){for(let e=0;e<1;e++)if("v"==n){if(0==i[t+e][a].hasShip&&0==i[t+e][a].nearShip)continue;if(1==i[t+e][a].hasShip||1==i[t+e][a].nearShip)return}else{if(0==i[t][a+e].hasShip&&0==i[t][a+e].nearShip)continue;if(1==i[t][a+e].hasShip||1==i[t][a+e].nearShip)return}const s=e(1);for(let e=0;e<1;e++)"v"==n?(i[t+e][a].hasShip=!0,i[t+e][a].shipName=s,[t+e]in i&&[a+1]in i[t+e]&&(i[t+e][a+1].nearShip=!0),[t+e]in i&&[a-1]in i[t+e]&&(i[t+e][a-1].nearShip=!0),[t+1]in i&&[a]in i[t+1]&&(i[t+1][a].nearShip=!0),[t-1]in i&&[a]in i[t-1]&&(i[t-1][a].nearShip=!0)):(i[t][a+e].hasShip=!0,i[t][a+e].shipName=s,[t+e]in i&&[a+1]in i[t+e]&&(i[t+e][a+1].nearShip=!0),[t+e]in i&&[a-1]in i[t+e]&&(i[t+e][a-1].nearShip=!0),[t+1]in i&&[a]in i[t+1]&&(i[t+1][a].nearShip=!0),[t-1]in i&&[a]in i[t-1]&&(i[t-1][a].nearShip=!0));return r}if("submarine"==r){if("h"==n&&a>=9)return;if("v"==n&&t>=9)return;for(let e=0;e<2;e++)if("v"==n){if(0==i[t+e][a].hasShip&&0==i[t+e][a].nearShip)continue;if(1==i[t+e][a].hasShip||1==i[t+e][a].nearShip)return}else{if(0==i[t][a+e].hasShip&&0==i[t][a+e].nearShip)continue;if(1==i[t][a+e].hasShip||1==i[t][a+e].nearShip)return}const s=e(2);for(let e=0;e<2;e++)"v"==n?(i[t+e][a].hasShip=!0,i[t+e][a].shipName=s,[t+e]in i&&[a+1]in i[t+e]&&(i[t+e][a+1].nearShip=!0),[t+e]in i&&[a-1]in i[t+e]&&(i[t+e][a-1].nearShip=!0),[t+2]in i&&[a]in i[t+2]&&(i[t+2][a].nearShip=!0),[t-1]in i&&[a]in i[t-1]&&(i[t-1][a].nearShip=!0)):(i[t][a+e].hasShip=!0,i[t][a+e].shipName=s,[t+1]in i&&[a+e]in i[t+1]&&(i[t+1][a+e].nearShip=!0),[t-1]in i&&[a+e]in i[t-1]&&(i[t-1][a+e].nearShip=!0),[t]in i&&[a+2]in i[t]&&(i[t][a+2].nearShip=!0),[t]in i&&[a-1]in i[t]&&(i[t][a-1].nearShip=!0));return r}if("destroyer"==r){if("h"==n&&a>=8)return;if("v"==n&&t>=8)return;for(let e=0;e<3;e++)if("v"==n){if(0==i[t+e][a].hasShip&&0==i[t+e][a].nearShip)continue;if(1==i[t+e][a].hasShip||1==i[t+e][a].nearShip)return}else{if(0==i[t][a+e].hasShip&&0==i[t][a+e].nearShip)continue;if(1==i[t][a+e].hasShip||1==i[t][a+e].nearShip)return}const s=e(3);for(let e=0;e<3;e++)"v"==n?(i[t+e][a].hasShip=!0,i[t+e][a].shipName=s,[t+e]in i&&[a+1]in i[t+e]&&(i[t+e][a+1].nearShip=!0),[t+e]in i&&[a-1]in i[t+e]&&(i[t+e][a-1].nearShip=!0),[t+3]in i&&[a]in i[t+3]&&(i[t+3][a].nearShip=!0),[t-1]in i&&[a]in i[t-1]&&(i[t-1][a].nearShip=!0)):(i[t][a+e].hasShip=!0,i[t][a+e].shipName=s,[t+1]in i&&[a+e]in i[t+1]&&(i[t+1][a+e].nearShip=!0),[t-1]in i&&[a+e]in i[t-1]&&(i[t-1][a+e].nearShip=!0),[t]in i&&[a+3]in i[t]&&(i[t][a+3].nearShip=!0),[t]in i&&[a-1]in i[t]&&(i[t][a-1].nearShip=!0));return r}if("battleship"==r){if("h"==n&&a>=7)return;if("v"==n&&t>=7)return;for(let e=0;e<4;e++)if("v"==n){if(0==i[t+e][a].hasShip&&0==i[t+e][a].nearShip)continue;if(1==i[t+e][a].hasShip||1==i[t+e][a].nearShip)return}else{if(0==i[t][a+e].hasShip&&0==i[t][a+e].nearShip)continue;if(1==i[t][a+e].hasShip||1==i[t][a+e].nearShip)return}const s=e(4);for(let e=0;e<4;e++)"v"==n?(i[t+e][a].hasShip=!0,i[t+e][a].shipName=s,[t+e]in i&&[a+1]in i[t+e]&&(i[t+e][a+1].nearShip=!0),[t+e]in i&&[a-1]in i[t+e]&&(i[t+e][a-1].nearShip=!0),[t+4]in i&&[a]in i[t+4]&&(i[t+4][a].nearShip=!0),[t-1]in i&&[a]in i[t-1]&&(i[t-1][a].nearShip=!0)):(i[t][a+e].hasShip=!0,i[t][a+e].shipName=s,[t+1]in i&&[a+e]in i[t+1]&&(i[t+1][a+e].nearShip=!0),[t-1]in i&&[a+e]in i[t-1]&&(i[t-1][a+e].nearShip=!0),[t]in i&&[a+4]in i[t]&&(i[t][a+4].nearShip=!0),[t]in i&&[a-1]in i[t]&&(i[t][a-1].nearShip=!0));return r}if("carrier"==r){if("h"==n&&a>=6)return;if("v"==n&&t>=6)return;for(let e=0;e<5;e++)if("v"==n){if(0==i[t+e][a].hasShip&&0==i[t+e][a].nearShip)continue;if(1==i[t+e][a].hasShip||1==i[t+e][a].nearShip)return}else{if(0==i[t][a+e].hasShip&&0==i[t][a+e].nearShip)continue;if(1==i[t][a+e].hasShip||1==i[t][a+e].nearShip)return}const s=e(5);for(let e=0;e<5;e++)"v"==n?(i[t+e][a].hasShip=!0,i[t+e][a].shipName=s,[t+e]in i&&[a+1]in i[t+e]&&(i[t+e][a+1].nearShip=!0),[t+e]in i&&[a-1]in i[t+e]&&(i[t+e][a-1].nearShip=!0),[t+5]in i&&[a]in i[t+5]&&(i[t+5][a].nearShip=!0),[t-1]in i&&[a]in i[t-1]&&(i[t-1][a].nearShip=!0)):(i[t][a+e].hasShip=!0,i[t][a+e].shipName=s,[t+1]in i&&[a+e]in i[t+1]&&(i[t+1][a+e].nearShip=!0),[t-1]in i&&[a+e]in i[t-1]&&(i[t-1][a+e].nearShip=!0),[t]in i&&[a+5]in i[t]&&(i[t][a+5].nearShip=!0),[t]in i&&[a-1]in i[t]&&(i[t][a-1].nearShip=!0));return r}},receiveAttack:(e,t)=>1==i[e][t].hasShip?(i[e][t].wasShot=!0,i[e][t].shipName.hit(),"hit"):(i[e][t].wasShot=!0,"miss"),checkAllSunk:()=>i.every((e=>e.filter((e=>null!=e.shipName)).every((e=>1==e.shipName.isSunk()))))}})();let t=null,a=[],n=[],r=0;const s=(e,i,t)=>0==t.Gameboard.grid[e][i].wasShot?"hit"==t.Gameboard.receiveAttack(e,i)?"valid hit attack":"valid miss attack":"invalid attack",d=e=>{if(0==a.length){let i=Math.floor(10*Math.random()),r=Math.floor(10*Math.random());if(t=s(i,r,e),"valid hit attack"==t)a.push(i,r),n.push(i,r);else for(;"invalid attack"==t;)d(e)}else if(0==e.Gameboard.grid[a[0]][a[1]].shipName.isSunk()){let i,h;switch(r){case 0:i=a[0]+1,h=a[1],i<10?(t=s(i,h,e),"valid hit attack"==t?a[0]=i:"valid miss attack"==t?r++:(r++,d(e))):(r++,d(e));break;case 1:i=n[0]-1,h=n[1],i>=0?(t=s(i,h,e),"valid hit attack"==t?n[0]=i:"valid miss attack"==t?r++:(r++,d(e))):(r++,d(e));break;case 2:i=a[0],h=a[1]+1,h<10?(t=s(i,h,e),"valid hit attack"==t?a[1]=h:"valid miss attack"==t?r++:(r++,d(e))):(r++,d(e));break;case 3:i=n[0],h=n[1]-1,h>=0&&(t=s(i,h,e),"valid hit attack"==t&&(n[1]=h))}}else a=[],n=[],r=0,d(e)};return{Gameboard:i,attackPlayer:s,computerAttack:d}};function t(e){e.dataTransfer.setData("text",e.target.id)}function a(e){"h"==e.target.getAttribute("data-orientation")?e.target.setAttribute("data-orientation","v"):e.target.setAttribute("data-orientation","h")}let n=[];const r=["patrol","submarine","destroyer","battleship","carrier"],s=(e,i,t)=>{const a=document.querySelector(".player1 .shipsBoard"),l=document.querySelector(".player1 .attackBoard"),c=document.querySelector(".winner"),o=document.querySelector(".waiting");switch(t){case"pvcPlace":for(d();a.firstChild;)a.removeChild(a.firstChild);if(e.Gameboard.grid.forEach((t=>{t.forEach((r=>{const d=document.createElement("div");d.classList.add("cell");let h=e.Gameboard.grid.indexOf(t),l=t.indexOf(r);d.setAttribute("data-indexX",h),d.setAttribute("data-indexY",l),1==r.hasShip&&d.classList.add("hasShip"),1==r.wasShot&&0==r.hasShip&&d.classList.add("waterHit"),1==r.wasShot&&1==r.hasShip&&d.classList.add("shipHit"),null!=r.shipName&&1==r.shipName.isSunk()&&d.classList.add("shipSunk"),0==r.hasShip&&(d.addEventListener("drop",(function(t){t.preventDefault();let a=t.dataTransfer.getData("text"),r=document.getElementById(a).getAttribute("data-orientation"),d=t.target.getAttribute("data-indexX"),h=t.target.getAttribute("data-indexY"),l=e.Gameboard.place(Number(d),Number(h),r,a);n.push(l),s(e,i,"pvcPlace")})),d.addEventListener("dragover",(function(i){1!=e.Gameboard.grid[i.target.getAttribute("data-indexX")][i.target.getAttribute("data-indexY")].hasShip&&1!=e.Gameboard.grid[i.target.getAttribute("data-indexX")][i.target.getAttribute("data-indexY")].nearShip||(i.target.style.border="1px dashed red"),i.preventDefault()}))),a.appendChild(d)}))})),1==r.every((e=>n.includes(e)))){for(;o.firstChild;)o.removeChild(o.firstChild);c.innerHTML="Player 1",a.style.visibility="visible",l.style.visibility="visible";const t=document.createElement("div"),n=document.createElement("div");t.innerHTML="Your Ships Grid",n.innerHTML="Your Attack Grid",o.appendChild(t),o.appendChild(n),i.Gameboard.place(0,4,"v","patrol"),i.Gameboard.place(0,0,"v","submarine"),i.Gameboard.place(2,4,"h","destroyer"),i.Gameboard.place(5,4,"h","battleship"),i.Gameboard.place(7,4,"h","carrier"),s(e,i,"pvc")}break;case"pvpPlace":case"pvp":break;case"pvc":for(;a.firstChild;)a.removeChild(a.firstChild);for(;l.firstChild;)l.removeChild(l.firstChild);e.Gameboard.grid.forEach((i=>{i.forEach((t=>{const n=document.createElement("div");n.classList.add("cell");let r=e.Gameboard.grid.indexOf(i),s=i.indexOf(t);n.setAttribute("data-indexY",s),n.setAttribute("data-indexX",r),1==t.hasShip&&n.classList.add("hasShip"),1==t.wasShot&&0==t.hasShip&&n.classList.add("waterHit"),1==t.wasShot&&1==t.hasShip&&n.classList.add("shipHit"),null!=t.shipName&&1==t.shipName.isSunk()&&n.classList.add("shipSunk"),a.appendChild(n)}))})),i.Gameboard.grid.forEach((t=>{t.forEach((a=>{const n=document.createElement("div");n.classList.add("cell");let r=i.Gameboard.grid.indexOf(t),d=t.indexOf(a);n.setAttribute("data-indexX",r),n.setAttribute("data-indexY",d),1==a.wasShot&&1==a.hasShip&&n.classList.add("shipHit"),1==a.wasShot&&0==a.hasShip&&n.classList.add("waterHit"),null!=a.shipName&&1==a.shipName.isSunk()&&n.classList.add("shipSunk"),0==a.wasShot&&n.addEventListener("click",(()=>{e.attackPlayer(n.getAttribute("data-indexX"),n.getAttribute("data-indexY"),i),i.computerAttack(e),s(e,i,"pvc"),h(e,i)})),l.appendChild(n)}))}));break;case"restart":n=[],s(e,i,"pvcPlace")}},d=()=>{const e=document.querySelector(".winner"),i=document.querySelector(".waiting");for(e.innerHTML="Please drag and drop all your ships...";i.firstChild;)i.removeChild(i.firstChild);const r=document.createElement("ul");r.classList.add("shipList");const s=document.createElement("li");s.innerHTML="Patrol",n.includes("patrol")&&(s.style.visibility="hidden"),s.setAttribute("id","patrol"),s.setAttribute("data-orientation","h"),s.setAttribute("draggable","true"),s.addEventListener("click",a),s.addEventListener("dragstart",t);const d=document.createElement("li");d.innerHTML="Submarine",n.includes("submarine")&&(d.style.visibility="hidden"),d.setAttribute("id","submarine"),d.setAttribute("data-orientation","h"),d.setAttribute("draggable","true"),d.addEventListener("click",a),d.addEventListener("dragstart",t);const h=document.createElement("li");h.innerHTML="Destroyer",n.includes("destroyer")&&(h.style.visibility="hidden"),h.setAttribute("id","destroyer"),h.setAttribute("data-orientation","h"),h.setAttribute("draggable","true"),h.addEventListener("click",a),h.addEventListener("dragstart",t);const l=document.createElement("li");l.innerHTML="Battleship",n.includes("battleship")&&(l.style.visibility="hidden"),l.setAttribute("id","battleship"),l.setAttribute("data-orientation","h"),l.setAttribute("draggable","true"),l.addEventListener("click",a),l.addEventListener("dragstart",t);const c=document.createElement("li");c.innerHTML="Carrier",n.includes("carrier")&&(c.style.visibility="hidden"),c.setAttribute("id","carrier"),c.setAttribute("data-orientation","h"),c.setAttribute("draggable","true"),c.addEventListener("click",a),c.addEventListener("dragstart",t),r.appendChild(s),r.appendChild(d),r.appendChild(h),r.appendChild(l),r.appendChild(c),i.appendChild(r)},h=(e,i)=>{const t=document.querySelector(".player1 .attackBoard"),a=document.querySelector(".winner"),n=document.querySelector(".player1 .shipsBoard"),r=document.querySelector(".waiting");if(1==e.Gameboard.checkAllSunk()&&1==i.Gameboard.checkAllSunk())n.style.visibility="hidden",t.style.visibility="hidden",r.style.visibility="hidden",a.innerHTML="It's a Tie!";else if(1==e.Gameboard.checkAllSunk()&&0==i.Gameboard.checkAllSunk())n.style.visibility="hidden",t.style.visibility="hidden",r.style.visibility="hidden",a.innerHTML="Player 2 Won!";else{if(0!=e.Gameboard.checkAllSunk()||1!=i.Gameboard.checkAllSunk())return;n.style.visibility="hidden",t.style.visibility="hidden",r.style.visibility="hidden",a.innerHTML="Player 1 Won!"}},l=s,c=e=>{const t=document.querySelector(".newGameBtn");t.innerHTML="Restart",t.removeEventListener("click",o),t.addEventListener("click",(function(){location.reload()})),document.querySelector(".playVs").style.visibility="hidden",(e=>{const t=i(),a=i();l(t,a,"pvcPlace")})()},o=()=>{const e=document.querySelector(".playVs");"hidden"==e.style.visibility?e.style.visibility="visible":e.style.visibility="hidden"};document.querySelector(".playVs").style.visibility="hidden",document.querySelector(".newGameBtn").addEventListener("click",o),document.querySelector("button.PvC").addEventListener("click",(()=>c())),document.querySelector(".PvP").addEventListener("click",(()=>c()))})();