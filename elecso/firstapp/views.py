from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound
from .models import Post
import json
from django.http import JsonResponse
from django.http import HttpResponse
import re
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.urls import path
from django.db.models import Q
# from django.conf.urls import url
from django.http.response import Http404

from django.core.mail import send_mail
from django.conf import settings

from django.core.mail import EmailMessage

from django.middleware.csrf import get_token


# Главная сраница
def index(request):
    static = {"n" : 1}
    query_string = request.path_info
    footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
    post = Post.objects.filter(post_status='post').order_by('-id')[:3]
    data = {"static": static,"post": post, "footer": footer}
    return render(request, "index.html", context=data)
# Страница конакты
def kontakty(request):
    footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
    return render(request, "kontakty.html", {"footer":footer})
# Шаблон страницы первый уровень
def page1(request, id):
  #  if id == 'uslugi' or id=='zakaz-i-dostavka' or id=='kontakty':
        try:
             query_string = request.path_info
             query= query_string.replace("/", "")
             post = Post.objects.get(post_url=query)
             log = breadcrumb(query_string)
             footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
             return render(request, "page.html", {"post": post, 'query_string': query, "breadcrumb": log, "footer":footer})
        except Post.DoesNotExist:
             raise Http404
        
# Шаблон страницы второй уровень услуги и заказ
def page2(request, id):
 #   if id == 'prodazha-elektrooborudovaniya' or id=='raspredelitelnyj-shhit' or id=='shkaf-upravleniya-nasosami':
        try:
             query_string = request.path_info
             log = breadcrumb(query_string)
             post = Post.objects.get(post_url=query_string)
             footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
             return render(request, "page.html", {"post": post, 'query_string': query_string, "breadcrumb": log, "footer":footer})
        except Post.DoesNotExist:
             raise Http404
# Шаблон страницы третий уровень
def page3(request, id):
        try:
             query_string = request.path_info
             log = breadcrumb(query_string)
             post = Post.objects.get(post_url=query_string)
             footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
             return render(request, "page.html", {"post": post, 'query_string': query_string, "breadcrumb": log, "footer": footer})
        except Post.DoesNotExist:
             raise Http404
# Шаблон страницы постов
def post(request, id):
        try:
             query_string = request.path_info
             log = breadcrumb(query_string)
             post = Post.objects.get(post_url=query_string)
             footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
             post1=Post.objects.filter(post_status='post').order_by('-id')
             return render(request, "single.html", {"post": post, 'query_string': query_string, "breadcrumb": log, "footer": footer, "post1":post1})
        except Post.DoesNotExist:
             raise Http404
# Категория полезная информация
def poleznaya(request):
    static = {"n" : 2}
    post = Post.objects.filter(post_status='post').order_by('-id')
    footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
    query_string = request.path_info
    log = breadcrumb(query_string)
    blog_list = Post.objects.filter(post_status='post').order_by('-id')
    page = request.GET.get('page', 1)
    paginator = Paginator(blog_list, 3)
    try:
        blog_list = paginator.page(page)
    except PageNotAnInteger:
        blog_list = paginator.page(1)
    except EmptyPage:
        blog_list = paginator.page(paginator.num_pages)
    return render(request, 'poleznaya.html', { 'blog_list': blog_list, 'post':post, "static": static, "breadcrumb": log, "footer": footer })

# Поиск по сайту
def search(request):
    post = Post.objects.filter(post_status='post').order_by('-id')
    footer=Post.objects.filter(post_status='post').order_by('-id')[:2]
    com = request.GET.get("s", "")
    s = re.sub(r'[^\w\s]', '', com)      # telefon = re.sub(r'[-+,()\s]','', tel)
    query_string = request.path_info
    log = breadcrumb(query_string)+' "'+s+'"'
    title_search = s
    
    blog_list = Post.objects.filter(Q(title__icontains=s) | Q(post_content__icontains=s) | Q(post_descr__icontains=s))
    if len(s)>3 and blog_list:
        page = request.GET.get('page', 1)
        paginator = Paginator(blog_list, 10)
        try:
            blog_list = paginator.page(page)
        except PageNotAnInteger:
            blog_list = paginator.page(1)
        except EmptyPage:
            blog_list = paginator.page(paginator.num_pages)
        return render(request, 'search.html', { 'blog_list': blog_list, 'post':post, "breadcrumb": log, 'title_search': title_search, "footer": footer })
    else:
        return render(request, "not_search.html", { 'post':post, "breadcrumb": log, 'title_search': title_search, "footer": footer })
#Меню сайдбара
def menusidebar(par):
    qwer=5
