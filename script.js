const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Data blocks

const dataBlocksContainer = document.getElementById('data-blocks');
const progressFill = document.getElementById('progress-fill');
const timeTakenElement = document.getElementById('time-taken');
const logMessages = document.getElementById('log-messages');

let startTime, endTime;

// Generate data blocks dynamically
function generateBlocks() {
    dataBlocksContainer.innerHTML = ''; // Clear existing blocks
    data.forEach((item) => {
        const block = document.createElement('div');
        block.classList.add('block');
        block.textContent = `Block ${item}`;
        dataBlocksContainer.appendChild(block);
    });
}

generateBlocks(); // Initial block generation

// Helper to log messages
function logMessage(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logMessages.appendChild(logEntry);
    logMessages.scrollTop = logMessages.scrollHeight; // Auto-scroll to the latest message
}

// Sequential Access Animation
document.getElementById('sequential-btn').addEventListener('click', () => {
    logMessages.innerHTML = ''; // Clear previous logs
    let blocks = document.querySelectorAll('.block');
    let i = 0;
    let progress = 0;
    
    startTime = performance.now();
    logMessage('Sequential Access Started');
    
    const interval = setInterval(() => {
        if (i < blocks.length) {
            blocks[i].classList.add('active');
            logMessage(`Accessed Block ${i + 1}`);
            
            progress = ((i + 1) / blocks.length) * 100;
            progressFill.style.width = progress + '%'; // Update progress bar
            
            setTimeout(() => blocks[i].classList.remove('active'), 500); // Reset block
            i++;
        } else {
            clearInterval(interval); // Stop animation after the last block
            endTime = performance.now();
            const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
            timeTakenElement.textContent = `${timeTaken}s`;
            logMessage('Sequential Access Completed in ' + timeTaken + ' seconds.');
        }
    }, 700); // Interval between each block access
});

// Custom Direct Access - Access specific block based on user input
document.getElementById('custom-direct-btn').addEventListener('click', () => {
    logMessages.innerHTML = ''; // Clear previous logs
    let blocks = document.querySelectorAll('.block');
    blocks.forEach(block => block.classList.remove('active', 'direct')); // Reset all blocks

    const blockNumberInput = document.getElementById('block-number');
    const blockNumber = parseInt(blockNumberInput.value) - 1; // Adjust for zero-based index

    if (blockNumber < 0 || blockNumber >= blocks.length || isNaN(blockNumber)) {
        logMessage("Invalid block number! Please enter a number between 1 and 10.");
        return;
    }

    startTime = performance.now();
    logMessage(`Direct Access Started for Block ${blockNumber + 1}`);
    
    blocks[blockNumber].classList.add('direct'); // Highlight the specified block
    
    let progress = ((blockNumber + 1) / blocks.length) * 100;
    progressFill.style.width = progress + '%'; // Update progress bar
    
    logMessage(`Accessed Block ${blockNumber + 1} via Direct Access`);
    
    setTimeout(() => {
        blocks[blockNumber].classList.remove('direct');
        endTime = performance.now();
        const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
        timeTakenElement.textContent = `${timeTaken}s`;
        logMessage('Direct Access Completed in ' + timeTaken + ' seconds.');
    }, 700); // Timeout for direct block
});
