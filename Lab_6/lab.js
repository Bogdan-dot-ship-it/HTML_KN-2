let a = 15;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);

let firstname = "Ivan";
let lastname = "Petrenko";
let fullname = `${firstname} ${lastname}`;

console.log(fullname);

let age = 20;

if (age >= 18) {
    console.log ("Доступ дозволено");
}
else {
    console.log("Доступ заборонено");
}

let i = 1;
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

function square(number) {
    return number * number;
}
let result = square(5);
console.log(result);


let fruits = ["Яблуко", "апельсин", "кавун"];
fruits.push("диня");
console.log(fruits);
