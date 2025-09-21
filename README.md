# Calendario Personalizado con IA

Aplicación web que diseña un calendario temático según la descripción que ingresa
la persona usuaria. El aspecto visual se genera en vivo consultando la API de
OpenAI, por lo que las combinaciones de colores, tipografías y explicaciones se
adaptan a cada pedido.

## Características principales

- Formulario para describir cómo debería verse el calendario.
- Llamada directa a un modelo de OpenAI que devuelve entre 3 y 5 estilos en
  formato JSON listo para aplicar.
- Paletas, tokens de diseño y explicaciones creadas por la IA para cada
  propuesta.
- Calendario navegable por meses que adopta al instante el estilo elegido.
- Opción de restablecer la clave de API almacenada desde la consola del
  navegador (`resetStoredApiKey()`).

## Requisitos previos

Necesitás una API key válida de OpenAI con acceso al modelo `gpt-4o-mini` o
compatible.

## Cómo usar la aplicación

1. Cloná el repositorio o descargá los archivos.
2. Abrí `index.html` directamente en tu navegador o servilo de forma local con:

   ```bash
   python -m http.server 8000
   ```

   Después ingresá en `http://localhost:8000/index.html`.
3. Al solicitar estilos por primera vez la app te pedirá tu API key. Se guarda
   únicamente en el `localStorage` del navegador.
4. Escribí qué estética buscás y hacé clic en **“Pedir sugerencias inteligentes”**.
5. Elegí una de las propuestas generadas para ver el calendario con ese tema.

Si querés borrar la clave guardada, abrí la consola del navegador y ejecutá
`resetStoredApiKey()`.
