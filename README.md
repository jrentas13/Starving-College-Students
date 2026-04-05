# Starving College Students

Contributors: Javier Rentas, Cayden Champion, James Gassaway, Ethan Showers, Israel McHoul

This is a web application for college students to share and discover affordable recipes.


## Software Features

The application includes the following features:

- [x] User registration and login
- [x] Browse recipes on the homepage
- [x] Search functionality to find recipes
- [x] View detailed recipes, including ingredients and instructions
- [x] Upload your own recipes
- [ ] Save favorite recipes to your profile
- [ ] User profiles with saved recipes and bio

## Instructions for Build and Use

Steps to build and/or run the software:

1. Install Node.js (version 18 or higher recommended)
2. Install MySQL (version 8.0 or higher)
3. Download or clone this repository to your computer
4. Create a `.env` file in the root directory with the following variables:
   - DB_HOST=localhost
   - DB_PORT=3306
   - DB_USER=your_mysql_username
   - DB_PASS=your_mysql_password
   - DB_NAME=your_database_name
   - PORT=8080
5. Run `npm install` to install dependencies
6. Set up your MySQL database and ensure the schema matches the application's expectations
7. Run `npm start` to start the server

Instructions for using the software:

1. Open your web browser and navigate to http://localhost:8080
2. Sign up for an account or log in if you already have one
3. Browse popular recipes on the homepage
4. Use the search functionality to find specific recipes
5. View detailed recipes, including ingredients and instructions
6. Upload your own recipes if the feature is implemented
7. Save favorite recipes to your profile

## Development Environment

To recreate the development environment, you need the following software and/or libraries with the specified versions:

* Node.js 18+
* MySQL 8.0+
* Fastify 5.7.4
* @fastify/mysql 5.0.2
* @fastify/cors 11.2.0
* dotenv 17.3.1

## Useful Websites to Learn More

I found these websites useful in developing this software:

* https://nodejs.org/
* https://www.fastify.io/
* https://dev.mysql.com/doc/

## Future Work

The following items I plan to fix, improve, and/or add to this project in the future:

* [ ] Implement user authentication and authorization
* [ ] Complete user profiles
* [ ] Add recipe rating and commenting system
