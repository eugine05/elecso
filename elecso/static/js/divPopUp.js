/* весь функционал скрипта имеет смысл только когда загружена страница, по-этому мы используем стандартную для jQuery конструкцию $(document).ready */
$(document).ready(function($) {
var on = 0; /* служебная переменная следящая за состоянием окна: 0 - значит окно закрыто ; 1 - открыто */
var on_mas = 0;
/* ниже описана функция которая собственно позволяет окну появится из небытия */
function loadPopup() {
	$('.messages1').html(''); 
	$('.messages2').html(''); 
	$('.messages3').html(''); 
	$('.messages4').html(''); 
	$('.messages5').html(''); 
	
if(on == 0 && on_mas == 0) {
/* если переменная состояния окна равняется нулю, изменяем свойства DIV фона с именем back, а именно: задаем прозрачность opacity индексом 0.6 - данный индекс может принимать значения от 0.1 до 1 - чем больше цифра, тем меньше прозрачность, следовательно - темнее фон back */
$("#back").css("opacity", "0.8");
/* fadeIn - один стандартных визуальных эффектов, переводится как Из затемнения, блок popup появляется быстрее, активация темного фона back происходит медленнее   */
$("#popup").fadeIn(300);

$("#back").fadeIn(800);
/* служебная переменная переходит в состояние 1 - окно открыто */
on = 1;
}
/* функция открытия окна завершена */
}
/* функция закрытия окна и возвращения нормального цвета фона */
function off() {
if(on == 1 || on_mas == 1) {
/* убираем окно-блок DIV с именем класса css "popup" с помощью эффекта Затемнение fadeOut */
$("#popup").fadeOut("normal");
$("#popup_massage").fadeOut("normal");
/* возвращаем фону исходное состояние, дезактивируем затемненный фон back */
$("#back").fadeOut("normal");
/* не забываем про служебную переменную , возвращаем ей значение ноль */
on = 0;
on_mas = 0;
}
/* функция закрытия окна завершена */
}
/* при нажатие на ссылку с класс css "showpopup" будет запущена функция открытия окна */
$("a.showpopup").click(function() {
loadPopup();
var heg = $(document).height() + "px";
$("#back").css({'height': heg});
});
/* при клике на фоне HTML страницы, вне самого окна, окно закрывается */
$("div#back").click(function() {
off();
});
/* закрыть окно при клике на блоке с классом "close", здесь у нас будет расположен крестик */
$("div.close").click(function() {
off();
});
/* при нажатие на ссылку с div "#popup_massage", окно закрывается */
$("div#popup_massage").click(function() {
off();
});
$(".layerclose212").click(function() {
off();
});

/* ajax запрос */
	$("input#set_mode").click(function()
			{
				// собираем данные с формы
				var user_name 	 = $('#user_name').val();
				var user_email 	 = $('#user_email').val();
				var user_telefon = $('#user_telefon').val();
				var text_comment = $('#text_comment').val();
				// отправляем данные
				
				$.ajax({
					url: "http://elecso.ru/ajax/", // куда отправляем
					type: "post", // метод передачи
	//				dataType: "json", // тип передачи данных
					data: { // что отправляем
						"user_name": 	user_name,
						"user_email": 	user_email,
						"user_telefon": user_telefon,
						"text_comment": text_comment
					},
					// после получения ответа сервера
					success: function(data){
						$('.messages1').css("display","block");
						if(data.err1 != '' || data.err2 != '') {$('.messages1').html(data.err1);$('.messages2').html(data.err2); $('#user_name').addClass('error');} else {$('.messages1').html(data.err1);$('.messages2').html(data.err2); $('#user_name').removeClass('error'); }
						
						
						if(data.err4 != '') {$('.messages4').html(data.err4);$('.messages3').html('');$('.messages5').html(''); $('#user_email').addClass('error');$('#user_telefon').addClass('error');} else {$('.messages4').html(data.err4);$('.messages3').html('');$('.messages5').html(''); $('#user_email').removeClass('error');$('#user_telefon').removeClass('error');}
						if(data.err4 == '') {
						if(data.err3 != "&nbsp") {$('.messages3').html(data.err3);$('.messages5').html(data.err5); $('#user_telefon').addClass('error');} else {$('.messages3').html(data.err3); $('#user_telefon').removeClass('error');}
						if(data.err5 != "&nbsp") {$('.messages5').html(data.err5);$('.messages3').html(data.err3); $('#user_email').addClass('error');} else {$('.messages5').html(data.err5); $('#user_email').removeClass('error');}
						}

						/*
						$('.messages2').html(data.err2);
						$('.messages3').html(data.err3);
						$('.messages4').html(data.err4);
						$('.messages5').html(data.err5);*/
						$('.messages6').html(data.res);
					
						var user_ema = data.rest;
						if(user_ema == 1) {
				/* убираем окно-блок DIV с именем класса css "popup" с помощью эффекта Затемнение fadeOut */
						$("#popup").fadeOut("normal");
					on = 0;
						$("#popup_massage").fadeIn(500);
					on_mas = 1;	
						$('#user_name').val('');
						$('#user_email').val('');
						$('#user_telefon').val('');
						$('#text_comment').val('');
						
						setTimeout(function() { 
							$("#popup_massage").fadeOut("normal");
							$("#back").fadeOut("normal");
							/* не забываем про служебную переменную , возвращаем ей значение ноль */
							on = 0;
							on_mas = 0;
							}, 5000);
											}
					}
				});
			});
// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
/* конец всей jQuery части */
});