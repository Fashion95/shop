<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);
    $item = htmlspecialchars($_POST['item']);

    // Set email parameters
    $to = 'fashionablelyf@gmail.com'; // Replace with your email address
    $subject = 'New Checkout Form Submission';
    $message = "Name: $name\nEmail: $email\nAddress: $address\nItem Purchased: $item";
    $headers = "From: $email\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "Failed to send email.";
    }
} else {
    echo "Invalid request.";
}
?>
