# DEVUTNIA (devootnia)

### Welcome to Devutnia. A Junior Oriented Software Delivery Collective and DAO

<br>

### Repository

This is a monorepo created with [nx.dev](https://nx.dev) using their [package-based](https://nx.dev/concepts/integrated-vs-package-based#package-based-repos) config. It was built with [yarn]() package manager and is using [eslint](), [typescript]() and [prettier]() for improved dev-ex. We're using [jest]() and [cypress]() to fool everyone that we know how to write tests.

The repository contains packages that can be used as separate modules and/or be bundled into executables using built in [Vercel's pkg]() library and served wherever.

<hr>

### How to start

To start working on Devutnia's repository make sure you have a fairly non-outdated (we're using LTS) version of [node]() installed on your machine. We recommend using [nvm]() to manage this problem for you.

Once you have node set up, you can simply run from the root folder

```typescript
yarn install
```

and start developing,

<hr>

### Devutnia's scripts

Devutnia provides a bunch of scripts that handle serving, building and bundling for you. You can look them up in `package.json` file and read about what they do below.

#### 1. Bundle Devutnia - `devutnia:bundle`

You can bundle Devutnia into a single executable file to serve it from wherever. We're using this executable as a file loaded along with the [`devutnia-app`]().

The script has 3 stages:

- it builds `devutnia-front` and outputs it into `devutnia-back/src/front` folder,
- it builds `devutnia-back` with the frontend from `devutnia-back/src/front`,
- it bundles everything and dumps it into `dist/bins/devutnia-exe` as an OS executable[\*]()

#### 2. Run Devutnia - `devutnia:exe`

This script runs the `devutnia-exe` file stored in `dist/bins`.

<hr>

### Devutnia's packages

The list below shows the packages currently being worked on at Devutnia. If you want to learn more about each package head to appropriate package and look for README file.

#### 1. devutnia-back
