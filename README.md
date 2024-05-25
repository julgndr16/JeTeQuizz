# JeTeQuizz

## Description

JeTeQuizz is a web application that allows users to create and play quizzes. The application is built using MySQL, Fastify, React, Node.js.

## Requirements

- Node.js 20
- yarn in stable version (npm install -g yarn to install then yarn set version stable)

## Running the Application (Development Mode)

1. Clone the repository
2. Run `yarn install` to install the dependencies
3. Add a .env file in the root directory with the following variables:
   - `DATABASE_URL` - The URL of the MySQL database
   - `CLIENT_ID` - The client ID of the Google OAuth application
   - `CLIENT_SECRET` - The client secret of the Google OAuth application
4. Run `yarn setup_prisma` to generate prisma schema and generate client according to schema.  
5. Run `yarn dev:server` to start the backend development server  
6. Run `yarn dev:ui` to start the frontend development server  

## Running the Application (Production Mode)

1. Same as development mode until step 4
2. Run `yarn build` to build the application 
3. Run `yarn start` to start the backend server 
4. Run `yarn preview` to preview the frontend application

## Scripts

Below is an explanation of each script defined in the `package.json` file:
    
### Development Scripts

- **`dev:ui`**: Starts the frontend development server using Vite on port 3000 and opens it in the default web browser.
- **`dev:server`**: Starts the backend development server using tsx, watching for changes in the src/server/index.ts file.
- **`setup_prisma`**: Pull db to generate prisma schema and generate client according to schema.

### Build Scripts

- **`clean`**: Removes the dist directory to ensure a clean build environment.
- **`build:ui`**: Builds the frontend application for production and outputs it to the dist/ui directory.
- **`build:server`**: Builds the backend application for production and outputs it to the dist/server directory.
- **`build`**: Runs the clean, build:ui, and build:server scripts in sequence. Full build of the application.

### Preview and Start Scripts

- **`start`**: Starts the compiled backend server with environment variables SERVER_PORT and SERVER_HOST.
- **`preview`**: Previews the built frontend application using Vite on port 5000 and opens it in the default web browser.

### Linting and Formatting Scripts

- **`lint`**: Runs ESLint on the project, checking for linting errors in TypeScript files and reporting any unused directives, with no warnings allowed.
- **`format`**: Runs Prettier on the project, formatting all TypeScript files in the src directory.
