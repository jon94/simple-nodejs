# Use an official Node.js runtime as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Define the command to run your application with dd trace
CMD [ "node", "--require", "dd-trace/init", "app.js" ]
