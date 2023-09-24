# NodeJS + MongoDB Web App. 

<br>

> **Note:** A part of the series of demo projects experimenting with a Node.js app.<br><br>
> In this demo I automate creating the infrastructure on AWS using Terraform, convert the MySQL database to MongoDB database and deploy the app on EC2 instances.

<br>

## - Modifying the Terraform template 
## - Creating the infrastructure on AWS with Terraform
## - Converting SQL database to NoSQL database
## - Modifying the app files to use MongoDB for CRUD operations instead of MySQL
## - Deploying the app on the created EC2 instances.

<br>

## Technologies used
- AWS
- EC2
- Node.JS
- Express
- JavaScript
- MongoDB (noSQL)
- Terraform

<br>

## Summary
This is a simple Node.JS Express application. It has a two-layer architecture: application layer and data layer. It connects to a **MongoDB** database hosted on an AWS EC2 instance, allowing for CRUD operations. Express provides a robust set of features for web and mobile applications.

---



<br><br>

## Pre-requisites:
- MongoDB installed and started
- NodeJS and npm installed
- `git clone https://github.com/otam-mato/nodejs_mongodb.git`
- `npm install`
- `node index.js`

<br>

## Objective:

Perform CRUD operations on a MongoDB database and render the results on a web page.

<details markdown=1><summary markdown="span">App description</summary>

## Summary

The app sets up a web server for a supplier management system. It allows viewing, adding, updating, and deleting suppliers. 

The Main Solution:

#### **Dependencies and Modules**:
   - **express**: The framework that allows us to set up and run a web server.
   - **body-parser**: A tool that lets the server read and understand data sent in requests.
   - **cors**: Ensures the server can communicate with different web addresses or domains.
   - **mustache-express**: A template engine, letting the server display dynamic web pages using the Mustache format.
   - **serve-favicon**: Provides the small icon seen on browser tabs for the website.
   - **Custom Modules**: 
     - `supplier.controller`: Handles the logic for managing suppliers like fetching, adding, or updating their details.
     - `config.js`: Keeps the server's settings and the logging setup.

#### **Configuration**:
   - The server starts on a port taken from a setting (like an environment variable) or uses `3000` as a default.

#### **Middleware**:
   - It's equipped to understand data in JSON format or when it's URL-encoded.
   - It can chat with web pages hosted elsewhere, thanks to CORS.
   - Mustache is the chosen format for web pages, with templates stored in a folder named `views`.
   - There's a public storage (`public`) for things like images or stylesheets, accessible by anyone visiting the site.
   - The site's tiny browser tab icon is fetched using `serve-favicon`.

#### **Routes (Webpage Endpoints)**:
   - **Home**: `GET /`: Serves the home page.
   - **Supplier Operations**: 
     - `GET /suppliers/`: Fetches and displays all suppliers.
     - `GET /supplier-add`: Serves a page to add a new supplier.
     - `POST /supplier-add`: Receives data to add a new supplier.
     - `GET /supplier-update/:id`: Serves a page to update details of a supplier using its ID.
     - `POST /supplier-update`: Receives updated data of a supplier.
     - `POST /supplier-remove/:id`: Removes a supplier using its ID.

#### **Starting Up**:
   - The server comes to life, starts listening for visits, and announces its awakening with a log message.

</details>

<br><br>

## AS IS:

<img width="1000" alt="Screenshot 2023-09-03 at 19 11 42" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/4beaee99-ac83-49b4-8202-622ac8225dc0">
<img width="1000" alt="Screenshot 2023-09-03 at 19 12 00" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/6fe44870-b334-4c2b-aaed-79a0be5318a8">
<img width="1000" alt="Screenshot 2023-09-03 at 19 12 25" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/fe08f0e4-fd38-421a-9ba2-89cad0bdc45f">
<img width="1000" alt="Screenshot 2023-09-03 at 19 13 34" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/2a31eede-998f-4b91-98c4-74b6e7e7733a">
<img width="1000" alt="Screenshot 2023-09-03 at 19 14 29" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/feb43ffb-17a5-4477-803f-ba2b7bb3e5ee">


<br><br>

## TO BE:

<img width="1000" alt="Screenshot 2023-09-03 at 19 14 29" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/6c11186a-bbb7-4f67-8479-a23363b89fd8">

<img width="1000" alt="Screenshot 2023-09-03 at 19 14 29" src="https://github.com/otam-mato/nodejs_mongodb/assets/113034133/ba99a5d7-55dd-46d2-8ba1-459ed184997f">






