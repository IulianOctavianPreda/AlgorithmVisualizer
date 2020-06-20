# AlgorithmVisualizer

## Getting started

- Run `npm run restore` to install the node modules for the web app and the electron app
- Run `ng serve` or `npm run start:web` to start the web app

## Package.json scripts

The package.json lists all the scripts you might need, you can add more or delete the ones you don't like.

Most script will have the ending

- `:web` for the web project,
- `:android` for the android project
- `:electron` for the electron project
- `:ios` for the ios project

### Scripts:

- `add` - `add:android`, `add:electron`, `add:ios` - adds the desired platform to the project - it will create a folder with the same name in the root folder - It must be used only once as initialization, and the current template already initialized them and updated the packages to run out of the box, feel free to delete any of the `android`, `electron` or `ios` folders

- `open` - `open:android`, `open:electron`, `open:ios` - opens the project for the desired platform in the software of choice, for android it opens it in Android Studio(it must be installed), for IOS it opens XCode(can be used only on Macs), electron will open the app(think of it as ng serve for an Angular app)

- `copy` - `copy:android`, `copy:electron`, `copy:ios` - copy will copy the distribution folder of the web application to the platforms folder

- `build` - `build:web`, `build:android`, `build:electron`, `build:ios` - all build scripts will build the web, additionally the platform specific ones will also copy the distribution folder of the web application to the platforms folder

- `start` - `start:web`, `start:android`, `start:electron`, `start:ios` - start is a combination of build and open scripts

- `package` - `package:electron` - command available only for electron right now will create a non installable executable for the electron application - it uses a different script from the electron package.json that relies on electron-builder.
