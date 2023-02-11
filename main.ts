import Cli from './lib/cli';
import Devutnia from './lib/devutnia';

const devutnia = new Devutnia();

devutnia.updateConfig({ yards: ['/potato/farm'] });

// const cli = new Cli(devutnia);

// cli.installDevutnia();
