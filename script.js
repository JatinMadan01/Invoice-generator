document.addEventListener('DOMContentLoaded', function() {
    const addItemBtn = document.getElementById('addItemBtn');
    const calculateTotalBtn = document.getElementById('calculateTotalBtn');
    const itemsContainer = document.getElementById('itemsContainer');
    const subtotalAmount = document.getElementById('subtotalAmount');
    const taxAmount = document.getElementById('taxAmount');
    const totalAmount = document.getElementById('totalAmount');
    const discountInput = document.getElementById('discountInput');

    let invoiceItems = [];

    addItemBtn.addEventListener('click', function() {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-row');
        itemDiv.innerHTML = `
            <input type="text" class="description" placeholder="Description">
            <input type="number" class="quantity" placeholder="Quantity">
            <input type="number" class="price" placeholder="Price/Rate">
            <button class="removeItemBtn">Remove</button>
            <div class="subtotal">$0.00</div>
        `;
        itemsContainer.appendChild(itemDiv);
    });

    itemsContainer.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity') || e.target.classList.contains('price')) {
            updateSubtotals();
        }
    });

    itemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('removeItemBtn')) {
            e.target.closest('.item-row').remove();
            updateSubtotals();
        }
    });

    function updateSubtotals() {
        const itemRows = document.querySelectorAll('.item-row:not(.header)');
        let subtotal = 0;
        itemRows.forEach(row => {
            const quantity = parseFloat(row.querySelector('.quantity').value);
            const price = parseFloat(row.querySelector('.price').value);
            const rowSubtotal = quantity * price;
            row.querySelector('.subtotal').textContent = `$${rowSubtotal.toFixed(2)}`;
            subtotal += rowSubtotal;
        });
        subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
        calculateTotal();
    }

    function calculateTotal() {
        let subtotal = parseFloat(subtotalAmount.textContent.substring(1));
        let discount = parseFloat(discountInput.value) || 0;
        let tax = subtotal * 0.1; // Assuming 10% tax for example
        let total = subtotal - (subtotal * (discount / 100)) + tax;
        taxAmount.textContent = `$${tax.toFixed(2)}`;
        totalAmount.textContent = `Total: $${total.toFixed(2)}`;
    }
    calculateTotalBtn.addEventListener('click', function() {
        calculateTotal();
    });

    // Function to review the invoice
    function reviewInvoice() {
        alert("Invoice Reviewed!");
        // document.getElementById("reviewInvoiceSection").style.display = "block";
        if(document.getElementById("reviewInvoiceSection").style.display === "block"){
            document.getElementById("reviewInvoiceSection").style.display = "none";
        }else{
            document.getElementById("reviewInvoiceSection").style.display = "block";
        }
    }
    // Function to send the invoice
    function sendInvoice() {
        alert("Invoice Sent!");
    }
    // Function to download a copy of the invoice
    function downloadCopy() {
        alert("Invoice Downloaded!");
    }
    // Add event listener for the "Review Invoice" button
    document.getElementById("reviewInvoiceBtn").addEventListener("click", reviewInvoice);
    // Add event listener for the "Send Invoice" button
    document.getElementById("sendInvoiceBtn").addEventListener("click", sendInvoice);
    // Add event listener for the "Download Copy" button
    document.getElementById("downloadCopyBtn").addEventListener("click", downloadCopy);
});
