## How it works

This is a sample project that shows how to stream all documents from a `mongodb` collection
to end users in order to download theme as a
single `csv` file.


## Install

Run `npm` inside the root of project.

```javascript
npm install
```

## Setup

### development

You should change database variables inside
`configs/env.dev.js` for generating mock users and also for using the application.
In order to create sample documents as `users` collection run this `npm` command.

```javascript
npm run mock:db:users
```

This script creates `1M` fake users by the performance of `nodejs >= 10` *Worker Threads* with a simple comunication.

## Start

```javascript
npm start
```

## Test

Current test just support api endpoints(*functional*).

```javascript
npm run test
```