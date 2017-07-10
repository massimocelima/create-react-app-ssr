This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

I have implemented a simple ssr production build with express.

Below you will find some information on how to perform common tasks.<br>

#Development Build

To build a development build run:

 ```
 yarn start
 ```

This will start a server at  http://localhost:3000

#Deployment

##Build a ssr build

To build a release build run:
 ```
 yarn build
 ```

This will create a SSR build of the website into the folder `build`

##Test SSR build before release

to debug and test a ssr build of the site, run the following command:
 ```
 yarn start:server
 ```

This should start a server at http://localhost:3001

##Deploy to production website
