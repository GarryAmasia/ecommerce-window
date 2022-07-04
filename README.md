# E-Commerce admin cms API server

This BackEnd API is built for the admin to create and amange their e-commer store.

This is onlu API server part, the client UI is availableat repo `...`

## How to use

1.run `git clone <put ur git url here>`
2.run npm install
3.run `cd < folder name>`
4.run `npm run dev `for the local development. Note that you must have nodemon install in your system, if not, runn`npm i nodemon -g`

## APIS

All our api url follow the following pattern : `{rootUrl}/api/v1`

### Admin registration and login api

This section show you how you can access the api for admin registration and login

Note: TODO : make sure the admin registration api is protected after first admin is created because only admin can add another admin user

All registration and login api follow the following pattern `{rootUrl}/api/v1/register-login`

| #   | PATH | METHOD | IS PRIVATE | DESCRIPTION                                                              |
| --- | ---- | ------ | ---------- | ------------------------------------------------------------------------ |
| 1.  | '/'  | POST   | YES        | Send user data(fName,lName,...) to create new admin user in the database |
