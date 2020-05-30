# Proyecto final DWFS Acamica DELILAH RESTO

El objetivo del proyecto Delilah Restó es emular la tarea de un desarrollador backend. Se desarrolla una api que permite agregar usuarios, productos y pedidos para el restaurante. Este proyecto fue desarrollado por DANIELA YEPES ARANGO.

## Instalación proyecto
### Instalación NODE modules
Por favor realizar los siguientes pasos para inicializar node en el proyecto

```bash
npm install
```

### Instalación Base de datos
Correr los scripts que estan en la carpeta scripts\create_database.
Este contiene ademas de creacion de tablas la creación por defecto de un usuario de administración de la plataforma.

```sql
INSERT INTO USUARIOS (usuario,nombreApellido,email,telefono,direccion,contrasena,esAdmin)
VALUES('administrator','administrador','admin@admin.com','admin','admin','admin123',TRUE);
```

Este archivo tambien contiene los siguientes inserts para las tablas de PAGO y ESTADOS

```sql
INSERT INTO `ESTADOS`(`id`, `estado`)
VALUES(NULL, "Confirmado"),(NULL, "Preparando")(NULL, "Preparando")(NULL, "Preparando")(NULL, "Preparando")(NULL, "Preparando");

INSERT INTO `PAGO`(`id`, `formaPago`)
VALUES(NULL, "Tarjeta Credito"),(NULL, "Efectivo"),(NULL, "Tarjeta Debito");
```

Cuando este terminada la instalacion de la base de datos debe ingresar la ubicacion de la misma reemplazando Base_Datos por la url la que acaba de instalar:

```bash
config\config.js \\Ubicacion archivo

const sequelize = new Sequelize('mysql://Base_Datos);
```

### Ejecución del servidor

```bash
node app.js
```

### Test Api
Para hacer pruebas de la api, usar Postman y los archivos que adjunto donde se muestra la estructura correcta para cada peticion a la api
