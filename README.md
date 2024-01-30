#Test PR with commit over 2
# Test PR with commit over
<<<<<<< HEAD

=======
# Test PR with commit over 2
>>>>>>> b673e39 (commit)
# strapi-portofolio 

This project is the cms related to my [portofolio-front](https://github.com/djudj-dev/portofolio-front)\.
As the name suggests, it was created with [strapi](https://strapi.io/)\
But the [zod](https://zod.dev/) and [vitest](https://vitest.dev/) libraries are also used extensively in the project.\
The project is entirely in Typescript
## Installation

To install on local you need to git clone :

with HTTPS
```bash
$ https://github.com/djudj-dev/portofolio-strapi.git
```
or with SSH 
```bash
$ git@github.com:djudj-dev/portofolio-strapi.git
```
\
And after that go inside the project folder and install dependencies :
- with NPM
    ```bash
    $ npm install
    ```
- with YARN
    ```bash
    $ yarn install
    ``` 
- with PNPM
    ```bash
    $ pnpm install
    ```

## Run Locally

First for run locally you need to have a minimal strapi requirements, and a supported database running\
Look at Strapi requirements and supported database [here](https://docs.strapi.io/dev-docs/deployment#hardware-and-software-requirements)

Once this is good you will need to add a `.env` file in the project root for configure strapi.\
The `.env` file will be used for configure the server port and host, but also the database, and other strapi feature.\
In the root project you have a `.env.example` which can be used as a support for writting `.env`\
You can also read the strapi doc of [Strapi base configurations](https://docs.strapi.io/dev-docs/configurations#base-configurations)

Once You do that you can run locally by 2 way :    
- In watch mode with `dev` script :
    - with NPM
        ```bash
        $ npm run dev
        ```
    - with YARN
        ```bash
        $ yarn dev
        ``` 
    - with PNPM
        ```bash
        $ pnpm dev
        ```
Or with build and launch with `deploy` script : 
- In watch mode with `dev` script :
    - with NPM
        ```bash
        $ npm run deploy
        ```
    - with YARN
        ```bash
        $ yarn deploy
        ``` 
    - with PNPM
        ```bash
        $ pnpm deploy
        ```

The project will start and be accessible at the host and port specified in the `.env` file.
## Running Tests

To run tests, you can run the following command

- with NPM
    ```bash
    $ npm run test 
    ```
- with YARN
    ```bash
    $ yarn test
    ``` 
- with PNPM
    ```bash
    $ pnpm test
    ```

## Tech Stack
- **NodeJs** : *JS runner*
- **Typescript** : *JS Overlay*
- **Strapi**  : *Headless CMS*
- **PostgresSql** : *Database*
- **Zod**  : *Types securing* 
- **Vitest**  : *Test library*
- **Sqlite3** : *Temp testing database*
- **Supertest** : *API testing*
