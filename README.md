# FileExplorer

El proyecto está hecho con dos tecnologías, una para el backend y otra para el frontend, con lo cual se deben instalar y ejecutar ambas partes por separado.
Todo lo siguiente debe realizarse en un sistema Linux para que el proyecto funcione.

Todos los comandos son los correspondientes probados en un sistema `Ubuntu 20.04.2 LTS`, `Release 20.04` recién instalado.

Después de clonar el reponsitorio seguir los siguientes pasos.

## Ejecución del backend

El backend está construido en django con lo cual python es necesario.

La versión de python necesitada es `python 3.8.5` o compatibles. Es recomendable crear un entorno virtual con `virtualenv`.

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

Con esto el backend estará corriendo en el puerto 8000. Dejar esta terminal corriendo y en una nueva terminal seguir las instrucciones para ejecutar el frontend.

## Ejecución del frontend

Entrar a la carpeta `front`.
```
cd FileExplorer/front
```

Ahora, para la ejecución se necesita `npm` que se puede instalar con el siguiente comando:
```
apt install npm
```

Una vez instalado `npm` solo se deben correr estos dos comandos:
```
npm install
npm start
```

Después de los cuales el proyecto quedará listo para usar.

Para ver el projecto entrar a `localhost:4200` en un navegador.
