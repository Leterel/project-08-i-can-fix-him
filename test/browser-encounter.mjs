import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createLocalServer} from '../server.mjs';
import {createGame} from '../game.mjs';
import {SAVE_KEY,encodeSave,decodeSave} from '../save.mjs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE?pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href:'playwright');
const server=createLocalServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;const checks=[];const output=resolve('test-results/encounter');await mkdir(output,{recursive:true});
try{
 browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const fixture=createGame();fixture.player={x:640,y:490};await page.addInitScript(({key,value})=>{if(!localStorage.getItem(key))localStorage.setItem(key,value);},{key:SAVE_KEY,value:encodeSave(fixture)});
 await page.goto(`http://127.0.0.1:${server.address().port}`);await page.locator('#game').focus();await page.keyboard.press('e');await page.locator('#conversation[open]').waitFor();await page.locator('#choices button').nth(1).click();assert.equal(await page.locator('#boundaries').textContent(),'1 / 3');
 await page.keyboard.press('e');await page.locator('#conversation[open]').waitFor();assert.match(await page.locator('#npc-line').textContent(),/eigenen Plan/);await page.locator('#choices button').nth(0).click();assert.match(await page.locator('#log li').first().textContent(),/Verantwortung bleibt/);
 await page.keyboard.press('e');await page.locator('#conversation[open]').waitFor();await page.locator('#choices button').nth(0).click();await page.locator('#save').click();await page.reload();await page.locator('#game').focus();await page.keyboard.press('e');await page.locator('#conversation[open]').waitFor();assert.match(await page.locator('#npc-line').textContent(),/Termin selbst organisiert/);assert.match(await page.locator('#npc-memory').textContent(),/Vertrauen 3/);checks.push('Actual dialogue UI branches from boundary to listening to self-directed progress; existing V1 save restores branch');
 await page.screenshot({path:resolve(output,'progress-dialog.png'),fullPage:true});await page.locator('#choices button').nth(2).click();assert.equal(await page.locator('#money').textContent(),'53 €');assert.equal(await page.locator('#chaos-value').textContent(),'12');
 await page.keyboard.press('e');await page.locator('#conversation[open]').waitFor();assert.match(await page.locator('#npc-line').textContent(),/eigenen Plan/);await page.locator('#choices button').nth(2).click();assert.equal(await page.locator('#money').textContent(),'43 €');assert.equal(await page.locator('#boundaries').textContent(),'1 / 3');await page.locator('#save').click();
 const state=decodeSave(await page.evaluate(key=>localStorage.getItem(key),SAVE_KEY));assert.equal(state.npcs[0].trust,0);assert.equal(state.money,43);assert.equal(state.energy,80);checks.push('Claiming credit damages trust and adds chaos; renewed financing costs real model resources without duplicate boundary');
 await page.setViewportSize({width:390,height:844});await page.locator('#touch-talk').click();await page.locator('#conversation[open]').waitFor();assert.match(await page.locator('#npc-line').textContent(),/Premium-Persönlichkeit/);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:resolve(output,'mobile-dialog.png'),fullPage:true});assert.deepEqual(errors,[]);checks.push('Trust loss returns to original dialogue; touch interaction and 390px layout remain usable without browser errors');
 await writeFile(resolve(output,'verification.json'),JSON.stringify({passed:true,checks,saveFormatVersion:1,syntheticSaveOnly:true},null,2));console.log(checks.join('\n'));
}finally{await browser?.close();await new Promise(r=>server.close(r));}
