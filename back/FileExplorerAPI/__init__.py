from os import chdir, mkdir
from back import settings

BASE_PATH = 'public'
try:
    mkdir(BASE_PATH)
except FileExistsError:
    pass
chdir(BASE_PATH)
settings.BASE_DIR = settings.BASE_DIR.cwd()
