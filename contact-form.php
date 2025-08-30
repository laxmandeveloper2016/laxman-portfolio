<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];

    // Sanitize inputs
    $name    = trim($_POST["name"] ?? "");
    $phone   = trim($_POST["phone"] ?? "");
    $email   = trim($_POST["email"] ?? "");
    $subject   = trim($_POST["subject"] ?? "");
    $message = trim($_POST["message"] ?? "");

    // Validate Name
    if (empty($name)) {
        $errors[] = "Name is required.";
    } elseif (strlen($name) < 2) {
        $errors[] = "Name must be at least 2 characters long.";
    } elseif (!preg_match("/^[a-zA-Z\s]+$/", $name)) {
        $errors[] = "Name can only contain letters and spaces.";
    }

    // Validate Phone
    if (empty($phone)) {
        $errors[] = "Phone number is required.";
    } elseif (!preg_match("/^[0-9]{10,15}$/", $phone)) {
        $errors[] = "Phone number must be 10–15 digits.";
    }

    // Validate Email
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Validate Subject
    if (empty($subject)) {
        $errors[] = "Name is required.";
    } elseif (strlen($subject) < 150) {
        $errors[] = "Your Subject related to requirement.";
    } elseif (!preg_match("/^[a-zA-Z\s]+$/", $subject)) {
        $errors[] = "Which position your looking.";
    }

    

    // Validate Message
    if (empty($message)) {
        $errors[] = "Message is required.";
    }

    // Final check
    if (empty($errors)) {
        // ✅ Send Email
        $to      = "laxman.developer2016@gmail.com"; 
        $subject = "New Contact Form Submission from Employer";
        $body    = "You received a new message from Portfolio:\n\n" .
                   "Name: $name\n" .
                   "Phone: $phone\n" .
                   "Email: $email\n" .
                   "Subject: $subject\n" .                   
                   "Message:\n$message\n";
        $headers = "From: $email\r\n" .
                   "Reply-To: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo "<p style='color:green;'>Thank you! Your message has been sent.</p>";
        } else {
            echo "<p style='color:red;'>Oops! Something went wrong while sending the email.</p>";
        }
    } else {
        // ❌ Show error messages
        foreach ($errors as $error) {
            echo "<p style='color:red;'>$error</p>";
        }
    }
}
?>
