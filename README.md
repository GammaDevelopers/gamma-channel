# Gamma Chan

---

Gamma chan is a image board written with a front-end written in React and a back-end written in Go

## Project structure

```
Project Root/
├── initdatabase.sql
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── server.go
└── src
    ├── components (react components)
    ├── data (models)
    ├── images
    ├── App.css
    ├── App.js
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

## Planned features

* Captcha support
* Citing posts
* Webm media upload
* Drawing canvas
* more

## Used APIs
* [Imgur api](https://apidocs.imgur.com/)
* Gamma API (Back-end API calls)


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
