import { Command } from 'commander';
import inquirer from 'inquirer';

import { loger } from './loger';
import { devKeyPrint } from './prints';
import { DevutniaConfig, DevutniaConstructor } from './devutnia';

export class CliConstructor {
  private program = new Command('devutnia-cli');

  constructor(private devutnia = new DevutniaConstructor()) {
    this.configPrompts = this.configPrompts.bind(this);
    this.installDevutnia = this.installDevutnia.bind(this);
  }

  /** Accepts a config object and returns a promise containing answers to installation prompts */
  configPrompts(config?: Partial<DevutniaConfig>) {
    const prompt = inquirer.createPromptModule();

    console.log(); // empty console line for spacing
    return prompt([
      {
        type: 'input',
        name: 'dev_key',
        default: config?.['dev_key'],
        message: `What's your "dev_key" (optional)`,
        validate: (dev_key) => {
          try {
            const key = devKeyPrint.parse(dev_key);
            if (key === dev_key) return true;
          } catch {
            return 'Please enter a valid "dev_key" in a UUID format';
          }
        },
      },
    ]).then((args) => {
      console.log(); // empty console line for spacing before installation logs
      this.devutnia.installer(args);
      return args;
    });
  }

  /** Runs Devutnia's installer inside the context of the CLI.
   *
   * @param {Partial<DevutniaConfig>} [config] - arguments are read from `process.argv`
   * and `this.configPrompts()` if `config` is not provided
   */
  installDevutnia(config?: Partial<DevutniaConfig>) {
    if (!config) {
      loger('warn', `no config object provided`);
      loger('info', 'getting config from the user input...');
      this.program
        .name('install')
        .option('--dev_key <key>', 'your dev_key')
        .action((args) => {
          if (args) {
            this.configPrompts(args).finally(() =>
              loger('info', `closing the installer now`),
            );
          }
        })
        .parse(process.argv);
    } else {
      loger('info', `partial config object provided`);

      this.configPrompts(config).finally(() =>
        loger('info', `closing the installer now`),
      );
    }
  }
}

// 1e4c8c57-6174-4e88-aa50-f7a67e058eba

export default CliConstructor;
