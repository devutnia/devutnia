import path from 'path';
import { z } from 'zod';
import file_system from 'fs';
import merge from 'deepmerge';

import { loger } from './loger';

export type Validators = ReturnType<typeof validators>;
export const validators = () => ({
  dev_id: z.string().uuid().optional(),
  yards: z.array(z.string()).optional(),
});

export type Schemas = ReturnType<typeof schemas>;
export type ConfigSchema = z.infer<Schemas['config']>;
export const schemas = () => {
  const { dev_id, yards } = validators();
  return {
    config: z.object({ dev_id, yards }),
  };
};

export function home_path(sub_path?: string) {
  const home = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  return sub_path ? path.join(home, sub_path) : home;
}

export function directory_editor(dir_path: string, fs: typeof file_system) {
  if (dir_path && !fs.existsSync(dir_path)) {
    loger('warn', `directory "${dir_path}" doesn't exist`);

    try {
      loger('info', `creating "${dir_path}" directory...`);
      fs.mkdirSync(dir_path);
      loger('info', `directory "${dir_path}" created`);
    } catch (e) {
      loger('error', `directory creation error: ${JSON.stringify(e)}`);
    }
  }

  return {
    file: <T>(file_path: string, initialData?: T extends object ? Partial<T> : T) => {
      const target_path = path.join(dir_path, file_path);

      if (!fs.existsSync(target_path)) {
        loger('warn', `file at "${file_path}" doesn't exist`);

        try {
          loger('info', `creating new file`);
          fs.writeFileSync(dir_path, JSON.stringify(initialData));
          loger('info', `file created at: "${target_path}"`);
        } catch (e) {
          loger('error', `file creation error: ${JSON.stringify(e)}`);
        }
      }

      const read = (path: string): Readonly<T> => {
        try {
          const file = fs.readFileSync(path, { encoding: 'utf8' });
          return Object.freeze(file ? JSON.parse(file) : undefined);
        } catch (e) {
          loger('error', `directory read file error: ${JSON.stringify(e)}`);
        }
      };

      return {
        read: () => read(target_path),
        write: (value: T extends object ? Partial<T> : T) => {
          let updated: typeof value;
          if (typeof value !== 'object') updated = value;
          else updated = merge({ ...read(target_path) }, value) as typeof value;

          try {
            fs.writeFileSync(target_path, JSON.stringify(updated), { encoding: 'utf8' });
          } catch (e) {
            loger('error', `directory write file error: ${JSON.stringify(e)}`);
          }

          return read(target_path);
        },
      };
    },
  };
}

export function root_directory() {
  const root = directory_editor(home_path('/.devutnia'), file_system);

  return {
    config_file: () => root.file<ConfigSchema>('/devutnia.config.json'),
  };
}
