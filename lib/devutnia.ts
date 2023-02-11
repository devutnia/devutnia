import fs from 'fs';
import path from 'path';
import merge from 'deepmerge';

import { loger } from './loger';
import { configPrint } from './prints';

export class DevutniaConstructor {
  private config: Partial<DevutniaConfig> = {
    dev_key: 'public',
    yards: [process.cwd()],
  };

  constructor(config?: Partial<DevutniaConfig>) {
    this.rootPath = this.rootPath.bind(this);
    this.installer = this.installer.bind(this);
    this.fromRootPath = this.fromRootPath.bind(this);
    this.writeFileAtRoot = this.writeFileAtRoot.bind(this);
    this.writeConfigAtRoot = this.writeConfigAtRoot.bind(this);
    this.writeRootDirectory = this.writeRootDirectory.bind(this);

    if (config) this.config = merge(this.config, configPrint.parse(config));
  }

  /** Returns Devutnia's root directory path in the filesystem
   *
   * @example
   * ```
   * const root_path = rootPath();
   * console.log(root_path) // /home/{USER}/.devutnia
   * ```
   */
  rootPath(): Readonly<string> {
    const root = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] || '';
    return path.join(root, '/.devutnia');
  }

  /** Returns Devutnia's root directory with `sub_path` concatenated to `rootPath()`.
   *
   * @example
   * ```
   * const sub_path = fromRootPath('/somefile.js');
   * console.log(sub_path) // /home/{USER}/.devutnia/somefile.js
   * ```
   */
  fromRootPath(sub_path: string) {
    return path.join(this.rootPath(), sub_path);
  }

  /** Creates a new file inside Devutnia's root folder. In case there is no root folder
   * `writeRootDirectory()` method is called
   */
  writeFileAtRoot(
    file_path: string,
    data: string | NodeJS.ArrayBufferView,
    overwrite?: boolean,
  ) {
    if (overwrite || !fs.existsSync(this.fromRootPath(file_path))) {
      loger('info', 'adding new file to root directory...');
      try {
        fs.writeFileSync(this.fromRootPath(file_path), data);
        loger('info', 'new file added to the directory');
      } catch (error: any) {
        if (error['code'] === 'ENOENT') {
          loger('warn', 'root directory missing!');
          this.writeRootDirectory();
          this.writeFileAtRoot(file_path, data, overwrite);
        } else loger('error', ['writeFileAtRoot error:', error].join(' '));
      }
    } else loger('warn', 'the file already exists - skipping to the next step');
  }

  /** Creates Devutnia's config inside the root folder. In case there is no root folder
   * `writeConfigAtRoot` calls `writeRootDirectory` internally
   *
   * @param {Partial<DevutniaConfig>} config
   * @param overwrite - optional boolean - defaults to false - overwrite the file if true
   */
  writeConfigAtRoot(config?: Partial<DevutniaConfig>, overwrite?: boolean) {
    if (overwrite || !fs.existsSync(this.fromRootPath('/devutnia.config.json'))) {
      loger('info', 'creating root config...');

      try {
        fs.writeFileSync(
          this.fromRootPath('/devutnia.config.json'),
          JSON.stringify(merge(this.config, config)),
        );
        loger('info', 'root config created');
      } catch (error: any) {
        if (error['code'] === 'ENOENT') {
          loger('warn', 'root directory missing!');
          this.writeRootDirectory();
          this.writeConfigAtRoot(config, overwrite);
        } else loger('error', ['writeConfigAtRoot error:', error].join(' '));
      }
    } else loger('warn', 'root config already exists - skipping to the next step');
  }

  /** Crates Devutnia's root directory in the filesystem's `home` folder */
  writeRootDirectory() {
    if (!fs.existsSync(this.rootPath())) {
      loger('info', 'creating root directory...');
      try {
        fs.mkdirSync(this.rootPath());
        loger('info', 'root directory created');
      } catch (error) {
        loger('error', ['writeRootDirectory error:', error].join(' '));
      }
    } else loger('warn', 'root directory already exists - skipping to the next step');
  }

  /** Wraps Devutnia's installation in an `integration flow` */
  installer(config?: Partial<DevutniaConfig>) {
    loger('info', `starting devutnia's installer...`);

    if (config?.dev_key) {
      loger('info', `"dev_key" provided - additional intergrations enabled`);
    }

    this.writeConfigAtRoot(config);
    loger('info', `installation complete`);
  }

  /** Updates the config file and returns the latest version */
  updateConfig(config: Partial<DevutniaConfig>) {
    const file_path = this.fromRootPath('/devutnia.config.json');

    loger('info', 'updating config file...');

    let file_json: string | undefined;
    try {
      file_json = fs.readFileSync(file_path, { encoding: 'utf8' });
    } catch (error) {
      loger('error', ['updateConfig read file error:', error].join(' '));
    }

    const file_update = merge(JSON.parse(file_json), config);
    if (file_json) {
      try {
        fs.writeFileSync(file_path, JSON.stringify(file_update), { encoding: 'utf8' });
      } catch (error) {
        loger('error', ['updateConfig write file error:', error].join(' '));
      }
    }

    return file_update;
  }
}

export interface DevutniaConfig {
  /** The `dev_key` can be found on your Devutnia's profile
   * @link https://devutnia.com/user/profile
   */
  dev_key: string;

  /** This contains a list of paths to projects using Devutnia
   * @example yards: ['/path/to/project/a', '/path/to/project/b']
   */
  yards: string[];
}

export default DevutniaConstructor;
