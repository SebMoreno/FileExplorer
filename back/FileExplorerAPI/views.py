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

    def post(self, request):
        cd(request.data)
        return Response(getActualFolder())

    def put(self, request):
        name = request.data['name']
        object_type = request.data['type']
        command = 'mkdir' if object_type == 'dir' else 'touch'
        # Returns if error
        return Response(gout(f'{command} {name}'))

    def patch(self, request):
        pwd = gout('pwd') + "/"
        destiny = pwd + request.data['destiny']
        documents = pwd + f" {pwd}".join(request.data['documents'])
        return Response(gout(f'mv {documents} {destiny}'))


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
        # Returns if error
        return Response(gout(f'chmod -R {perms} {name}'))

    def patch(self, request):
        pwd = gout('pwd') + "/"
        documents = pwd + f" {pwd}".join(request.data['documents'])
        print(f'rm -rf {documents}')
        return Response(gout(f'rm -rf {documents}'))
        # return Response('a')

    def put(self, request):
        name = request.data['name']
        user = request.data['user']
        # Returns if error
        return Response(gout(f'chown -R {user} {name}'))
