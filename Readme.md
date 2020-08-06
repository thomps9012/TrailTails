# TrailTails

A user-based Node Express app designed to help users find local hiking trails. Explore the most popular trails near you and locate the ones that allow Dogs! Get driving directions, current trail conditions and check weather conditions.

![Alt text](./public/assets/images/TrailTailsLandingPage.png?raw=true "TrailTails Landing Page")

**Deployed Application:** (http://trailtails.herokuapp.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please ensure all of the following prerequisites are installed on your local development machine:

* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.

* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.

* MySQL - [Download & Install MySQL](https://dev.mysql.com/downloads/installer/), and make sure it's running on the default port (27017).

### Download

There are several ways you can get the code:

### Cloning The GitHub Repository
The recommended way to get the TrailTails code is to use git to directly clone the TrailTails repository:

```bash
$ git clone https://github.com/thomps9012/TrailTails.git TrailTails
```

This will clone the latest version of the [PROJECT NAME] repository to a **TrailTails** folder.

### Downloading The Repository Zip File
Another way to use the TrailTails code is to download a zip copy from the [master branch on GitHub](https://github.com/thomps9012/TrailTails/archive/master.zip). You can also do this using the `wget` command:

```bash
$ wget https://github.com/thomps9012/TrailTails/archive/master.zip -O trailtails.zip; unzip trailtails.zip; rm trailtails.zip
```

Don't forget to rename after your project name.

### Install

Once you've downloaded and installed prerequisites, you're ready to begin install process. 

The project comes pre-bundled with a `package.json`file that contains the list of modules you'll need to run the application.

To install dependencies, run this in the application folder from the command-line:

```bash
$ npm install
```
This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* To update these packages later on, just run `npm update`

## Running The Application

Run the application using npm:

```bash
$ npm start
```

The application should run on port 8080 with the *development* environment configuration, so in your browser just go to [http://localhost:8080](http://localhost:8080)

## Running the tests

```bash
$ npm test
```

## Built With

* [NodeJs](https://nodejs.org/en/docs/) - The Server-Side Library Used
* [Express](https://expressjs.com/) - Server technology
* [Passport](http://www.passportjs.org/) - Secure User Authentication
* [Sequelize](https://sequelize.org/) - MySQL ORM

## Team

* **Andrew Murphy**
* **Samuel Thompson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details