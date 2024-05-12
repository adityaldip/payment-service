// Define the processTransaction function
function processTransaction(transaction) {
    return new Promise((resolve, reject) => {
        console.log('Transaction processing started for:', transaction);

        // Extract transaction details
        const { amount, currency } = transaction;

        // Validate currency (assuming a list of supported currencies)
        const supportedCurrencies = ['USD', 'EUR', 'GBP']; // Example list of supported currencies
        if (!supportedCurrencies.includes(currency)) {
            return reject(new Error('Unsupported currency'));
        }

        // Simulate long running process
        setTimeout(() => {
            // After 30 seconds, we assume the transaction is processed successfully
            console.log('Transaction processed for:', transaction);
            resolve(transaction); // Resolve the promise with the processed transaction
        }, 30000); // 30 seconds
    });
}

module.exports = processTransaction;
