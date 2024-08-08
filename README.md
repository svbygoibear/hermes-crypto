<h1 align="center"> hermes-crypto</h1>
<p align="center"><img alt="hermes-crypto" src="./src/assets/svg/hermes-crypto-logo.svg" width="200"></p>

Hermes (called Mercury in Roman mythology) was considered the messenger of the Olympic gods. He possesses the ability to influence outcomes and tip the scales in favor of those who seek his favor. As the god of luck, he brings both fortune and misfortune to those who dare to test their luck.

`hermes-crypto` is a fun page where you can ponder if the price of your coin will go up or down; place your bets, and see if the gods will be in your favour!

## Status

[![Build Status](https://github.com/svbygoibear/hermes-crypto/actions/workflows/s3-pipeline.yml/badge.svg?branch=main)]()

[![Code Coverage](https://github.com/svbygoibear/hermes-crypto/actions/workflows/test-suite.yml/badge.svg?branch=main)]()

## What makes me tick?

Under the hood, I am powered by;

-   [Vite](https://vitejs.dev/): Why Vite? It is lightweight, fast and has a ton of plugins. There are many good options available, but Vite made sense to get a project up and running quickly without applying the constraints of a framework.
-   [React](https://react.dev/): In 2024 it would be crazy to start up a new project and not use something like React/Vue/Angular when working in the JS ecosystem - unless you had a specific requirement to go that route.
-   [Typescript](https://www.typescriptlang.org/): A typed language is a powerful language. Not because it makes you fast, but because it helps you define a contract in your code. This leads to better tooling, less type-related errors and overall more confidence in your work.
-   [Storybook](https://storybook.js.org/): This is the perfect addition to any frontend to develop components in isolation, testing and documentation.
-   [Vitest](https://vitest.dev/): To compliment Storybook, Vitest is a Vite-native testing framework that re-uses all of Vite's config and plugins to ensure consistency! Want to add Jest later on? Well that is supported too.
-   [React Router](https://reactrouter.com): For routing between pages > react router makes this all possible.

## Installation

### Software

To properly run this project, assuming you already have git installed, you will also need to ensure that you have the following installed on your machine:

-   [`node.js`](https://nodejs.org/en): Lowest possible version compatible with this project is `v18.14.0`. The current LTS is however recommended.
-   [`npm`](https://www.npmjs.com/): For info on installation, go [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Minimum version required is `9.3.1`.

### Running

First to get things started, you have to install all the dependencies for this project by running the following in terminal on this project root:

```bash
npm install
```

Next, start up the project! If you are running this locally, fire it off in dev mode. This will give you access to additional debugging as well as an uncompressed version of this project.

```bash
npm run dev
```

Finally, if you are making contributions, and you want to check if you are meeting the project linting rules, then just stop on by and run the lint command in terminal. This is not a required step to get the project running on your machine.

```bash
npm run lint
```

### Issues

There is an issue with [`storybook`](https://storybook.js.org/) when running it, it does not cause any issues but it has been noted here: https://github.com/storybookjs/storybook/issues/28567

## A Deep Dive

This readme is to get you started, up and running and give some light background context. If you want a little more information, feel free to check out:

-   [What am I doing here?](./docs/goal.md): Want more background on the objectives of this app? This is the place.
-   [Technical Decisions](./docs/choices.md): This is a demo, and therefore some decisions were made to accommodate the scope of this project. This includes considerations, assumptions, etc.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
