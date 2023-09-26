[under revision]

# NodeJS + MongoDB Web App. 

<br>


> **Note:** A part of the series of demo projects experimenting with a Node.js app.<br><br>
> This time I migrate the backend MySQL database to MongoDB and launch the app on two EC2 instances on the AWS infrastructure.<br>
> And instead of Terraform I used AWS CloudFormation for creating the infrastructure.

<br>

**Steps:**
- [**Create the infrastructure on AWS with CloudFormation**](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/blob/main/README.md#1-creating-the-infrastructure-with-aws-cloudformation)
- [**Migrate SQL data to NoSQL database**](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/tree/main#2-migrating-mysql-database-tp-mongodb-database-using-python)
- [**Modify the application code to replace SQL database connection code with MongoDB configuration.**](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/tree/main#3-modifying-the-application-code-to-replace-sql-database-connection-code-with-mongodb-configuration)
- [**Testing the app on the created EC2 instances**](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/blob/main/README.md#4-testing-the-app)

<br>

## Technologies used
- AWS
- EC2
- Node.JS
- Express
- JavaScript
- Python (used for converting the database)
- MongoDB (noSQL DBMS)
- Terraform



<br>

## Summary
This is a simple Node.JS Express application. It has a two-layer architecture: application layer and data layer. It connects to a **MongoDB** database hosted on an AWS EC2 instance, allowing for CRUD operations. Express provides a robust set of features for web and mobile applications.

**<details markdown=1><summary markdown="span">Detailed app description</summary>**

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

<p align="center">
  <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/b303d21f-a5ac-4787-a194-b9068d7e05ba" width="700px"/>
</p>

<p align="center">
  <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/2520e550-628b-4415-93d4-319490d38cde" width="700px"/>
</p>

<p align="center">
  <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/7112dbb2-b413-48d0-9da6-746f018481e4" width="700px"/>
</p>


## Prerequisites
- AWS Account
- Proper Permissions for your AWS user
- AWS CLI installed ([A very informative article](https://www.cyberciti.biz/faq/how-to-install-aws-cli-on-linux/))
- MySQL installed ([Article on Medium for installing on Amazon Linux 2023](https://muleif.medium.com/how-to-install-mysql-on-amazon-linux-2023-5d39afa5bf11) [or official installation guide for installing on UBUNTU](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/))
- MongoDB installed ([Official MongoDB installation guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/))
- A machine or EC2 instance to launch the Terraform script
- Configure AWS access with AWS CLI and the command ```aws configure```

## Running the App on AWS EC2 Instances

### 1. Creating the Infrastructure with AWS CloudFormation

[under revision]

[link to 'infra_launch.yml'](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/blob/5dad1390b5a806c74c12915d5f0e49aa199ef642/cloudformation_template/infra_launch.yml)

configure acess to AWS with: 

```
aws configure
```
launch the infrastructure set in infra_launch.yml with command:

```
aws cloudformation create-stack --stack-name YourStackName1 --template-body file://create2.yml
```

<p align="center">
  <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/877a9781-c2b0-4f1a-a15a-243a12426e01" width="700px"/>
</p>

### 2. Migrating MySQL database tp MongoDB database using Python

   **Setting up MySQL:**
   
   - **Install MySQL**:
   
       ```bash
       sudo apt update
       sudo apt install mysql-server -y
       sudo systemctl daemon-reload
       sudo systemctl start mysql
       ```
   
   - **Access MySQL**:
   
       ```bash
       sudo mysql
       ```
   
   - **(optional) Configure MySQL User if you want to test the App with MySQL database before migrating**:
   
       ```sql
       ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<yoursecurepassword>';
       ```
   
   - **Create a Sample Database for Testing**:
   
       ```sql
       CREATE DATABASE coffee;
       USE coffee;
       CREATE TABLE suppliers(
         id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         address VARCHAR(255) NOT NULL,
         city VARCHAR(255) NOT NULL,
         state VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(100) NOT NULL,
         PRIMARY KEY (id)
       );
       ```
   
       ```sql
       INSERT INTO suppliers (name, address, city, state, email, phone)
       VALUES ('John Smith', 'Downing Street, 10', 'London', 'Greater London', 'john.smith@hotmail.com', '1234567890');
       ```
   
       <p align="center">
         <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/25499e57-75ae-41de-ab05-4add1adec35a" width="700px"/>
       </p>
   
   - **Export Data to CSV**:
   
       ```bash
       mysql -u root -p -e "SELECT * FROM suppliers" coffee > output.csv
       ```
   
   **Convert CSV to JSON:**
   
   - **Setup Python & Required Libraries**:
   
       ```bash
       sudo apt install python3-pip
       pip3 install pandas
       ```
   
   - **Create the Conversion Script**:
   
       ```bash
       touch csv_to_json.py
       ```
   
       Then, add the following Python code to the file:
   
       ```python
       import pandas as pd
   
       # Read the CSV file
       df = pd.read_csv('output.csv', delimiter='\t')  # use tab as delimiter
   
       # Convert dataframe to JSON format
       df.to_json('output.json', orient='records', lines=True)
       ```
   
   - **Run the Conversion Script**:
   
       ```bash
       python3 csv_to_json.py
       ```
   
   **Setup and Import Data to MongoDB:**
   
   - **Install MongoDB**:
   
       [Official MongoDB Installation Guide](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
   
       ```bash
       cat /etc/lsb-release
       sudo apt-get install gnupg curl
       curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
       echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
       sudo apt-get update
       sudo apt-get install -y mongodb-org
       ls /var/lib/mongodb
       ps --no-headers -o comm 1
       sudo systemctl start mongod
       sudo systemctl status mongod
       sudo systemctl enable mongod
       mongosh
       ```
   
   - **Import Data into MongoDB**:
   
       ```bash
       mongoimport --db coffee --collection suppliers --file output.json
       ```

       <p align="center">
         <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/77a39437-cbed-47d4-a44e-c40be618f39c" width="700px"/>
       </p>

### 3. Modifying the application code to replace SQL database connection code with MongoDB configuration.

   - **To switch the app from MySQL to MongoDB I modified these app files:**

     **MySQL version**:<br>
   
     [config.js](https://github.com/otam-mato/nodejs_mysql_web_app_terraform/blob/7f1a16b581ca88fed31721b1fd29be04fa0a2486/resources/codebase_partner/app/config/config.js)<br>
     [supplier.controller.js](https://github.com/otam-mato/nodejs_mysql_web_app_terraform/blob/7f1a16b581ca88fed31721b1fd29be04fa0a2486/resources/codebase_partner/app/controller/supplier.controller.js)<br>
     [supplier.model.js](https://github.com/otam-mato/nodejs_mysql_web_app_terraform/blob/7f1a16b581ca88fed31721b1fd29be04fa0a2486/resources/codebase_partner/app/models/supplier.model.js)<br>
     
     **MongoDB version**:<br>
     
     [config.js](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/blob/3b29677e6e4a5387731065eacc7dd79ad0a0027b/app/config/config.js)<br>
     [supplier.controller.js](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/blob/3b29677e6e4a5387731065eacc7dd79ad0a0027b/app/controller/supplier.controller.js)<br>
     [supplier.model.js](https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/blob/3b29677e6e4a5387731065eacc7dd79ad0a0027b/app/models/supplier.model.js)<br>


     
### 4. Testing the app.

   - **Clone the current repository**:
    
      ```
      git clone https://github.com/otam-mato/nodejs_mongodb_web_app_terraform.git
      ```
      
      ```
      cd /home/ubuntu/nodejs_mongodb_web_app_terraform
      ```
   - **Install nodejs and npm**:
      ```
      sudo apt install nodejs
      ```
      ```
      sudo apt install npm
      ```
   - **Install dependencies**:   
      ```
      npm install
      ```
   - **Start the app**:
     
      you can create the ENV variable with endpoint where your database is hosted, otherwise the APP_DB_HOST value will be used from config.js 
     
      ```
      export APP_DB_HOST=mongodb://<your_host_ip>:27017/coffee
      ```
      then
     
      ``` 
      npm start
      ```
      
     <br>
      
   - **Access the app in your web browser using the public ip/dns name of your server and port 3000**:

     <br>
    
      <p align="center">
        <img src="https://github.com/otam-mato/nodejs_mongodb_web_app_terraform/assets/113034133/2520e550-628b-4415-93d4-319490d38cde" width="700px"/>
      </p>

---

<details markdown=1><summary markdown="span">OLD</summary>

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

</details>




