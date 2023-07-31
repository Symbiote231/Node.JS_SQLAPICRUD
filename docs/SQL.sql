create database DBCONTACTO
use DBCONTACTO

Create table Contacto(
IdContacto int identity primary key,
Nombre varchar(50),
Telefono varchar(50),
Correo varchar(50)
);

create procedure sp_ListarContactos
as 
begin 
	select * from Contacto
end


create procedure sp_ObtenerContacto(
@IdContacto int
)
as 
begin 
	select * from Contacto where IdContacto = @IdContacto
end

create procedure sp_InsertarContacto(
@Nombre varchar(100),
@Telefono varchar(100),
@Correo varchar(100)
)
as 
begin
	insert into Contacto(Nombre,Telefono,Correo) values(@Nombre, @Telefono, @Correo)
end

create procedure sp_EditarContacto(
@IdContacto int,
@Nombre varchar(100),
@Telefono varchar(100),
@Correo varchar(100)
)
as
begin
	update Contacto set Nombre= @Nombre, Telefono = @Telefono, Correo =@Correo where IdContacto =  @IdContacto
end

create procedure sp_EliminarContacto(
@IdContacto int
)
as
begin 
	delete from Contacto where IdContacto = @IdContacto
end