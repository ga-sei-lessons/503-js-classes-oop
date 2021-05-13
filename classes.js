// Abstraction -- make an object 'factory' that creates objects from a blueprint
// Encapsulation -- keeping data hidden away and restrcting access 
// Inheritance
// Polymorphism

const person1 = {
  // encapsulation
  name: 'Weston',
  catchPhrase: 'cool, cool, cool.',
  sayCatchPhrase: () => {
    console.log(person1.catchPhrase)
  }
}

// person1.sayCatchPhrase() // methods are functions in an object 

// module pattern
const personFactory = (name, catchPhrase) => {
  // abstraction
  return {
    name: name,
    catchPhrase: catchPhrase,
    sayCatchPhrase: () => {
      console.log(catchPhrase)
    }
  }
}

const weston = personFactory('Weston', 'cool, cool, cool')
const anna = personFactory("Anna", "Alright, Y'all")
weston.sayCatchPhrase()
anna.sayCatchPhrase()

// constructor function -- another way of making an object factory
function Person(name, catchPhrase) {
  // this keyword 
  // constructor -- constructs an object
  this.name = name
  this.catchPhrase = catchPhrase
  this.sayCatchPhrase = () => {
    console.log(this.catchPhrase)
  }
}

// make a new object with the 'new' keyword
const nick = new Person('Nick', 'wimmy wam wam wozzle')
nick.sayCatchPhrase()
console.log(nick)

const dateObject = new Date()
console.log(dateObject)

class Dog {
  // shared by all class instances
  static totalDogs = 0

  constructor(name, age) {
    this.name = name
    this.age = age
    Dog.totalDogs++
  }

  barkHello() {
    console.log(`i am a dog and my name is ${this.name}, may age is ${this.age}`)
    console.log(`total dogs: ${Dog.totalDogs}`)
  }
}

const dixie = new Dog('Dixie', 11)
dixie.barkHello()
const steve = new Dog('Steve', .85)
steve.barkHello()

// inheritance -- taking a parent object's shape (constructor)
class Retriever extends Dog {
  constructor(name, age, color) { // polymorphism -- same interface as parent
    super(name, age)
    this.color = color
  }

  fetch() {
    console.log('imma get the BALLLLL!!!')
  }
}

const buddy = new Retriever('Buddy', 11, 'golden')
buddy.barkHello()
buddy.fetch()
console.log(buddy.color)

console.log(buddy instanceof Dog) // inheritance 
console.log(buddy instanceof Person)