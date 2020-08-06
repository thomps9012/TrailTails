// Seed file to seed users into database

const Sequelize = require('sequelize');
const db = require('../models/index.js');
const review = require('../models/review.js');
const savedTrail = require('../models/savedTrail.js');
const User = require('../models/user.js');


const seedUsers = [
    {
        firstName: 'Bill',
        lastName:   'Tiger',
        homeCity: 'Cleveland',
        homeState: 'Ohio',
        email: 'bill@tigers.com',
        password: 'dumbopw2002'
    },
    {
        firstName: 'Macy',
        lastName:   'Gray',
        homeCity: 'Los Alamos',
        homeState: 'Texas',
        email: 'macy@macys.com',
        password: 'stumble19'
    },
    {
        firstName: 'Ted',
        lastName:   'Danson',
        homeCity: 'Columbus',
        homeState: 'Ohio',
        email: 'tdance@ligers.com',
        password: 'napon2020'
    },
    {
        firstName: 'Rita',
        lastName:   'Turnkey',
        homeCity: 'San Francisco',
        homeState: 'California',
        email: 'rita@keybank.com',
        password: 'dollerbills'
    },
    {
        firstName: 'Shawnda',
        lastName:   'Jackson',
        homeCity: 'Cleveland',
        homeState: 'Ohio',
        email: 'sjackson@trust.com',
        password: 'church19'
    },
    {
        firstName: 'Sarah',
        lastName:   'Finnegan',
        homeCity: 'Orange',
        homeState: 'Ohio',
        email: 'sfunny@comedian.com',
        password: 'working20'
    },
    {
        firstName: 'Rico',
        lastName:   'Suave',
        homeCity: 'Houston',
        homeState: 'Texas',
        email: 'suave@dontmesstx.com',
        password: 'kickass17'
    }
]

const seed = () => {
    return User.bulkCreate(seedUsers)
}

seed()
.then(() => {
    process.exit();
});