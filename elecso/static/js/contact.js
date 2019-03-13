// Как только страничка загрузилась 
	window.onload = function () { 
		// проверяем поддерживает ли браузер FormData 
			if(!window.FormData) {
				/* * если не поддерживает, то выводим 
				* то выводим предупреждение вместо формы */
				var div = ge('content');
				div.innerHTML = "Ваш браузер не поддерживает объект FormData";
				div.className = 'notSupport'; 
			}
	}

/* весь функционал скрипта имеет смысл только когда загружена страница, по-этому мы используем стандартную для jQuery конструкцию $(document).ready */
$(document).ready(function($) {

	$('.messages1_cont').html(''); 
	$('.messages2_cont').html(''); 
	$('.messages3_cont').html(''); 
	$('.messages4_cont').html(''); 
	$('.messages5_cont').html(''); 
	

			var con_size = 0;
			var filesize = 0;
				$('input[type=file]').change(function(){
					filesize = 0;					
					for(var i=0; i<this.files.length;i++) {
						filesize = filesize + this.files[i].size;
					}
				/*	console.log(this.files);*/
				});
			
				
/* ajax запрос */
	$("input#set_mode_cont").click(function()
			{
					$('.messages1_cont').html(''); 
					$('.messages2_cont').html(''); 
					$('.messages3_cont').html(''); 
					$('.messages4_cont').html(''); 
					$('.messages5_cont').html(''); 
					$('#user_name_cont').removeClass('error');
					$('#user_email_cont').removeClass('error');
					$('#user_telefon_cont').removeClass('error');
					$('#text_comment_cont').removeClass('error');
				// собираем данные с формы
				var user_name 	 = $('#user_name_cont').val();
				var user_email 	 = $('#user_email_cont').val();
				var user_telefon = $('#user_telefon_cont').val();
				var text_comment = $('#text_comment_cont').val();
            
			
			var tel_id = 0;
			var name_id = 0;
			var tel_fon_id = 0;
			var mail_id = 0;	
			
			if (!user_name) {name_id = 1;}					
			var par_pattern = /^[A-Za-z А-ЯЁа-яё]{2,15}$/i;
			var provlabmar = par_pattern.test(user_name);
			if ( provlabmar==false) { name_id = 2;};
			
			var new_tel = user_telefon.replace(/\s|\-|\(|\)/g, '');

			if (!new_tel && !user_email) {tel_fon_id = 1;}	


			if (user_email) {
				var par_pattern = /^[-0-9a-z_\.]+@[-0-9a-z^\.]+\.[a-z]{2,4}$/i;
				var provlabmar = par_pattern.test(user_email);
				if ( provlabmar==false) { mail_id = 1;};
			}
			
			if (new_tel) {
				var par_pattern = /^\d[\d\(\)\ -]{4,15}\d$/;
				var provlabmar = par_pattern.test(new_tel);
				if ( provlabmar==false) { tel_id = 1;};
			}
			
			var data = new Array();
			
			if (name_id == 1)		 data.err1 = "Вы не заполнели поле Ваше имя!";
			if (name_id == 2)		 data.err2 = "Имя должно быть от 4 до 15 символов и без цифр!";
			if (tel_id == 1)		 data.err3 = "Телефон должен быть от 4 до 15 символов и без букв!";
			if (tel_fon_id == 1)	 data.err4 = "Заполните поле E-mail или Телефон!";
			if (mail_id == 1)		 data.err5 = "E-mail должен иметь вид user@somehost.com!";
			
			if(mail_id == 0) 		data.err5 = "&nbsp";
			if(tel_id == 0) 		data.err3 = "&nbsp";
			/*
			if(name_id == 1) {kom1.push('Вы не заполнели поле Ваше имя!');}
			if(name_id == 2) {kom1.push('Имя должно быть от 4 до 15 символов и без цифр!');}
			if(tel_id == 1) {kom1.push('Телефон должен быть от 4 до 15 символов и без букв!');}
			if(tel_fon_id == 1) {kom1.push('Заполните поле E-mail или Телефон!');}
			if(mail_id == 1) {kom1.push('E-mail должен иметь вид user@somehost.com!');}
			
			$('.messages4_cont').html(data.err4);*/
			/*
			if(mail_id == 0) 		var err5 = "&nbsp";
			if(tel_id == 0) 		var err3 = "&nbsp";
			*/
			
			
			/*
			var new_tel = user_name.replace(/\s|\-|\(|\)/g, '');
			var par_pattern = /^\d[\d\(\)\ -]{4,15}\d$/;  // /[^a-zA-Zа-яА-Я0-9_-]/    name /^[a-z а-яё]/;
			
			var par_pattern = /^[-0-9a-z_\.]+@[-0-9a-z^\.]+\.[a-z]{2,4}$/i;
			var provlabmar = par_pattern.test(user_name);
			if ( provlabmar==true) { var label_fail = true};
			*/
	
			
			
			/*
			var elem = form.elements.name;
			alert(elem.value);
			*/
			var file  = 0;
			if (filesize > 10000000) {alert("Размер файлов превышает 10Мб."); file  = 1;}

			if(name_id != 1 && name_id != 2 && tel_id != 1 && tel_fon_id != 1 && mail_id != 1 && file != 1){
				
				
				var form = document.forms.sendform;
				var	formData = new FormData(form);
				formData.append('sendMail', 'johndoe');
				
				data.res = "Сообщение отправляется. Пожалуйста подождите.";
				data.rest = 1;
			
				var	xhr = new XMLHttpRequest();
				xhr.open("POST", "http://elecso.ru/multisend/");
				
				$('#popup_massage').html(data.res);
				$("#popup").fadeOut("normal");
				
				$("#popup_massage").fadeIn(500);
						var heg = $(document).height() + "px";
						$("#back").css({'height': heg});
						$("#back").css("opacity", "0.8");
						$("#back").fadeIn(800);
						
							$('#user_name_cont').val('');
						$('#user_email_cont').val('');
						$('#user_telefon_cont').val('');
						$('#text_comment_cont').val('');
				
						
				/*		
				xhr.onreadystatechange = function() {
				    
					if (xhr.readyState == 4) {
						if(xhr.status == 200) {
                        
				*/		
						
						$('#file').val('');
						$('.span_cont_file').html('');
						// убираем окно-блок DIV с именем класса css "popup" с помощью эффекта Затемнение fadeOut 

						setTimeout(function() { 
							$("#popup_massage").fadeOut("normal");
							$("#back").fadeOut("normal");
								$('.messages1_cont').html(''); 
								$('.messages2_cont').html(''); 
								$('.messages3_cont').html(''); 
								$('.messages4_cont').html(''); 
								$('.messages5_cont').html(''); 
							// не забываем про служебную переменную , возвращаем ей значение ноль 
							}, 2000);
			/*			}
					}
				};*/
				xhr.send(formData);
				
			} else {
					$('.messages1_cont').css("display","block");
					if(data.err1 != null || data.err2 != null) {$('.messages1_cont').html(data.err1);$('.messages2_cont').html(data.err2); $('#user_name_cont').addClass('error');} else {$('.messages1_cont').html(data.err1);$('.messages2_cont').html(data.err2); $('#user_name_cont').removeClass('error'); }
					if(data.err4 != null) {$('.messages4_cont').html(data.err4);$('.messages3_cont').html('');$('.messages5_cont').html(''); $('#user_email_cont').addClass('error');$('#user_telefon_cont').addClass('error');} else {$('.messages4_cont').html(data.err4);$('.messages3_cont').html('');$('.messages5_cont').html(''); $('#user_email_cont').removeClass('error');$('#user_telefon_cont').removeClass('error');}
					if(data.err4 == null) {
					if(data.err3 != "&nbsp") {$('.messages3_cont').html(data.err3);$('.messages5_cont').html(data.err5); $('#user_telefon_cont').addClass('error');} else {$('.messages3_cont').html(data.err3); $('#user_telefon_cont').removeClass('error');}
					if(data.err5 != "&nbsp") {$('.messages5_cont').html(data.err5);$('.messages3_cont').html(data.err3); $('#user_email_cont').addClass('error');} else {$('.messages5_cont').html(data.err5); $('#user_email_cont').removeClass('error');}
					}

						$('.messages6_cont').html(data.res);
			}
			});
/* конец всей jQuery части */

});