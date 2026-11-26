import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { formatDuration, playlistSummary, filterSongs } from '../src/lib/songs.js';
import { addSong, removeSong, moveSong, validateName, loadPlaylists, savePlaylists, STORAGE_KEY } from '../src/lib/playlists.js';
import { stepTrack } from '../src/lib/player.js';
const songs = JSON.parse(readFileSync(new URL('../public/songs.json', import.meta.url), 'utf8'));
const playlists = [{ id: 'a', name: 'My Mix', songIds: [1, 2] }, { id: 'b', name: 'Road Trip', songIds: [] }];
function memoryStorage() { const data = new Map(); return { getItem: key => data.get(key) ?? null, setItem: (key,value) => data.set(key,value) }; }

test('12 unique valid songs in the mock library', () => {assert.equal(songs.length,12);assert.equal(new Set(songs.map(s=>s.id)).size,12); for(const song of songs){assert.equal(typeof song.id,'number');assert.ok(song.title && song.artist && song.genre);assert.ok(Number.isInteger(song.duration) && song.duration>0);}});
test('duration formatting and summary', () => {assert.equal(formatDuration(65),'1:05');assert.equal(formatDuration(0),'0:00');assert.equal(playlistSummary([]),'0 songs · 0 min');assert.equal(playlistSummary([{duration: 240}]),'1 song · 4 min');assert.equal(playlistSummary(Array.from({length:8},()=>({duration:240}))),'8 songs · 32 min');});
test('search is case insensitive and works with genre filter', () => {assert.equal(filterSongs(songs,' M83 ','All genres')[0].id,1);assert.equal(filterSongs(songs,'lights','Pop').length,1);assert.equal(filterSongs(songs,'lights','Rock').length,0);assert.equal(filterSongs(songs,'','All genres').length,12);});
test('names required, trimmed, unique ignoring case and rename self allowed', () => {assert.ok(validateName('   ',playlists));assert.ok(validateName(' my MIX ',playlists));assert.ok(validateName('road trip',playlists,'a'));assert.equal(validateName(' my MIX ',playlists,'a'),'');assert.equal(validateName('Fresh mix',playlists),'');});
test('add avoids duplicates and remove preserves original list', () => {const ids=[1,2];assert.deepEqual(addSong(ids,2),[1,2]);assert.deepEqual(addSong(ids,3),[1,2,3]);assert.deepEqual(removeSong(ids,1),[2]);assert.deepEqual(ids,[1,2]);});
test('move up and down with boundary protection', () => {const ids=[1,2,3];assert.deepEqual(moveSong(ids,2,-1),[2,1,3]);assert.deepEqual(moveSong(ids,2,1),[1,3,2]);assert.deepEqual(moveSong(ids,1,-1),ids);assert.deepEqual(moveSong(ids,3,1),ids);assert.deepEqual(ids,[1,2,3]);});
test('storage persists playlists including an empty collection', () => {const storage=memoryStorage();assert.equal(loadPlaylists(storage).length,1);assert.equal(savePlaylists(playlists,storage),true);assert.deepEqual(loadPlaylists(storage),playlists);savePlaylists([],storage);assert.deepEqual(loadPlaylists(storage),[]);});
test('corrupted or inaccessible storage handled safely', () => {const storage=memoryStorage();storage.setItem(STORAGE_KEY,'not json');assert.equal(loadPlaylists(storage).length,1);storage.setItem(STORAGE_KEY,JSON.stringify([{id:'x',name:'x',songIds:[1,1]}]));assert.deepEqual(loadPlaylists(storage)[0].songIds,[1]);const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};assert.equal(loadPlaylists(blocked).length,1);assert.equal(savePlaylists([],blocked),false);});
test('next and previous wrap and handle empty queues', () => {assert.equal(stepTrack([1,2,3],2,1),3);assert.equal(stepTrack([1,2,3],3,1),1);assert.equal(stepTrack([1,2,3],1,-1),3);assert.equal(stepTrack([1,2,3],null,1),1);assert.equal(stepTrack([],null,1),null);});
