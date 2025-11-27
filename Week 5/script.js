function welcomeUser() {
    let name = prompt("Enter your name:");
    if (name && name.trim() !== "") {
        alert(`Hello ${name}! Welcome to JavaScript practice!`);
        document.getElementById("welcome-output").innerHTML = 
            `Welcome message generated for: ${name}\n(Used prompt(), alert(), and DOM manipulation)`;
    } else {
        alert("Please enter a valid name!");
    }
}

function checkEligibility() {
    let age = parseInt(document.getElementById("ageInput").value);
    let output = document.getElementById("age-output");
    
    if (isNaN(age) || age < 0) {
        output.innerHTML = "Please enter a valid age!";
        output.className = "";
        return;
    }
    
    let status = age >= 18 ? "ELIGIBLE" : "NOT ELIGIBLE";
    let message = age >= 18 ? 
        `You are ${age} years old - ${status} to vote! 🎉` : 
        `You are ${age} years old - ${status} (need ${18-age} more years)`;
    
    alert(message);
    output.innerHTML = `Age: ${age}\nStatus: ${status}\n${age >= 18 ? '✅ Eligible' : '❌ Not Eligible'}`;
    output.className = age >= 18 ? "output-eligible" : "output-not-eligible";
}

function runArrayMethods() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
    
    let doubled = numbers.map(n => n * 2);
    let evens = numbers.filter(n => n % 2 === 0);
    let sum = numbers.reduce((acc, n) => acc + n, 0);
    let upperFruits = fruits.map(f => f.toUpperCase());
    
    let output = document.getElementById("array-output");
    output.innerHTML = `
Original Numbers: [${numbers.join(', ')}]

📈 Map (doubled): [${doubled.join(', ')}]
📉 Filter (evens): [${evens.join(', ')}]
➕ Reduce (sum): ${sum}
🍎 Fruits UPPERCASE: [${upperFruits.join(', ')}]

forEach example (logged to console):
`;
    
    numbers.forEach((n, i) => console.log(`Index ${i}: ${n}`));
    output.className = "";
}
