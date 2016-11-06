# Testing
## Brief description
This project uses headless browser testing through the usage of a javascript selenium webdriver implementation and a xvfb - virtual frame buffer. All testing is done using node.js. The modules currently in use are:
- selenium-webdriver
- travis-multirunner
- webrtc-utilities
- tap
- tape
- tape-catch
- chromedriver
- geckodriver

So far only firefox and chrome are being tested due to the fact that the travis-multirunner setup script downloads and installs only firefox and chrome. Also webrtc-utilities selenium library only supports initializing chrome and firefox properly.

## Prerequisites
Install the following applications to start testing
- sudo apt-get install nodejs-legacy
- sudo apt-get install xvfb
- sudo apt-get install npm

## How to test
You can test in one of tw: ways
1. simply pushing to github will trigger a travis CI build
2. locally on your machine (after downloading all the prerequisites above)
    - cd (to root of repository)
    - export BROWSER=chrome; export BVER=stable;export DISPLAY=:99.0;
    - npm install
    - ./node_modules/travis-multirunner/setup.sh
    - /sbin/start-stop-daemon --start --quiet --pidfile /tmp/cucumber_xvfb_99.pid --make-pidfile --background --exec /usr/bin/Xvfb -- :99 -ac -screen 0 1600x1200x16
    - npm test
    - /sbin/start-stop-daemon --stop --pidfile /tmp/cucumber_xvfb_99.pid;
    - export DISPLAY=:0

## Background information
- npm is used to manage all dependencies
    - npm install uses package.json to install all types of dependencies defined in the file (including devDependencies - node.js modules and bash scripts in this case, since we are writing test code).
    - npm test runs the script defined in the scripts tag of the package,json file
    - npm run-script runs any other non-standard scripts defined in the scripts tag of the package.json file
- Travis CI uses .travis.yml when starting a build to run the automated testing

## Advanced information about this project
- The tap testing framework used is defined by the script run from the scripts tag of the package.json
- The tap methods are enclosed within $repo_root/test/framework/tapBasdTestFramework.js
- more will be added later