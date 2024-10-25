# Clínica Odontológica "Adiós Caries"

Este repositorio contiene el desarrollo del sistema de reservas de turnos para la Clínica Odontológica "Adiós Caries". Este sistema permite la gestión eficiente de odontólogos, pacientes y turnos.

## Tabla de Contenidos

- [Requerimientos](#requerimientos)
- [Clonación del Repositorio](#clonación-del-repositorio)
- [Instalación de Dependencias](#instalación-de-dependencias)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)

## Requerimientos

### Requerimientos Funcionales

1. **Gestión de datos de odontólogos**
   - Listar, agregar, modificar y eliminar odontólogos.
   - Registro de horas de inicio y finalización de jornada.
   - Filtrar por odontólogo y mostrar disponibilidad de horas.
   - Marcar odontólogos como inactivos temporalmente.
   - Verificar citas pendientes antes de eliminar un odontólogo.
   - Ingreso con usuario o correo.

2. **Gestión de datos de pacientes**
   - Listar, agregar, modificar y eliminar pacientes.
   - Ingreso con usuario o correo.

3. **Registro de Turno**
   - Asignar un turno a un paciente con un odontólogo en una fecha y hora determinada.
   - Cancelación de turnos con al menos 20 minutos de anticipación.
   - Etiquetas de cita: urgencia, control, higiene o valoración con duraciones específicas.

4. **Creación de Usuario**
   - Permitir la creación de usuarios mediante correo y contraseña.
   - Validar registro de odontólogos como clientes con usuarios diferentes.

### Requerimientos No Funcionales

- Disponibilidad 24/7 del sistema.
- Interfaz intuitiva y fácil de usar.
- Capacidad para soportar un gran volumen de datos sin afectar el rendimiento.


## Clonación del Repositorio
Para clonar el repositorio, ejecuta el siguiente comando en tu terminal: 

```bash
git clone https://github.com/DuarteCamilo/repo_front.git
```

## Instalación de Dependencias
Una vez clonado el repositorio, navega hasta la carpeta del proyecto e instala las dependencias ejecutando:
```bash
cd clinica-odontologica
npm install
```

## Ejecución de la Aplicación
Para iniciar la aplicación en modo local, ejecuta el siguiente comando:
```bash
npm run dev
```
Esto abrirá la aplicación en tu navegador predeterminado en http://localhost:5173

