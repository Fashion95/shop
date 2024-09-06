document.addEventListener('DOMContentLoaded', () => {
    // Handle form submission
    document.querySelector('form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const formData = new FormData(event.target);
        
        try {
            // Send form data to the server
            const response = await fetch('/send-message', {
                method: 'POST',
                body: formData
            });

            // Check if the response is successful
            if (response.ok) {
                // Display a success message
                alert('Your message has been sent successfully!');
                // Optionally, reset the form
                event.target.reset();
            } else {
                // Display an error message
                alert('There was a problem sending your message. Please try again.');
            }
        } catch (error) {
            // Handle any errors
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again.');
        }
    });
});
