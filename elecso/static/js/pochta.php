<?php
	$msg_box = ""; // в этой переменной будем хранить сообщения формы

	$name = trim($_POST['user_name']);
	$email = trim($_POST['user_email']);
	$tel = trim($_POST['user_telefon']);
	$text = trim($_POST['text_comment']);
	
	$tel_id = 0;
	$name_id = 0;
	$tel_fon_id = 0;
	$mail_id = 0;	

if (empty($name))
{
$name_id = 1;
} else {
if (!preg_match("/^[a-z а-яё]{2,30}$/iu",$name))
{
$name_id = 2;
}
}
$telefon = preg_replace('/\s|\-|\(|\)/','', $tel);
if (empty($email) and empty($telefon))
{
$tel_fon_id = 1;
}
if (empty($email))
{
if (!preg_match("/^\d[\d\(\)\ -]{4,15}\d$/",$tel))
{
$tel_id = 1;
}
} else {
if (!preg_match("/^[-0-9a-z_\.]+@[-0-9a-z^\.]+\.[a-z]{2,4}$/i",$email))
{
$mail_id = 1;
}
}
if (empty($email) or empty($telefon))
{} else {
	if (!preg_match("/^[-0-9a-z_\.]+@[-0-9a-z^\.]+\.[a-z]{2,4}$/i",$email))
{
$mail_id = 1;
}
if (!preg_match("/^\d[\d\(\)\ -]{4,14}\d$/",$tel))
{

$tel_id = 1;
}
}	
if ($tel_fon_id == 1){$mail_id = 0; $tel_id = 0;}

	$errors = array(); // контейнер для ошибок
	// проверяем корректность полей

		if ($name_id == 1)		$errors[1] = $err1 = "Вы не заполнели поле Ваше имя!";
		if ($name_id == 2)		$errors[2] = $err2 = "Имя должно быть от 4 до 15 символов и без цифр!";
		if ($tel_id == 1)		$errors[3] = $err3 = "Телефон должен быть от 4 до 15 символов и без букв!";
		if ($tel_fon_id == 1)	$errors[4] = $err4 = "Заполните поле E-mail или Телефон!";
		if ($mail_id == 1)		$errors[5] = $err5 = "E-mail должен иметь вид user@somehost.com!";
													  
		
		if($mail_id == 0) 		$errors[5] = $err5 = "&nbsp";
		if($tel_id == 0) 		$errors[3] = $err3 = "&nbsp";



	// если форма без ошибок
	if($name_id != 1 && $name_id != 2 && $tel_id != 1 && $tel_fon_id != 1 && $mail_id != 1){		
		// собираем данные из формы
		$message  = "Имя пользователя: " . $_POST['user_name'] . "<br/>";
		$message .= "E-mail пользователя: " . $_POST['user_email'] . "<br/>";
		$message .= "Телефон: " . $_POST['user_telefon'] . "<br/>";
		$message .= "<hr>";
		$message .= "Текст письма: " . $_POST['text_comment'];		
		send_mail($message); // отправим письмо
		// выведем сообщение об успехе
		$noerr = "Сообщение успешно отправлено!";
		$ernoer = 1;
	}else{
		// если были ошибки, то выводим их $key => $one_error
		$msg_box = "";
	/*	foreach($errors as $key => $one_error){
			$msg_box .= "<span style='color: red;'>$key $one_error</span><br/>";
			if ()
		}*/
		$ernoer = 0;
	}

	// делаем ответ на клиентскую часть в формате JSON  
/*	echo json_encode(array(
		'result' => $msg_box
	));*/
		echo json_encode(array(
		'err1' => $err1,
		'err2' => $err2,
		'err3' => $err3,
		'err4' => $err4,
		'err5' => $err5,
		'res' => $noerr,
		'rest' => $ernoer,
	));
	
	
	// функция отправки письма
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "info@elecso.ru"; 
		// тема письма
		$subject = "Письмо с обратной связи";
		
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Письмо с обратной связи Элексо <info@elecso.ru>\r\n"; // от кого письмо
		
		// отправляем письмо 
		mail($mail_to, $subject, $message, $headers);
	}
?>
