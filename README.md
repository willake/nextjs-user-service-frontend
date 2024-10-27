# Nextjs User Service Frontend

This is a Next.js project for testing my [ktor user service](https://github.com/willake/ktor-user-service)

## Features

- Register account
- Login
- Edit account info(email, password...etc)
- Delete account

## Test

Install `npm`, `yarn`, or `pnpm`

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

By default, the dev server is run on `localhost:3000`

## Version Control

This project follows [GitFlow](http://datasift.github.io/gitflow/IntroducingGitFlow.html) version control rules, but not that strict.

Hereby a brief guide:

-   For the `main` branch, you cannot push commits into it directly. It can only be merged from any `release` branch with a pull request. We need to make sure that every version of the `main` branch is the latest production-ready game.
-   For the `develop` branch, you cannot push commits into it directly. It can only be merged from any `feature/xxx_xxx` branch with a pull request. We need to make sure that every version of the `develop` branch is a runnable game.
-   If you want to add a new feature or maybe refactor any code structure, **you should create a branch named `feature/the_name_of_feature` from the develop branch.** When the branch is finished, you can create a pull request for updating the `develop` branch.
-   When a `develop` branch is ready to be published, you can create a pull request to create a `release/vx.x.x` branch. The name of a branch could be `release/v0.0.1` or `release/alpha1`.
