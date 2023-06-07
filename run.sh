#!/bin/bash

# Set the working directory of your Node.js application
APP_DIR="C:/Users/advai/Desktop/Assignment"

cd "$APP_DIR" || exit

npm i
nodemon server.js