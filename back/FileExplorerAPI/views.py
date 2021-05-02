from rest_framework.views import APIView
from rest_framework.response import Response
from subprocess import getoutput as gout
from os import system as sys, chdir as cd
from back.settings import BASE_DIR


def getActualFolder():
    return gout('pwd')[len(str(BASE_DIR)):]


class Info(APIView):
    def get(self, request):
        content = []
        for i in gout('ls -l').split('\n')[1:]:
            line = i.split()
            permissions = line[0]
            content.append({
                'name': line[-1],
                'owner': line[2],
                'type': 'dir' if permissions[0] == 'd' else 'file',
                'permissions': {
                    'owner': {
                        'read': permissions[1] if permissions[1] != '-' else None,
                        'write': permissions[2] if permissions[2] != '-' else None,
                        'exec': permissions[3] if permissions[3] != '-' else None
                    },
                    'group': {
                        'read': permissions[4] if permissions[4] != '-' else None,
                        'write': permissions[5] if permissions[5] != '-' else None,
                        'exec': permissions[6] if permissions[6] != '-' else None
                    },
                    'other': {
                        'read': permissions[7] if permissions[7] != '-' else None,
                        'write': permissions[8] if permissions[8] != '-' else None,
                        'exec': permissions[9] if permissions[9] != '-' else None
                    },
                }
            })
        files = gout('find . -maxdepth 1 -type f').split('\n')[1:]
        dirs = gout('find . -maxdepth 1 -type d').split('\n')[1:]
        return Response({
            'path': getActualFolder(),
            'content': content
        })

    def post(self, request):
        x = gout('ls -l')
        pass

    def put(self, request):
        cd(request.data)
        return Response(getActualFolder())
