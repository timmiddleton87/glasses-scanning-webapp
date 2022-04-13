<?php

header("Access-Control-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


// get referer server
if($_SERVER['HTTP_REFERER'] === 'http://localhost:3000/' || 'https://builtforgood.co.uk/' || 'https://www.builtforgood.co.uk/') {
    
    // get data from Post method
    $email = isset($_POST['sendto']) ? $_POST['sendto'] : null;
    $showname = isset($_POST['showname']) ? $_POST['showname'] : null;
    $showdatetime = isset($_POST['showdatetime']) ? $_POST['showdatetime'] : null;
    $report = isset($_POST['report']) ? $_POST['report'] : null;

    if($showname && $email && $report && $showdatetime) {
        require 'vendor/autoload.php';

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'mail.builtforgood.co.uk';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'noreply@builtforgood.co.uk';                     //SMTP username
            $mail->Password   = 'quzcik-wundu4-jopkeF';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('noreply@builtforgood.co.uk', 'SCG Glasses Report');
            $mail->addAddress($email);               //Name is optional

            //Attachments
            $mail->addStringAttachment(base64_decode($report), $showname . ' ' . $showdatetime . '.xlsx');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Smart Glasses Report - ' . $showname . ' ' . $showdatetime;
            $mail->Body    = '<b>Please find your report attached.</b><br /><br /><br />';
            $mail->send();
            echo 'Report has been sent';
            } catch (Exception $e) {
                echo "Report could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
    } else {
        echo("You can't use this server... please provide all variables!");
    }
} else {
echo("You can't use this server...");
}
?>