# JeTeQuizz

## Description

JeTeQuizz is a web application that allows users to create and play quizzes. The application is built using MySQL, Fastify, React, Node.js.

## Scripts

Below is an explanation of each script defined in the `package.json` file:

### Development Scripts

- **`dev:ui`**: Starts the frontend development server using Vite on port 3000 and opens it in the default web browser.
- **`dev:server`**: Starts the backend development server using tsx, watching for changes in the src/server/index.ts file.

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
