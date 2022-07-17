# User MicroService
> This is a microservice that represents the users of the application

## Features and Technologies
> This project uses Node.js v18.5.0, NestJS (with Express), TypeORM, PostgreSQL and GraphQL

* Find all users registered
* Find all user by id


## Build Setup
```
# install dependencies
yarn install

# start the server (GraphiQL is started at http://127.0.0.1:3000)
yarn start

# run tests
yarn test
```

## Query Examples

```js
query {
  allUsers {
    id
    isActive
    name
    email
    documentNo
    birthDate
  }
}
```

```js
query($userId: String!) {
  user(userId: $userId) {
    birthDate
    documentNo
    email
    id
    name
    isActive
  }
}
```
