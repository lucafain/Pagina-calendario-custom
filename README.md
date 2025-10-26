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

## Cómo usar la aplicación

1. Cloná el repositorio o descargá los archivos.
2. Abrí `index.html` directamente en tu navegador o servilo de forma local con:

   ```bash
   python -m http.server 8000
   ```

   Después ingresá en `http://localhost:8000/index.html`.
3. Indicá tu nombre, elegí si estás navegando desde un celular o una
   computadora y, si lo deseás, pegá un código de sincronización para recuperar
   un perfil previo.
4. Escribí qué estética buscás y hacé clic en **“Pedir sugerencias inteligentes”**.
5. Explorá las propuestas sugeridas, elegí tu favorita y mirá cómo cambia el calendario.

> El motor interpreta términos como "oscuro", "pastel", "elegante" o referencias
> estacionales (Navidad, primavera, etc.) para adaptar las paletas, las tipografías
> y el tipo de fondo sin depender de una conexión a internet adicional.

## Perfiles y sincronización

- El calendario se guarda automáticamente por nombre de usuario. Podés volver en
  cualquier momento y retomar tus eventos y el estilo aplicado.
- El saludo superior muestra el código de sincronización único generado para tu
  perfil. Copialo para continuar en otro navegador o dispositivo y pegalo en el
  campo "código de sincronización" de la pantalla inicial.
- El selector de dispositivo fuerza la interfaz a un ancho móvil (420px) o de
  escritorio (1200px) independientemente de la pantalla desde donde ingreses.
