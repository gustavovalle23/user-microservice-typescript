# User MicroService
> This is a microservice that represents the users of the application

## Features and Technologies
> This project uses Node.js v16.17.1, NestJS (with Express), Mongoose, MongoDB and GraphQL

* Find all users registered
* Find all user by id

## Build Setup Docker

```console
user@project:~$ docker-compose run app yarn install --ignore-scripts
user@project:~$ docker-compose build --no-cache && docker-compose up
```

## Build Setup Local
```
# install dependencies
```console
user@project:~$ docker-compose run app yarn install --ignore-scripts
```

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
query FindUserById($findUserByIdId: String!) {
  findUserById(id: $findUserByIdId) {
    user {
      id
      isActive
      name
      email
      documentNo
      birthDate
    }
  }
}
```

```js
mutation Mutation($user: CreateUserInput!) {
  createUser(user: $user) {
    user {
      id
      isActive
      name
      email
      documentNo
      birthDate
    }
  }
}
```
