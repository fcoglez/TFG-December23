# IP donde se encuentra desplegada la web
http://143.47.38.60

# Idea Principal - Centro Deportivo

La idea principal de mi sitio web es la gestión de un centro deportivo que consta de tres tipos de usuarios:

1. Usuario Normal.
2. Usuario Entrenador.
3. Usuario Admin.

## Página de Inicio

Cuando se accede a la página de inicio, se muestra una barra de navegación con tres secciones:

1. **Actividades:** Donde se detallan las actividades que se imparten en el centro.
2. **Quiénes Somos:** Información sobre el centro, sus instalaciones y ubicación.
3. **Iniciar Sesión:** Permite el registro de nuevos clientes y la sesión de clientes ya registrados.

## Usuario Admin

La aplicación incluye un usuario admin por defecto con privilegios especiales:

- Asignar entrenadores a clientes sin entrenador.
- Gestionar rutinas.
- Crear y eliminar ejercicios del centro deportivo.
- Editar y borrar rutinas de clientes.
- Crear nuevos entrenadores.

## Usuario Cliente

Cuando un cliente inicia sesión, puede acceder a:

- Datos del entrenador asignado (si tiene uno).
- Información sobre su rutina (si está asignada).
- Cada cliente tiene una sola rutina y un solo entrenador asignado.

## Usuario Entrenador

Los entrenadores pueden:

- Ver una tabla con todos los clientes asignados y sus rutinas (si tienen alguna).
- Asignar clientes que no tienen entrenadores.
- Borrar clientes asignados.
- Gestionar las rutinas de sus clientes.

## Funcionalidades Adicionales (Si tengo tiempo)

Si dispongo de tiempo adicional, me gustaría implementar las siguientes funcionalidades:

1. **Blog:** Para publicar contenido relacionado con el centro deportivo.
2. **Contacto:** Un apartado para que los usuarios hagan preguntas y notifiquen al admin a través de correo electrónico. El admin puede responder a estas preguntas.

Esta es la idea principal del proyecto, que puede ampliarse con estas funcionalidades adicionales si el tiempo me lo permite.

# DOCUMENTACIÓN

## Bienvenidos a Sport Center

### Gama de colores empleada en la web
![Imagen Ilustrativa](imgs/colores_web.png)

La página principal del proyecto ofrece un servicio para mejorar la salud y el rendimiento a través de:

1. **Entrenamientos Personalizados:** Entrenamientos adaptados a tus objetivos, con feedback continuo de entrenadores.

2. **Estilo de Vida Saludable:** Promovemos hábitos que contribuyen al bienestar físico, mental y emocional.

3. **Asesoramiento Nutricional Adaptado:** Dietista-nutricionista para personalizar planes nutricionales.


![Imagen Ilustrativa](imgs/home.png)

Despues tenemos otra página que habla un poco sobre la variedad de actividades que hay en Sport Center, desde entrenamiento en grupo hasta clases de yoga. Sport Center ofrece servicios personalizados, desde entrenamiento individual hasta asesoramiento nutricional.

![Imagen Ilustrativa](imgs/servicios.png)

En la página de quienes somos habla sobre la misión a cumplir con los clientes, el equipo de trabajo que hay en el centro, las instalaciones y donde se encuentra el centro.

![Imagen Ilustrativa](imgs/quienesomos.png)

Tambien hay un login donde los usuarios se podran tanto registrar como loguearse.
![Imagen Ilustrativa](imgs/login.png)


En los siquientes paso voy a comentar donde esta toda la funcionalidad importante empleada en el proyecto. La web de SporCenter cuenta con tres tipos de usuarios. Un usuario normal, un 
usuario entrenador y un usuario admin.

# Un usuario normal, cuando se loguea en su página va a tener la asignación de un entrenador del centro en el caso que lo tenga y una rutina asignada por el entrenador.

vista principal de un usuario normal
![Imagen Ilustrativa](imgs/rutinausernormal.png)

edición del perfil de usuario
![Imagen Ilustrativa](imgs/editusernormal.png)

# Un usuario entrenador, tendra sus datos, un enlace a los clientes que tiene asignado dicho entrenador y los usuarios normales que aun no tienen ningun entrenador asignado. Y por último tendra un enlace para la gestión de rutinas que podra tanto crear rutinas como asignar rutinas.

Vista de un entrenador
![Imagen Ilustrativa](imgs/perfiltrainer.png)

Gestión de usuarios de ese entrenador en concreto
![Imagen Ilustrativa](imgs/trainerasig.png)

La gestión de las rutinas es la misma que la del usuario admin que veremos despues.

# Un usuario admin, cuenta tanto con la creación de usuarios, creacion y modificación de ejercicios, gestion de rutinas y gestión de entrenadores.

Vista de todos los usuarios.
![Imagen Ilustrativa](imgs/showusers.png)

Edición de usuarios
![Imagen Ilustrativa](imgs/edituser.png)

Nuevo usuario
![Imagen Ilustrativa](imgs/newUser.png)

Vista de todos los ejercicios.
![Imagen Ilustrativa](imgs/showex.png)

Edición de ejercicios
![Imagen Ilustrativa](imgs/editex.png)

Nuevo ejercicio
![Imagen Ilustrativa](imgs/newex.png)


Vista de todos las rutinas
![Imagen Ilustrativa](imgs/showro.png)

Edición de rutinas
![Imagen Ilustrativa](imgs/editro.png)

Nueva rutina
![Imagen Ilustrativa](imgs/newro.png)

Asignación de rutinas
![Imagen Ilustrativa](imgs/asigro.png)


Vista de todos los entrenadores
![Imagen Ilustrativa](imgs/showtrainers.png)

Asignación de usuarios normales a entrenador
![Imagen Ilustrativa](imgs/asigtra.png)



















