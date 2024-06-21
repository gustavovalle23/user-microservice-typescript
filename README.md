# User MicroService
> This is a microservice that represents the users of the application

## Features and Technologies
> This project uses Node.js v18.14.0, NestJS (with Express), Mongoose, MongoDB and GraphQL

- [x] Create user
- [x] Read/Find all users registered
- [x] Read/Find all user by id
- [ ] Update user
- [ ] Delete user
- [x] Use docker and docker-compose
- [x] Configure MongoDB
- [x] Use task file

## Build Setup Docker
```console
user@project:~$ task
```

## Stop Docker
```console
user@project:~$ task stop
```


## enter n container server (GraphiQL is started at http://127.0.0.1:4000/graphql)
task app

# run tests
```console
user@project:~$ yarn test:e2e
user@project:~$ yarn test:cov
```

## Query Examples

```graphql
query FindAllUsers {
  allUsers {
    id
    isActive
    name
    email
    cpf
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
      cpf
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
      cpf
      birthDate
    }
  }
}
```
