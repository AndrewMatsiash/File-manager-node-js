import readline from 'readline';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { sayCurrentlyPath, sayGoodby, sayHallo } from './helper.js';
const rl = readline.createInterface(process.stdin, process.stdout);

const userHomeDir = os.homedir();
const userName = process.argv.at(-1).split('=')[1];
let currentPath = userHomeDir;

sayHallo(userName);
sayCurrentlyPath(userHomeDir);

const cdDir = root => {
	if (path === '..') currentPath = 'dfdf';
	console.log(currentPath);
};

function promptInput(prompt, handler) {
	rl.question(prompt, input => {
		if (handler(input) !== false) {
			promptInput(prompt, handler);
		} else {
			rl.close();
		}
	});
}

promptInput('app> ', input => {
	const strFromConsole = input.trim().split(' ');
	console.log(strFromConsole.length);
	const command = strFromConsole[0];
	const params = strFromConsole.length > 1 ? strFromConsole[1] : '';

	console.log(command, params);
	switch (command) {
		case 'cd':
			// currentPath = 'jaaaaaaaa';
			cdDir(params);
			break;
		case 'exit':
			sayGoodby();
			return false;
	}
});

process.on('exit', () => {
	sayGoodby(userName);
});
