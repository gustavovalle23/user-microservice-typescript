# User MicroService
> This is a microservice that represents the users of the application

## Features and Technologies
> This project uses Node.js v16.17.1, NestJS (with Express), Mongoose, MongoDB and GraphQL

- [x] Find all users registered
- [x] Find all user by id
- [ ] Create user
- [ ] Update user
- [x] Use docker and docker-compose
- [x] Configure MongoDB
- [x] Use task file

## Build Setup Docker

```console
user@project:~$ docker-compose run app yarn install --ignore-scripts
user@project:~$ docker-compose build --no-cache && docker-compose up
```

# Build Setup Local
## install dependencies
```console
user@project:~$ docker-compose run app yarn install --ignore-scripts
```

## start the server (GraphiQL is started at http://127.0.0.1:3000)
yarn start

# run tests
yarn test

## Query Examples

```graphql
query FindAllUsers {
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

```graphql
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

```graphql
mutation CreateUser($user: CreateUserInput!) {
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
