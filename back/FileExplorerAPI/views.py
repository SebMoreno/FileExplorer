from rest_framework.views import APIView
from rest_framework.response import Response
from subprocess import getoutput as gout

class TestAPI(APIView):
    def get(self, request):
        gout('mkdir public/TestFolder')
        files = gout('find public/TestFolder/ -maxdepth 1 -type f').split('\n')
        return Response({'test': ['pripra'], 'dirs': a})
