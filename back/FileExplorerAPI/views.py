import rest_framework.request
from rest_framework.views import APIView
from rest_framework.response import Response
from subprocess import getoutput as gout
from os import chdir as cd
from back.settings import BASE_DIR


def getActualFolder():
    return gout('pwd')[len(str(BASE_DIR)):]


class Actions(APIView):
    def get(self, request, dtype, name):
        command = 'mkdir' if dtype == 'dir' else 'touch'
        return Response(gout(f'{command} {name}'))

    def post(self, request, action):
        pwd = gout('pwd') + "/"
        destiny = pwd + request.data['destiny']
        documents = pwd + f" {pwd}".join(request.data['documents'])
        return Response(gout(f'{action} {documents} {destiny}'))

    def put(self, request):
        pwd = gout('pwd') + "/"
        documents = pwd + f" {pwd}".join(request.data)
        return Response(gout(f'rm -rf {documents}'))


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
                        'read': permissions[1] != '-',
                        'write': permissions[2] != '-',
                        'exec': permissions[3] != '-'
                    },
                    'group': {
                        'read': permissions[4] != '-',
                        'write': permissions[5] != '-',
                        'exec': permissions[6] != '-'
                    },
                    'other': {
                        'read': permissions[7] != '-',
                        'write': permissions[8] != '-',
                        'exec': permissions[9] != '-'
                    }
                }
            })
        return Response({
            'path': getActualFolder(),
            'content': content
        })

    def post(self, request: rest_framework.request.Request):
        cd(request.data['directory'])
        return Response(getActualFolder())

    def put(self, request):
        name = request.data['name']
        dtype = request.data['type']
        command = 'mkdir' if dtype == 'dir' else 'touch'
        return Response(gout(f'{command} {name}'))

    def patch(self, request):
        pwd = gout('pwd') + "/"
        destiny = pwd + request.data['destiny']
        action = request.data['action']
        documents = pwd + f" {pwd}".join(request.data['documents'])
        return Response(gout(f'{action} {documents} {destiny}'))


class Permissions(APIView):
    def get(self, request):
        return Response(gout('cat /etc/passwd | cut -d: -f1').split('\n'))

    def post(self, request):
        name = request.data['name']
        permissions = request.data['permissions']
        perms = ''
        for i in ['owner', 'group', 'other']:
            n = "".join(['1' if permissions[i][j] else '0' for j in ['read', 'write', 'exec']])
            perms += str(int(n, 2))
        return Response(gout(f'chmod -R {perms} {name}'))

    def patch(self, request):
        pwd = gout('pwd') + "/"
        documents = pwd + f" {pwd}".join(request.data)
        return Response(gout(f'rm -rf {documents}'))

    def put(self, request):
        name = request.data['name']
        user = request.data['user']
        return Response(gout(f'chown -R {user} {name}'))
