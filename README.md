SPAs
====

Single Page Application


UI/JS(React)                  Lógica/Modelo
___________                   _____________
|         |     JSON         |            |
| cliente | <----> | | ----> |  servidor  |  <--------->   BBDD
|_________|        | |       |            |       /
 100000            | |       |            |      /
                             |____________|     /
                                               /
                                              /
                              _____________  /
                             |            |
                             |  servidor  |
                             |____________|

                              _____________
                             |            |
                             |  servidor  |
                             |____________|

REST
Token (JWT)

HTTP
  Header
    Token
  Body



https://miapp.com

https://miapp.com?search=pirulo

https://miapp.com/crearUsuario

Routeo del lado del cliente (React Router)

Usuario que se loggea
POST /login
/dashboard
/crearUsuario

<head>
  <style>
    ....
  </style>
  <script>
    ...
  </script>
<head>

{
  titulo: string,
  cuerpo: string
}
<h1 id="titulo"></h1>
<p id="cuerpo"></p>


