# Gamma Chan

---

Gamma chan is a image board written with a front-end written in React and a back-end written in Go

## Project structure

```
Project Root/
├── initdatabase.sql (SQL structures for database)
├── package.json (Requirements for js frontend)
├── package-lock.json
├── public (Static content)
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md 
├── server.go (Backend server)
└── src
    ├── components (react components)
    ├── views  
    ├── data (models)
    ├── images 
    ├── App.js (React entrypoint)
    ├── App.test.js
    ├── index.css
    ├── index.js
    └── registerServiceWorker.js
```

## Installing & Running
* `npm install` install dependencies
* `npm start`   start development server (API is proxied to main server by default)

## Completed features

* Front page view
* Board view
* Thread view
* Creating threads
* Post replies
* Upload images
* Captcha support
* Citing posts
* Thread and post search
* Markdown support for posts
* News 
* Instructions
* Code Highlighting, Spoilers, Quotes(greentext)
* Random header image

## Planned features

* Webm media upload
* Drawing canvas
* more

## Used APIs
* [Imgur api](https://apidocs.imgur.com/)
* [Gamma API (Back-end API calls)](https://documenter.getpostman.com/view/3987217/gamma/RW1UP3eg)


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
