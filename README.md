# SCHOOL

School Project designed as per requirements from SpringRole.

[SEE-SCREENSHOTS](#SCREENSHOTS) 

## Requirements

### Front end:

```
1. There will be a front end that has a login option - there will be two types of logins - one for admin and one for students (can be on different routes)
1.1 You can create an admin user from the backend and set a email / password through which the admin system can be accessed.

2. Admin can login and create new students account (and set a password there itself). He will also have to set the semester that the student is in. The semester can either be 5th semester or 6th semester (can be set via dropdown while creating the student)

3. Once a student account is created, the student can login to the system and set their subjects.

4. If the student is from 5th semester then they can only select one subject. If the student is from 6th semester then the student has to select two subjects. The student have to pick from the following subject options:
    4.1 5th semester - Node.js, Mongo, React.
    4.2 6th semester - Redux, Sequelize, serverless, React native.

5 The student can update the options as many times as they like.

6 The admin can login and should also have a route where the student subject selections are shown.
```

### Backend:

```
1. All API endpoints will accept and return data in json format.

2. The subjects table can be populated from the backend with the subject options that are given above.

3. You will need to write API end points as needed for all the use cases mentioned above.
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes only.

## Prerequisites

What things you need to install the software and how to install them

```
1. Node.Js and npm installed machine.
2. Code Editor.
3. MongoDB community edition.
```

## Installing and Running the application.

The project has 3 directories: client, server, and db.

From the `db` directory, start the mongo server using the following command in a terminal window:

```
    mongod --dbpath ./
```

From the `server` directory, run the following commands in order:

```
    npm install -g node-gyp
    npm install
    npm start
```

From the `client` directory, run the following commands in order:

```
    npm install
    npm start
```

Now the application is up and running.

## Using the application

As per the requirement, one can login as an `admin` or as a `student`. One can use the same login window to login as either. The credentials of the admin and students are given below:

Admin:

```
Email ID: admin@school.com
Password: @dm!npwd
```

Students:

- User 1 in 5th Semester:

```
Email ID: arjun@school.com
Password: Arun123
```

- User 2 in 6th Semester:

```
Email ID: karan@school.com
Password: DefPwd
```

## Built With

- [create-react-app](https://github.com/facebook/create-react-app) - Used to create the basic client structure
- [Express Generator](https://expressjs.com/en/starter/generator.html) - Used to create the basic server structure
- [Material-UI](https://material-ui.com) - Used for Styling components
- [Unsplash](https://unsplash.com) - Used for the login background image

## Authors

**Avinash Kadagodu Ramesha**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Screenshots

### Login Page on application startup

![GitHub Logo](/screenshots/LoginPage.png)

### After Admin has logged in, the admin has option to add a new student and see a list of students who have selected the subjects.

![GitHub Logo](/screenshots/AfterAdminLogin.png)

### After Admin has added a new student, the new student info is reflecting in the list, but the subjects selected are not shown as the student is yet to login and make the selection.

![GitHub Logo](/screenshots/AfterAddingNewStudent.png)

### 6th Semester Student after logging in for the first time. None of the subjects are auto selected. The student can make changes to the subjects 'n' number of times. The Save button will be enabled only when 2 subjects are selected. Not more, not less.

![GitHub Logo](/screenshots/6thSemFirstTime.png)

### 6th Semester Student second time login and onwards, the previously selected subjects will be auto selected. The student can leave it as it is, or make a change to the subject selection. The Save button will be enabled only when 2 subjects are selected. Not more, not less.

![GitHub Logo](/screenshots/6thSemAlreadySelected.png)

### 5th Semester Student after logging in for the first time. The first option in the list is auto selected. The student can change the selection 'n' number of times. The Save button will always be enabled, as one subject will always be selected.

![GitHub Logo](/screenshots/5thSemFirstTime.png)

### 5th Semester Student second time login and onwards, the previously selected subjects will be auto selected. The student can leave it as it is, or make a change to the subject selection. The Save button will always be enabled, as one subject will always be selected.

![GitHub Logo](/screenshots/5thSemAlreadySelected.png)
