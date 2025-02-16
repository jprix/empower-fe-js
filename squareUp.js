const customers = [
    { name: "Jay", orders: [15.50, 23.75, 9.99] },
    { name: "Lisa", orders: [30.00, 10.50] },
    { name: "Jordan", orders: [] },
    { name: "Ali", orders: [5.00, 7.50, 12.00, 20.00] }
];

function calculateTotalAndAverage(customers) {
    const result = {};
    for (const customer of customers) {
        const total = customer.orders.reduce((sum, order) => sum + order, 0);
        const average = customer.orders.length > 0 ? total / customer.orders.length : 0;
        result[customer.name] = {
            total: parseFloat(total.toFixed(2)),     
            average: parseFloat(average.toFixed(2)) 
        };
    }
    return result;
}

function displayJson(results) {
    const jsonOutput = JSON.stringify(results, null, 2);  
    console.log(jsonOutput);
}

function calcCustomers() {
    const command = process.argv.slice(2);

    if (command.length !== 2 || command[0] !== "run") {
        console.error("Usage: node file.js run <total|average|json>");
        process.exit(1);
    }

    const run = command[1];
    const results = calculateTotalAndAverage(customers);

    if (run === "total") {
        console.log("Total order amounts:");
        for (const [name, { total }] of Object.entries(results)) {
            console.log(`${name}: $${total.toFixed(2)}`);
        }
    } else if (run === "average") {
        console.log("Average order amounts:");
        for (const [name, { average }] of Object.entries(results)) {
            console.log(`${name}: $${average.toFixed(2)}`);
        }
    } else if (run === "json") {
        displayJson(results);
    } else {
        console.error("Invalid command. Use 'total', 'average', or 'json'.");
        process.exit(1);
    }
}

calcCustomers();
