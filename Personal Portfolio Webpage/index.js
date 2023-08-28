
const downloadLink = document.querySelector('.downloadLink');

        downloadLink.addEventListener('click', () => {
            if (confirm('Do you want to download the resume?')) {
                // You can track download events here (e.g., using analytics)
            } else {
                event.preventDefault(); // Prevent default download behavior
            } 
        });