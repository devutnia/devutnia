import Devutnia from './packages/core';
import DevutniaCli from './packages/cli';

const devutnia = new Devutnia();

const cli = new DevutniaCli(devutnia);

cli.installDevutnia();
