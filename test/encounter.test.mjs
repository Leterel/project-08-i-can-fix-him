import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,interact,choose,dialogueFor} from '../game.mjs';
import {encodeSave,decodeSave} from '../save.mjs';
function meet(s){const n=s.npcs.find(n=>n.id==='ronny');s.player={x:n.x+30,y:n.y+30};interact(s);return dialogueFor(s);}
function followup(){const s=createGame();meet(s);choose(s,1);return s;}
test('Ronny followup requires prior boundary and trust; listening opens self-directed progress',()=>{
 const s=createGame();assert.equal(meet(s).variant,'first');choose(s,1);assert.equal(s.boundaries,1);
 assert.equal(meet(s).variant,'ronny-followup');s.energy=70;s.suspicion=10;choose(s,0);assert.equal(s.energy,67);assert.equal(s.suspicion,6);assert.equal(s.npcs[0].trust,2);
 meet(s);choose(s,0);assert.equal(meet(s).variant,'ronny-progress');choose(s,0);assert.match(s.notice,/selbst organisiert/);assert.equal(s.boundaries,1);
});
test('followup alternatives have distinct costs and cannot farm boundary completion',()=>{
 const financed=followup();meet(financed);choose(financed,2);assert.equal(financed.money,40);assert.equal(financed.energy,86);assert.equal(financed.npcs[0].trust,0);assert.equal(meet(financed).variant,'first');
 const noMoney=followup();noMoney.money=5;meet(noMoney);choose(noMoney,2);assert.equal(noMoney.money,5);assert.equal(noMoney.energy,100);assert.equal(noMoney.npcs[0].trust,1);
 const boundary=followup();boundary.energy=40;for(let i=0;i<3;i++){meet(boundary);choose(boundary,1);}assert.equal(boundary.energy,64);assert.equal(boundary.boundaries,1);assert.equal(boundary.ending,null);
 const claimed=followup();for(let i=0;i<2;i++){meet(claimed);choose(claimed,0);}meet(claimed);choose(claimed,2);assert.equal(claimed.money,53);assert.equal(claimed.chaos,12);assert.equal(claimed.npcs[0].trust,1);assert.match(claimed.notice,/deine Leistung/);
});
test('existing V1 fields reconstruct encounter state; no new persisted fields or incompatible ids',()=>{
 const s=followup();meet(s);const serialized=encodeSave(s),saved=JSON.parse(serialized);assert.equal(saved.version,1);assert.equal(Object.hasOwn(saved.state,'encounter'),false);
 const restored=decodeSave(serialized);assert.equal(dialogueFor(restored).variant,'ronny-followup');choose(restored,0);assert.equal(restored.npcs[0].trust,2);assert.equal(restored.money,50);
 const oldStyle=createGame();meet(oldStyle);const decoded=decodeSave(encodeSave(oldStyle));assert.equal(dialogueFor(decoded).variant,'first');
 const exhausted=followup();exhausted.energy=2;meet(exhausted);choose(exhausted,0);assert.equal(exhausted.energy,0);assert.equal(exhausted.ending,'EMOTIONALE BAUSTELLE');
});
