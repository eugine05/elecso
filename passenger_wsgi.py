# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, '/home/e/euginerd/elecso_django/elecso')
sys.path.insert(1, '/home/e/euginerd/.local/lib/python3.6/site-packages')
os.environ['DJANGO_SETTINGS_MODULE'] = 'elecso.settings'
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()