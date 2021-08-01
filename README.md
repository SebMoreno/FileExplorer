# FileExplorer

### ACTUALMENTE EL PROYECTO ESTÁ FUNCIONANDO ONLINE EN LA SIGUIENTE URL: `http://18.116.239.121` usarlo con discreción.

El proyecto está hecho con dos tecnologías, una para el backend (Django) y otra para el frontend (Angular).
Todo lo siguiente debe realizarse en un sistema Linux para que el proyecto funcione.

Todos los comandos son los correspondientes probados en un sistema `Ubuntu 20.04.2 LTS`, `Release 20.04` recién instalado.

Ya que el proyecto necesita poder cambiar permisos y propietarios de los documentos es necesario que se ejecute con permisos de super usuario, con lo cual antes de nada por favor ejecuta el comando
```
sudo su -
```
El archivo comprimido se debe descomprimir y mover a la ruta de archivos del super usuario donde se guardará y ejecutará todo.

## Ejecución

El backend está construido en django con lo cual python es necesario.

La versión de python necesitada es `python 3.8.10` o compatibles.

Ya que es recomendable crear un entorno virtual se deben seguir los siguientes pasos:

Para crear un entorno virtual primero es necesario instalar el paquete correspondiente con el siguiente comando

```
apt install python3.8-venv
```

Para después crear el entorno virtual se debe usar el siguiente comando con el nombre desesado, para el ejemplo se usará `DJRest` como nombre.

```
python3 -m venv DJRest
```
Y una vez creado, para activarlo ejecutas el script `activate` que se creó dentro de la carpeta del entorno virtual, lo cual se hace con el siguiente comando:

```
source DJRest/bin/activate
```

Ahora que si está creado y activado el entorno virtual si se puede ejecutar el backend.
Entrar a la carpeta `back` del proyecto, con el comando
```
cd FileExplorer/back
```
donde está el archivo `requirements.txt`.

Una vez dentro, usando pip instalar los requerimientos del proyecto así:

```
pip3 install -r requirements.txt
```

Ahora correr el siguiente comando para ejecutar el servidor:

```
python3 manage.py runserver 0:8000
```

Con esto el backend estará corriendo en el puerto 8000, con lo cual ya se puede acceder por medio de la url `http://localhost:8000/` en el mismo computador.
