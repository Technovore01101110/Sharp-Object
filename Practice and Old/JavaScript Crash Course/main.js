// // console.log("Hello from main.js")
// // // This sends a message to the console.
// // console.log("I am Nathan Sharp")

// // // Variables

// // let age = 25
// // console.log(age)

// // const salary = 80000
// // console.log(salary)

// // let sum = 0
// // sum = 5
// // console.log(sum)

// const person = {
//     firstName: 'Bruce',
//     lastName: 'Wayne'
// }

// console.log(person.firstName)

// // Conversion
// let integer = Number("54")
// let float = parseFloat('3.14')
// let string = String(3.14) // or
// let stringInt = integer.toString()
// let boolean = Boolean(10) // null, undefined, 0, '', and NaN will return false

// const var1 = 10
// const var2 = '10'

// console.log(var1 == var2)
// console.log(var1 === var2)

// if conditions
// const num = 5
// if(num > 0) {
//     console.log('number is positive')
// } else {
//     console.log('number is not positive.')
// }
// ----------------------------------------------------------
// Advance JavaScript

// let a = 10
// function outer () {
//     let b = 20
//     function inner (){
//         let c = 30
//         console.log(a, b, c)
//     }
//     inner()
// }
// outer()

// function outer() {
//     let counter = 0
//     function inner () {
//         counter++
//         console.log(counter)
//     }
//     return inner
// }
// const fn = outer()
// fn()
// fn()

// function sum (a,b,c) {
//     return a+ b + c
// }

// console.log(sum(2,3,5))

// function curry (fn) {
//     return function(a) {
//         return function (b) {
//             return function (c) {
//                 return fn(a, b, c)
//             }
//         }
//     }
// }

// curriedSum = curry(sum)

// console.log(curriedSum(2)(3)(5))

// function sayMyName (name) {
//     console.log(`My name is ${name}`)
// }

// sayMyName('Nathan')

// const person = {
//     name: 'Vishwas',
//     sayMyName: function () {
//         console.log(`My name is ${this.name}`)
//     }
// }

// person.sayMyName()

// function sayMyName() {
//     console.log(`My name is ${this.name}`)
// }

// sayMyName.call(person)

// function Person(name){
//     this.name = name
// }

// const p1 = new Person('Vishwas')
// const p2 = new Person('Batman')

// console.log(p1.name, p2.name)

// sayMyName()