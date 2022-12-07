const readline = require('readline');
const fs = require('fs');
const os = require('os');
const rl = readline.createInterface(process.stdin, process.stdout);

const userHomeDir = os.homedir();
const userName = process.argv.at(-1).split('=')[1];
let currentPath = userHomeDir;

const sayHallo = () => {
	console.log(`Welcome to the File Manager, ${userName}!`);
};

const sayGoodby = () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

const sayCurrentlyPath = () => {
	console.log(`You are currently in ${currentPath}`);
};

sayHallo();
sayCurrentlyPath();

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
	switch (input) {
		case 'my command':
			// handle this command
			break;
		case 'exit':
			sayGoodby();
			return false;
	}
});

process.on('exit', () => {
	sayGoodby();
});
