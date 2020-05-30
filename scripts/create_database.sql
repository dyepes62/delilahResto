CREATE TABLE USUARIOS(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
usuario VARCHAR(255) NOT NULL,
nombreApellido VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
telefono VARCHAR(255) NOT NULL,
direccion VARCHAR(255) NOT NULL,
contrasena VARCHAR(255) NOT NULL,
esAdmin BOOLEAN NOT NULL
);


INSERT INTO USUARIOS (usuario,nombreApellido,email,telefono,direccion,contrasena,esAdmin)
VALUES('administrator','administrador','admin@admin.com','admin','admin','admin123',TRUE);

CREATE TABLE PRODUCTOS(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
producto VARCHAR(255) NOT NULL,
precio VARCHAR(255) NOT NULL,
urlImagen VARCHAR(255) NOT NULL,
descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE PEDIDOS(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
idUsuario INT NOT NULL,
idFormaPago INT NOT NULL,
idEstado INT NOT NULL,
fecha DATETIME NOT NULL,
descripcionProductos VARCHAR(255) NOT NULL,
precioTotal VARCHAR(255) NOT NULL,
FOREIGN KEY(idUsuario) REFERENCES USUARIOS(id),
FOREIGN KEY(idFormaPago) REFERENCES PAGO(id),
FOREIGN KEY(idEstado) REFERENCES ESTADOS(id)
);

CREATE TABLE ESTADOS (
    id int NOT NULL,
    estado VARCHAR (60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE PAGO (
    id int NOT NULL,
    formaPago VARCHAR (60) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE PEDIDO_PRODUCTOS(
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    FOREIGN KEY(idPedido) REFERENCES PEDIDOS(id),
    FOREIGN KEY(idProducto) REFERENCES PRODUCTOS(id)
);

INSERT INTO `ESTADOS`(`id`, `estado`)
VALUES(NULL, "Confirmado"),(NULL, "Preparando")(NULL, "Preparando")(NULL, "Preparando")(NULL, "Preparando")(NULL, "Preparando");

INSERT INTO `PAGO`(`id`, `formaPago`)
VALUES(NULL, "Tarjeta Credito"),(NULL, "Efectivo"),(NULL, "Tarjeta Debito");