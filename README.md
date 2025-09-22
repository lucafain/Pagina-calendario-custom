# Calendario Personalizado con IA

Aplicación web que diseña un calendario temático según la descripción que ingresa
la persona usuaria. El aspecto visual se genera en vivo con un motor heurístico
que interpreta palabras clave y compone varias propuestas coherentes sin
necesitar servicios externos.

## Características principales

- Formulario para describir cómo debería verse el calendario.
- Motor de IA embebido que analiza colores, referencias y estados de ánimo
  mencionados y devuelve entre 3 y 4 estilos listos para aplicar.
- Paletas, tokens de diseño y explicaciones creadas dinámicamente para cada
  propuesta.
- Calendario navegable por meses que adopta al instante el estilo elegido.
- Vista previa accesible con contraste ajustado automáticamente según el tema.
- Identificación inicial que solicita tu nombre y el tipo de dispositivo para
  adaptar la resolución y guardar tu experiencia.
- Perfiles persistentes en `localStorage` con eventos, estilos elegidos y
  opciones de sincronización entre dispositivos mediante un código seguro.
- Importación opcional de códigos o enlaces iCal para sumar reuniones y
  recordatorios existentes al calendario personalizado.

## Cómo usar la aplicación

1. Cloná el repositorio o descargá los archivos.
2. Abrí `index.html` directamente en tu navegador o servilo de forma local con:

   ```bash
   python -m http.server 8000
   ```

   Después ingresá en `http://localhost:8000/index.html`.
3. Indicá tu nombre, elegí si estás navegando desde un celular o una
   computadora, definí el código personal con el que vas a volver a entrar y,
   si ya exportaste un perfil, pegá el código completo para recuperarlo.
4. Escribí qué estética buscás y hacé clic en **“Pedir sugerencias inteligentes”**.
5. Explorá las propuestas sugeridas, elegí tu favorita y mirá cómo cambia el calendario.

6. Si ya usás otra agenda digital, bajá o copiá su código de inserción iCal y
   pegalo en la tarjeta **“Sincronizá con tu calendario iCal”** para traer tus
   reuniones. Los eventos importados se muestran con un estilo diferenciado.

> El motor interpreta términos como "oscuro", "pastel", "elegante" o referencias
> estacionales (Navidad, primavera, etc.) para adaptar las paletas, las tipografías
> y el tipo de fondo sin depender de una conexión a internet adicional.

## Perfiles y sincronización

- El calendario se guarda automáticamente por nombre de usuario y código
  personal. Podés volver en cualquier momento y retomar tus eventos y el estilo
  aplicado.
- El saludo superior muestra tu alias elegido y el código completo
  (`alias::datos_codificados`) que debés copiar para continuar en otro navegador
  o dispositivo. Pegalo en el campo "código guardado" de la pantalla inicial
  para restaurar todo.
- El selector de dispositivo fuerza la interfaz a un ancho móvil (420px) o de
  escritorio (1200px) independientemente de la pantalla desde donde ingreses.
- El código de sincronización también conserva la conexión iCal y los eventos
  importados, por lo que podés restaurarlos en otro navegador sin repetir el
  proceso de inserción.

## Importar calendarios iCal

- Abrí la tarjeta **“Sincronizá con tu calendario iCal”** ubicada debajo de la
  vista previa del calendario.
- Pegá cualquiera de estas opciones en el campo disponible:
  - El enlace público que termina en `.ics`.
  - El código de inserción HTML que proveen servicios como Google Calendar.
  - El contenido completo del archivo `.ics` exportado desde otra aplicación.
- Presioná **“Agregar eventos de iCal”**. Si el enlace requiere permisos
  especiales, descargá el archivo y pegá su contenido.
- Los eventos iCal se resaltan con una barra de color y permanecen visibles
  incluso si limpiás las anotaciones manuales de un día. Podés quitar toda la
  conexión en cualquier momento con el enlace **“Quitar calendario iCal”**.
