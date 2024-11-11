<?php
session_start();

$servername = "localhost";
$username = "root";  
$password = "";      
$dbname = "web_tech_project";  


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$inputUsername = trim($_POST['username']);
$inputPassword = trim($_POST['password']);


$sql = "SELECT * FROM Users WHERE Username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $inputUsername);
$stmt->execute();
$result = $stmt->get_result();


if ($result->num_rows > 0) {

    $row = $result->fetch_assoc();
    

    echo "Input Password: " . $inputPassword . "<br>";
    echo "Stored Password: " . $row['Password'] . "<br>";


    if ($inputPassword === $row['Password']) {
        $_SESSION['username'] = $inputUsername;
        header("Location: ../../index.html"); 
    } else {
        echo "<script>alert('Incorrect password!'); window.location.href='login.html';</script>";
    }
} else {
    echo "<script>alert('No such user found.'); window.location.href='login.html';</script>";
}

$stmt->close();
$conn->close();
?>
