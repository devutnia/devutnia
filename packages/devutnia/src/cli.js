const { Command } = require('commander');
const fs = require('fs');

function findLumberyardBlueprint(path) {
  if (typeof path !== 'string') throw Error('"path" should be a string');

  let file;

  const steps = String(path).split('/').filter((s) => s);

  
  Array(steps.length).fill('').forEach(() => {
    if (!file) {
      fs.access(steps.join('/') + '/dev_.ts', (e, f) => {
        console.log('e', e);
        console.log('f', f);
      });
      steps.pop();
    } else {
      console.log('steps', steps);
    }
  })

  console.log('file', file);

  // if (!file) throw Error('"dev_.js" config file is missing');

  return file;
}

class Cli {
  program = new Command('devutnia');

  constructor() {
    this.installer = this.installer.bind(this);

    this.program.description(`CLI for installing Devutnia and it's services.`);
  }

  installer() {
    const install = (path) => {
      console.log('path', path);
      const print = findLumberyardBlueprint(path || __dirname);

      console.log('running here', print);
    };

    this.program.command('install').action(() => install());
  }
}

const cli = new Cli();

cli.installer();

cli.program.parse();
