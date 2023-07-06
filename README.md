# Cinema App
Cinema booking app, book a seat in available movies. Developed using Express Js + EJS with PostgreSQL database deployed in Vercel.

## Install and Run
```bash
npm install
npm run migrate up
npm run start
```
Don't forget to setup .env file

## What this app can do
- Authentications and Authorization
- See all movies and details
- See all available seats in each movie
- Book seats with Max 6 seats per transaction
- Create, Top Up, and Withdraw balance

## Table Schema
![erd drawio](https://github.com/dhifanrazaqa/cinema_app/assets/67745986/5c22355e-48a9-4cac-924b-698d22358c8a)

## Explanation
### Clean project architecture
In this project i'm trying to implement clean architecture 
![1_0u-ekVHFu7Om7Z-VTwFHvg](https://github.com/dhifanrazaqa/cinema_app/assets/67745986/4cf0028a-0bc1-4091-bbc7-ac3e1b2a59ac)
- Inside src/Domains folder I put everything related to Enterprise Business Rules, This is the core-business rules or domain-specific business rules. Also, this layer is the least prone to change.
- Inside src/Applications folder I put everything related to Application Business Rules, not the core business but plays an important role to provide all functionality for the app.
- Inside src/Interfaces folder I put everything related to gateways (CRUD operations) and controllers.
- Inside src/Infrastructures folder I put database and user interface.
### Test Driven Development
I use TDD only in early development process because I feel that it makes my work slower. Some parts of the code are also without unit testing.
### User Interface
I'm sorry for this "Minimalist" looking website at least it's responsive :)
## Deployment
https://cinema-app-gray.vercel.app/
