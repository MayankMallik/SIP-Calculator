// Function to add commas as the user types
function formatNumber(input) {
    // Remove the error border as soon as the user starts typing
    input.classList.remove('error-border');
    
    let value = input.value.replace(/,/g, '');
    value = value.replace(/[^0-9.]/g, ''); 
    
    if (value.length > 3) {
        let parts = value.split('.');
        let integer = parts[0];
        let decimal = parts.length > 1 ? '.' + parts[1] : '';
        
        let lastThree = integer.slice(-3);
        let otherNumbers = integer.slice(0, -3);
        
        if (otherNumbers) {
            otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
            integer = otherNumbers + "," + lastThree;
        }
        value = integer + decimal;
    }
    input.value = value;
}

// Add this at the top to clear the error as soon as the user types
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() { 
        // Existing formatting function
        formatNumber(this); 
        // Remove red border from the Retirement Calculator logic
        this.classList.remove('error');
    });
});

function calculateSIP() {
    const requiredFields = ['monthlyAmount', 'rate', 'years'];
    let isValid = true;

    // 1. Validation Logic
    requiredFields.forEach(id => {
        const element = document.getElementById(id);
        if (element.value.trim() === "") {
            element.classList.add('error');
            isValid = false;
        } else {
            element.classList.remove('error');
        }
    });

    if (!isValid) return;

    // 2. Calculation Logic
    const getVal = id => parseFloat(document.getElementById(id).value.replace(/,/g, '')) || 0;

    const p = getVal('monthlyAmount');
    const annualRate = getVal('rate');
    const years = getVal('years');

    const i = (annualRate / 100) / 12; // Monthly rate
    const n = years * 12;               // Total months

    // SIP Formula: FV = P × [((1 + i)^n - 1) / i]
    // Note: Most Indian SIP calculators include the (1+i) for start-of-period payments
    const totalValue = p * ((Math.pow(1 + i, n) - 1) / i);
    
    const investedAmount = p * n;
    const estimatedReturns = totalValue - investedAmount;

    // 3. Formatting Logic (Consistent with Lumpsum/Retirement)
    const formatToWords = num => {
        if (num >= 10000000) { // Crore
            const value = Math.ceil((num / 10000000) * 100) / 100;
            return `₹${value.toFixed(2)} Crore`;
        } else if (num >= 100000) { // Lakh
            const value = Math.ceil((num / 100000) * 100) / 100;
            return `₹${value.toFixed(2)} Lakh`;
        } else {
            let integer = Math.ceil(num).toString();
            if (integer.length > 3) {
                let lastThree = integer.slice(-3);
                let otherNumbers = integer.slice(0, -3);
                otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
                integer = otherNumbers + "," + lastThree;
            }
            return "₹" + integer;
        }
    };

    // 4. Display Results
    document.getElementById('invested').innerText = formatToWords(investedAmount);
    document.getElementById('returns').innerText = formatToWords(estimatedReturns);
    document.getElementById('total').innerText = formatToWords(totalValue);

    document.getElementById('results').style.display = 'block';
}
