// Function to add commas as the user types
function formatInput(input) {
    // Remove all existing commas and non-numeric chars
    let value = input.value.replace(/,/g, '');
    
    if (value !== "") {
        // Convert to number and format back to Indian style
        let num = parseFloat(value);
        if (!isNaN(num)) {
            input.value = num.toLocaleString('en-IN');
        }
    }
}

function calculateSIP() {
    // 1. Get Values (Removing commas before parsing)
    const rawAmount = document.getElementById('monthlyAmount').value.replace(/,/g, '');
    const p = parseFloat(rawAmount);
    const annualRate = parseFloat(document.getElementById('rate').value);
    const years = parseFloat(document.getElementById('years').value);

    // 2. Validate Input
    if (isNaN(p) || isNaN(annualRate) || isNaN(years)) {
        alert("Please enter valid numbers");
        return;
    }

    // 3. Math Variables
    const i = (annualRate / 100) / 12; // Monthly rate
    const n = years * 12;              // Total months

    // 4. Ordinary Annuity Formula: FV = P × [((1 + i)^n - 1) / i]
    const totalValue = p * ((Math.pow(1 + i, n) - 1) / i);
    
    const investedAmount = p * n;
    const estimatedReturns = totalValue - investedAmount;

    // 5. Update UI
    document.getElementById('invested').innerText = formatCurrency(investedAmount);
    document.getElementById('returns').innerText = formatCurrency(estimatedReturns);
    document.getElementById('total').innerText = formatCurrency(totalValue);

    // Show results section
    document.getElementById('results').style.display = 'block';
}

// Helper to format results with commas
function formatCurrency(num) {
    return "₹" + Math.round(num).toLocaleString('en-IN');
}