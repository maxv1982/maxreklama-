<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$text = $_POST['user_text'];
$spam = $_POST['spam'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'maks_voronov_1982@list.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'myNg8DZbuBruWfQGfStV'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('maks_voronov_1982@list.ru'); // от кого будет уходить письмо?
$mail->addAddress('maxreklama82@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

if (isset($_POST['spam'])) {
    $spam = $_POST['spam'];
}
if (empty($spam)) /* Проверка скрытого поля */
{
$mail->Subject = 'Заявка с сайта Maxreklama21';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br> Почта этого пользователя: ' .$email. '<br> Текст сообщения: ' .$text;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
}
else {
        header('location: thank-you.html');       
}
}
exit; /* Выход без отправки письма, если поле spam не пустое */

?>
