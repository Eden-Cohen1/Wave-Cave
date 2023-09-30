"use strict"

export class User{
    constructor(name, age, country, img='./images/profile-photo.png'){
        this.dateJoined = new Date().toISOString().split('T')[0];
        this.name = name;
        this.age = age;
        this.country = country;
        this.photo = img;
    }
}