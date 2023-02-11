import { z } from 'zod';
import { Command } from 'commander';

import Devutnia, { type Core, prints } from '../core';

export class CliConstructor {
  private program = new Command('devutnia-cli');

  constructor(private devutnia = new Devutnia()) {
    this.installDevutnia = this.installDevutnia.bind(this);
  }

  /** Runs Devutnia's installer inside the context of the CLI.
   *
   * @param {Partial<Core.DevutniaConfig>} [config] - optional - arguments are read from process.argv if `config` is not provided
   */
  async installDevutnia(config?: Partial<Core.DevutniaConfig>) {
    const prompt = (await import('inquirer')).createPromptModule();

    if (!config) {
      this.program
        .name('install')
        .option('--dev_key <key>', 'your dev_key')
        .action((args) => {
          prompt([
            {
              type: 'input',
              name: 'dev_key',
              default: args?.['dev_key'],
              message: `What's your "dev_key" (optional)`,
              validate: (dev_key) => {
                const key = prints.devKeyPrint.parse(dev_key);
                if (key) return true;
                else 'Please enter a valid "dev_key" in a UUID format';
              },
            },
          ]).then((answers) => {
            console.log(JSON.stringify(answers, null, '  '));
          });
          this.devutnia.installer(config);
        })
        .parse(process.argv);
    } else this.devutnia.installer(config);
  }
}

export default CliConstructor;
