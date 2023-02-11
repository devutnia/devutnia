import { Command } from 'commander';

import Devutnia, { type Core } from '../core';

export class Cli {
  private program = new Command('devutnia-cli');

  constructor(private devutnia = new Devutnia()) {
    this.installDevutnia = this.installDevutnia.bind(this);
  }

  /** Runs Devutnia's installer inside the context of the CLI.
   *
   * @param {Partial<Core.DevutniaConfig>} [config] - optional - arguments are read from process.argv if not provided
   */
  installDevutnia(config?: Partial<Core.DevutniaConfig>) {
    if (!config) {
      this.program
        .name('install')
        .option('--dev_key <key>', 'your dev_key')
        .action(this.devutnia.installer)
        .parse(process.argv);
    } else this.devutnia.installer(config);
  }
}

export default Cli;
