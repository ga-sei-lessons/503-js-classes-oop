# OOP in JS

This lesson is a gentle introduction/broad overview to OOP and OOP in JS

## Learning Objectives

* understand the theoretical principles of OOP
* understand the application of OOP as a tool/programming pattern (when/why to use)
* understand how OOP fits into JS (prototype chainging/prototypical inheritance)
* use several OOP syntaxes/patterns in JS (factory functions, constructor functions, and classes)
* use the `new` keyword, `this` keyword and `class` keyword

## sources

gitbook notes:

https://gawdiseattle.gitbook.io/wdi/javascript/javascript-oop

lab:

https://github.com/WDI-SEA/lab-create-your-own-js-class

factory functions:

https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/factory-functions-and-the-module-pattern

https://addyosmani.com/resources/essentialjsdesignpatterns/book/

mdn inheritance:

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects#Inheritance

medium article comparing classes/constructor functions/factory functions:

https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e

medium article on principles of OOP:

https://medium.com/@cancerian0684/what-are-four-basic-principles-of-object-oriented-programming-645af8b43727

js prototype:

https://www.freecodecamp.org/news/javascript-prototype-explained-with-examples/

## Intro

JavaScript is an object oriented programming language (or at least it does its best to approximate one). Object oriented programming is characterized by the creation and use of collections of data and behavior that act like everyday physical objects. Every day we interact with objects like chairs, beverages, cars, other people, etc. These objects have properties that define them and behaviors we can execute to interact with them. Over many years, programmers have found that designing systems to reflect discrete, everyday objects makes the systems easier to understand, write, test, and maintain.
You will hear people say that "everything is an object" in JavaScropt. What this means is that nearly every variable you declare already has a set of properties and functions that it can use because it is an object. Every string, number, array, object, etc has a set of behaviors and properties that are "baked-in" because they are instances of a class. For example, every string you declare is an instance of a built-in JavaScript String class and because of that you can use any of the built-in string functions like toUpperCase() and toLowerCase() on your own string.
Frequently, we want to design our own special data types that hold our own specific data and organize it in a certain way. JavaScript gives us a string and a number, but what if we want to store a bunch of data where each item contains a string and an number and a function that prints them out nicely? We can make a class for that and then each object we make from that class will have all that baked-in.

## Principles of OOP

#### Abstraction -- object 'factories' only need to be a blueprint (interface), and don't need to know about each 'instance' of a object

Fundamental concept behind OOP

#### Encapsulation -- keeping data hidden away and restricting access to only the functions that need to interact with it

That is a big, fancy word that means that your data and functions inside a class are protected and scoped to that class. Each object encapsulates its own data attributes and functions and because they are inside of an object, they are protected from global variable accesses. It also adds the benefit of organization because a class only needs to contain things relevant to the class itself. Classes are generally self-contained, modular and reusable - which are all good things in programming.
When we add a static variable to a class that can only be accessed through that class, that is a perfect example of the benefit of encapsulation. When we attach the data that comes in via the constructor to the individual objects we instantiate, that is also one of the virtues of encapsulation.

#### Inheritance -- sub classes can reuse code from super classes, there is a parent child relationship between classes

As we showed above, classes can incorporate behavior from other classes by inheriting from them using the extends keyword. This leads to a lot of code savings. If we need more specific or additional functionality in a class we can simply extend that class and not need to rewrite anything. Most large software solutions, including Node and the DOM built into the browser, are built as a big collection of general-to-specific classes.

#### Polymorphism -- the interface for a parent class should work for inherited sub classes

A term meaning "many shapes", polymorphism refers to the ability of a function or even a whole object to take on different behaviors depending on which class is being called. Though the name of a function can stay the same as it is inherited to other classes, those subclasses can override that function with new or extended behavior. The code calling that method calls it the same as it would any other time but it will do different things depending on what object it was called on, hence "many shapes".

## Factory Functions

```javascript
// hard coded object
const person1 = {
  // encapsulation
  name: 'Weston',
  catchPhrase: 'wimmy wam wam wozzle!',
  sayCatchPhrase: () => {
    console.log(person1.catchPhrase)
  }
}

person1.sayCatchPhrase()

// abstraction to object factory
const personFactory = (name, catchPhrase) => {
  // encapsulation
  const sayCatchPhrase = () => {
    console.log(catchPhrase)
  }

  return { 
    name: name, 
    catchPhrase: catchPhrase, 
    sayCatchPhrase: sayCatchPhrase 
  }
}

const weston = personFactory('Weston', 'wimmy wam wam wozzle!')
```

## Constructor functions

```javascript
// abstraction
function Person(name, catchPhrase) {
  // constructor - encapsulation
  this.name = name
  this.catchPhrase = catchPhrase
  this.sayCatchPhrase = () => {
    console.log(this.catchPhrase)
  }
}

const nick = new Person('Nick', 'HEYO!')

nick.sayCatchPhrase()

// inheritance
function PetOwner(name, catchPhrase, pet) {
  // refer back to Person's constructor
  Person.call(this, name, catchPhrase)
  this.pet = pet
  this.feedPet = () => {
    console.log(`${this.pet} loves the food ${this.name} gave them`)
  }
}

// define PetOwner's prototype and constructor to be Person's
PetOwner.prototype = Object.create(Person.prototype)
PetOwner.constructor = Person

const sneeb = new PetOwner('Sneeb', 'hola', 'gary the spider')

sneeb.sayCatchPhrase()
sneeb.feedPet()

console.log(sneeb instanceof PetOwner)
```

## Classes

https://gawdiseattle.gitbook.io/wdi/javascript/javascript-oop/01-js-oop-2019

## Inheritance

The syntax for inheritance depends on whether you are using constructor functions or classes. For constructor functions you have to use the parent's call() method with the child's thisand then manually set the child's prototype and constructor. Classes use the nifty extends keyword.


#### Constructor Functions

```javascript
// top prototype in the chain
function One(){
  this.one = 'property of one'
}
// will inherit One's properties
function Two() {
  // invoke parent's call() on this
  One.call(this)
  this.two = 'property of two'
}
// define Two's prototype as One's
Two.prototype = Object.create(One.prototype);
Two.prototype.constructor = One
// will inherit Two's protoype
function Three() {
  // invoke parent's call() on this
  Two.call(this)
  this.three = 'property of three'
}
// define Three's prototype as Two's
Three.prototype = Object.create(Two.prototype);
Three.prototype.constructor = Two
let newThree = new Three
// will log properties inherited from One and Two
console.log(newThree.one)
console.log(newThree.two)
console.log(newThree.three)
// inheritance chain:
// true
console.log(newThree instanceof One)
// true
console.log(newThree instanceof Two)
// false
let newTwo = new Two
console.log(newTwo instanceof Three)
```