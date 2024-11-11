<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();


$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "web_tech_project"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";


$inputUsername = trim($_POST['username']);
$inputPassword = trim($_POST['password']);
$confirmPassword = trim($_POST['confirm_password']);


if ($inputPassword !== $confirmPassword) {
    echo "<script>alert('Passwords do not match. Please try again.'); window.location.href='signup.html';</script>";
    exit();
}


$sql = "SELECT * FROM Users WHERE Username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $inputUsername);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<script>alert('Username already taken. Please choose another.'); window.location.href='signup.html';</script>";
    exit();
}


$sql = "INSERT INTO Users (Username, Password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $inputUsername, $inputPassword);

if ($stmt->execute()) {
    echo "<script>alert('Registration successful! You can now log in.'); ";
    header("Location: ../login/login.html"); 
} else {
    echo "<script>alert('Error: Unable to register. Please try again.'); window.location.href='signup.html';</script>";
}


$stmt->close();
$conn->close();
?>
