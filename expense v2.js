const typedAmount = document.getElementById('amount');
const typedName = document.getElementById('expense-name');
const button = document.getElementById('sub-button');

// Initialize values
let totalIncomeSum = 0;
let totalExpenseSum = 0;

// Input validation
function validateNumber(input) {
    // Remove non-numeric characters except decimal point
    input.value = input.value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    input.value = input.value.replace(/(\..*)\./g, '$1');
    
    // Remove leading zeros
    if (input.value.startsWith('0') && input.value.length > 1 && !input.value.startsWith('0.')) {
        input.value = input.value.substring(1);
    }
    
    // Limit to 10 characters total
    if (input.value.length > 9) {
        input.value = input.value.substring(0, 9);
    }
    
    // Handle decimal places
     if (input.value.includes('.')) {
        const parts = input.value.split('.');
        if (parts[1].length > 2) {
            input.value = parts[0] + '.' + parts[1].substring(0, 2);
        }
    }
}

// Name length limiter
typedName.addEventListener('input', () => {
    if (typedName.value.length > 23) {
        typedName.value = typedName.value.substring(0, 23);
    }
});

// Form submission
function submitForm() {
    const transaction = document.querySelector('input[name="transaction-type"]:checked');
if (!typedAmount.value || !typedName.value.trim() || !transaction) {
  if (!typedAmount.value) {
    window.alert('Please enter amount');
   
  } else if (!typedName.value.trim()) {
    window.alert('Please enter a valid Name');
  } else if (!transaction) {
    window.alert('Please select type of your input');
  }
  return; 
  }
    else if (typedName.value.trim() && transaction && typedAmount.value) {
        const tbody = document.querySelector("#expense-table tbody");
        const amount = parseFloat(typedAmount.value) || 0;
        
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${typedName.value.trim()}</td>
            <td>${amount.toFixed(2)}</td>
            <td>${transaction.value}</td>
            <td><button class="delete-btn" title="Delete entry">❌</button></td>
        `;
        
        tbody.appendChild(newRow);
        
        // Add delete functionality
        newRow.querySelector('.delete-btn').addEventListener('click', () => {
            const rowAmount = parseFloat(newRow.querySelector('td:nth-child(2)').textContent);
            const rowType = newRow.querySelector('td:nth-child(3)').textContent;
            
            if (rowType === 'income') {
                totalIncomeSum -= rowAmount;
            } else {
                totalExpenseSum -= rowAmount;
            }
            
            updateSummaryDisplay();
            newRow.remove();
            

        });
        
        // Update totals
        if (transaction.value === 'income') {
            totalIncomeSum += amount;
        } else {
            totalExpenseSum += amount;

        }
        
        updateSummaryDisplay();
        
        // Reset form
        typedAmount.value= '';
        typedName.value = '';
        document.querySelectorAll('input[name="transaction-type"]').forEach(radio => {
            radio.checked = false;
        });
    }

}

// Update summary display
function updateSummaryDisplay() {
    let sum = document.getElementById("total-sum");
    document.getElementById("total-income").textContent = totalIncomeSum.toFixed(2);
    document.getElementById("total-expenses").textContent = totalExpenseSum.toFixed(2);
    sum.textContent = (totalIncomeSum - totalExpenseSum).toFixed(2);
    sum.style.fontWeight = 650;

}

// Initialize summary display
updateSummaryDisplay();

// Prevent form submission
button.addEventListener('click', (e) => {
    e.preventDefault();
    submitForm();
});