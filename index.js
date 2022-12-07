const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const userName = process.argv.at(-1).split('=')[1];

const sayHallo = () => {
	console.log(`Welcome to the File Manager, ${userName}!`);
};

const sayGoodby = () => {
	console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};

sayHallo();

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
