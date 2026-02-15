# Colors-Lab
A simple webapp built using a LAMP stack for COP4331. It allows users to create an account, login, and search for and add colors to their personal list of colors.

# Technologies
- Backend runs on a Linux Apache server
- MySQL for database
- PHP for APIs
- HTML, CSS, Javascript for the frontend

# Setup
1. Obtain access to a remote Linux server capable of supporting a LAMP stack. This project used Digital Ocean.
2. In a terminal, sign into the remote server: ssh root@IPAddressOrDomain

3. Clone the repository into the server
    ```
    cd var/www/html
    git clone https://github.com/loganelkins01/Colors-Lab.git
    ```
4. Setup the MySQL database through the command line
    ```
    create database COP4331;
    use COP4331;
    CREATE TABLE `COP4331`.`Users`
    (
        `ID` INT NOT NULL AUTO_INCREMENT ,
        `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
        `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
        `Login` VARCHAR(50) NOT NULL DEFAULT '' ,
        `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
        PRIMARY KEY (`ID`)
    ) ENGINE = InnoDB;

    CREATE TABLE `COP4331`.`Colors`
    (
        `ID` INT NOT NULL AUTO_INCREMENT ,
        `Name` VARCHAR(50) NOT NULL DEFAULT '' ,
        `UserID` INT NOT NULL DEFAULT '0' ,
        PRIMARY KEY (`ID`)
    ) ENGINE = InnoDB;

    CREATE TABLE `COP4331`.`Contacts`
    (
        `ID` INT NOT NULL AUTO_INCREMENT ,
        `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
        `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
        `Phone` VARCHAR(50) NOT NULL DEFAULT '' ,
        `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
        `UserID` INT NOT NULL DEFAULT '0' ,
        PRIMARY KEY (`ID`)
    ) ENGINE = InnoDB;
    ```
5. Create an administrative user for the database with a unique username and password
    ```
    create user 'username' identified by 'password';
    ```
6. Update PHP files with the administrator's username and password
    ```
    $conn = new mysqli("localhost", "username", "password", "COP4331");
    ```

# Run
Visit the website at http://yourserverip

# Assumptions, Limitations, and AI usage
- The Linux server must have git installed and support MySQL, PHP, and Apache.
- No AI was used in the implementation of this lab or repository