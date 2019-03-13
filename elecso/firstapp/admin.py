from django.contrib import admin
from .models import Post

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('title',)

admin.site.register(Post, QuestionAdmin)