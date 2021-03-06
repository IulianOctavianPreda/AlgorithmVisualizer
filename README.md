# AlgorithmVisualizer

<img src="https://user-images.githubusercontent.com/33485041/86045483-5daf2500-ba54-11ea-98eb-d0b473e42e6e.png" alt="alt text" width="400" height="400">

# Preview

![split 4 gif optimized 2](https://user-images.githubusercontent.com/33485041/86045406-39534880-ba54-11ea-9b2f-3e5b74dce8d6.gif)

## Getting started

- Run `npm run restore` to install the node modules for the web app and the electron app
- Run `npm run generateIconsAndSplash` to create all the icons and splash art required by the android, ios and electron project
- Run `ng serve` or `npm run start:web` to start the web app
- Run `npm run start:electron` to start the electron application and `npm run package:electron` to create a portable executable for it.
- Run `npm run start:android` to copy the needed files to the android project and start android studio to build the application
- Run `npm run start:ios` to copy the needed files to the ios project and start xcode to build the application

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
