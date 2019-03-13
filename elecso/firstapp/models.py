from django.db import models
 
class Post(models.Model):
    title = models.CharField(max_length=100)
    post_date = models.DateTimeField()
    post_content = models.TextField()
    post_descr = models.TextField()
    post_status = models.CharField(max_length=100)
    post_url = models.CharField(max_length=100)
    img = models.CharField(max_length=100)
    title_page = models.CharField(max_length=100)
    descr = models.TextField()
