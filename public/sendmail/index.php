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
        $mailnotifyme = new PHPMailer(true);

        try {
            //Server settings
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'mail.builtforgood.co.uk';              //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'noreply@builtforgood.co.uk';           //SMTP username
            $mail->Password   = 'quzcik-wundu4-jopkeF';                 //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('noreply@builtforgood.co.uk', 'SCG Glasses Report');
            $mail->addAddress($email);               //Name is optional

            //Attachments
            $mail->addStringAttachment(base64_decode($report), $showdatetime . ' ' . $showname . '.xlsx');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Smart Glasses Report - ' . $showname . ' ' . $showdatetime;
            $mail->Body    = '<b>Please find your report attached.</b><br /><br />Please don\'t reply to this email. It has been sent from an email address that doesn\'t accept incoming emails.<br /><br />Please contact us through our website www.builtforgood.co.uk<br /><br />';
            $mail->send();

            //NotifyMe Server settings
            $mailnotifyme->isSMTP();                                            //Send using SMTP
            $mailnotifyme->Host       = 'mail.builtforgood.co.uk';              //Set the SMTP server to send through
            $mailnotifyme->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mailnotifyme->Username   = 'noreply@builtforgood.co.uk';           //SMTP username
            $mailnotifyme->Password   = 'quzcik-wundu4-jopkeF';                 //SMTP password
            $mailnotifyme->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mailnotifyme->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //NotifyMe Recipients
            $mailnotifyme->setFrom('noreply@builtforgood.co.uk', 'SCG Glasses Report');
            $mailnotifyme->addAddress('tim@builtforgood.co.uk');               //Name is optional

            //NotifyMe Attachments
            //none

            //NotifyMe Content
            $mailnotifyme->isHTML(true);                                  //Set email format to HTML
            $mailnotifyme->Subject = 'Smart Glasses Report - ' . $showname . ' ' . $showdatetime;
            $mailnotifyme->Body    = 'A report was sent to ' . $email;
            $mailnotifyme->send();

            echo 'Report has been sent';
            } catch (Exception $e) {
                echo "Report could not be sent. PHP Main Error: {$mail->ErrorInfo}";
                echo "Report could not be sent. PHP NotifyMe Error: {$mailnotifyme->ErrorInfo}";
            }
            
    } else {
        echo("You can't use this server... please provide all variables!");
    }
} else {
echo("You can't use this server...");
}
?>