# Хлебные крошки
def breadcrumb(query_string):
    w = []
    if not query_string == '/':
        w.append('<a rel="v:url" property="v:title" title="На главную" class="home" href="#">Главная</a>')
        split = query_string.split("/")
        if len(split) == 2:
            if split[1] == 'poleznaya-informaciya':
                w.append('<span typeof="v:Breadcrumb"><span property="v:title">Полезная информация</span></span>')
            else:
                post = Post.objects.get(post_url=split[1])
                w.append('<span typeof="v:Breadcrumb"><span property="v:title">'+post.title+'</span></span>')
        if len(split) == 3:   
            if split[1] == 'poleznaya-informaciya':
                post = Post.objects.get(post_url=query_string)
                w.append('<span rel="v:child" typeof="v:Breadcrumb"><a rel="v:url" property="v:title" title="На главную" href="/poleznaya-informaciya">Полезная информация</a>')
                w.append('<span class="breadcrumb_last">'+post.title+'</span>')
            elif split[1] == 'search':
                w.append('<span typeof="v:Breadcrumb"><span property="v:title">Результаты поиска</span></span>')
            else:
                post = Post.objects.get(post_url=query_string)
                post1 = Post.objects.get(post_url=split[1])
                w.append('<span rel="v:child" typeof="v:Breadcrumb"><a rel="v:url" property="v:title" title="На главную" href="/'+post1.post_url+'">'+post1.title+'</a>')
                w.append('<span class="breadcrumb_last">'+post.title+'</span>')

        if len(split) == 4:
            post = Post.objects.get(post_url=query_string)
            post1 = Post.objects.get(post_url=split[1])
            poi_qwe ="/"+split[1]+"/"+split[2]
            post2 = Post.objects.get(post_url=poi_qwe)
            w.append('<span rel="v:child" typeof="v:Breadcrumb"><a rel="v:url" property="v:title" title="На главную" href="/'+post1.post_url+'">'+post1.title+'</a>')
            w.append('<span rel="v:child" typeof="v:Breadcrumb"><a rel="v:url" property="v:title" title="На главную" href="'+post2.post_url+'">'+post2.title+'</a>')
            w.append('<span class="breadcrumb_last">'+post.title+'</span></span>')

        kom = "".join(w)
        return kom
# отправка multisend
def multisend(request):
    qwe=5
# Ajax почта шаблон
def ajax(request):
    if request.method == "POST":
        name = request.POST.get("user_name")
        email = request.POST.get("user_email")
        tel = request.POST.get("user_telefon")
        text = request.POST.get("text_comment")

        tel_id = 0
        name_id = 0
        tel_fon_id = 0
        mail_id = 0
        response_data = {
            'err1': '',
            'err2': '',
            'err3': '',
            'err4': '',
            'err5': '',
            'res': '',
            'rest':'',
            
            }

        if not name:
            name_id = 1
        else:
            if re.findall(r'[\W\d]', name) or len(name)<4 or len(name)>15:
                name_id = 2
        telefon = re.sub(r'[-+,()\s]','', tel)
        if not email and not tel:
            tel_fon_id = 1
        if not email:
            if re.findall(r'[\D]', telefon) or len(telefon)<4 or len(telefon)>15:
                tel_id = 1
        else:
            if (not re.match(r'^[-_a-zA-Z0-9]{1,30}[@][-_a-z]{2,15}\.[a-z]{2,4}', email)):
                mail_id = 1
        if not email or not tel:
            coloporas =4
        else:
            if (not re.match(r'^[-_a-zA-Z0-9]{1,30}[@][-_a-z]{2,15}\.[a-z]{2,4}', email)):
                mail_id = 1
            if re.findall(r'[\D]', telefon) or len(telefon)<4 or len(telefon)>15:
                tel_id = 1
        if tel_fon_id == 1:
            mail_id = 0
            tel_id = 0
        #Вывод ошибок
        if name_id == 1:
            response_data['err1'] = 'Вы не заполнели поле Ваше имя!'
        if name_id == 2:
            response_data['err2'] = 'Имя должно быть от 4 до 15 символов и без цифр!'
        if tel_id == 1:
            response_data['err3'] = 'Телефон должен быть от 4 до 15 символов и без букв!'
        if tel_fon_id == 1:
            response_data['err4'] = 'Заполните поле E-mail или Телефон!'
        if mail_id == 1:
            response_data['err5'] = 'E-mail должен иметь вид user@somehost.com!'
        if mail_id == 0:
            response_data['err5'] = '&nbsp'
        if tel_id == 0:
            response_data['err3'] = '&nbsp'
        if name_id != 1 and name_id != 2 and tel_id != 1 and tel_fon_id != 1 and mail_id != 1:
            massage=[]
            massage.append("Имя пользователя: " +name+ " <br/>")
            massage.append("E-mail пользователя: "+email+" <br/>")
            massage.append("Телефон: "+tel+" <br/>")
            massage.append("Текст письма:  "+text+" <br/>")
            mas = "".join(massage)
            send_mail('Письмо с обратной связи', mas, settings.EMAIL_HOST_USER, ['info@elecso.ru'],html_message=mas)
            response_data['res'] = "Сообщение успешно отправлено!"
            response_data['rest'] = 1
        else:
            response_data['rest'] = 0

        
        return HttpResponse(
            json.dumps(response_data),
            content_type="application/json"
        )
    else:
        raise Http404
# Ошибка 404
def multisend(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("tel")
        tel = request.POST.get("email")
        text = request.POST.get("message")
        
        massage=[]
        massage.append("Имя пользователя: " +name+ " <br/>")
        massage.append("E-mail пользователя: "+email+" <br/>")
        massage.append("Телефон: "+tel+" <br/>")
        massage.append("Текст письма:  "+text+" <br/>")
        mas = "".join(massage)
        
        file = request.FILES.get("file[]").read()
        filename = request.FILES.get("file[]").name
        
        email = EmailMessage('Письмо с обратной связи', mas, settings.EMAIL_HOST_USER,  ['info@elecso.ru'])
        email.content_subtype = "html"
        email.attach(filename,file)
        email.send()
        
        
    else:
        raise Http404