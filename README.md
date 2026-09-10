# 003 150 Dinamicas Terapia Ocupacional Infantil

Crea una aplicación web responsive en español que contenga una biblioteca de 150 dinámicas de terapia ocupacional infantil.

Prioriza el funcionamiento completo: navegar, buscar, filtrar, consultar las instrucciones y guardar favoritos. Quiero una aplicación utilizable, con contenido y botones funcionales.

Si adjunto capturas, úsalas como referencia de estructura y estilo. Ignora completamente al hombre que aparece superpuesto, su vídeo, marca de agua y los controles de reproducción de la grabación.

CONCEPTO Y ALCANCE

Nombre provisional: “TO Kids · 150 Dinámicas”.

La aplicación ayuda a profesionales a encontrar y preparar dinámicas según el área de trabajo, edad, dificultad y habilidades.

Toda la interfaz y el contenido deben estar en español.

Primera versión:

Sin registro, inicio de sesión, suscripciones ni pagos.

Acceso directo al catálogo.

Sin gestión de pacientes ni historias clínicas.

Favoritos persistentes mediante localStorage.

No mostrar perfiles ficticios de doctores ni llamadas a comprar acceso premium.

No necesita Supabase ni servicios externos para funcionar.

Usa React y TypeScript. Separa componentes, datos y lógica para facilitar futuras ampliaciones.

NAVEGACIÓN Y DISEÑO

En ordenador, muestra un menú lateral con:

Inicio.

Dinámicas.

Categorías.

Favoritos.

Acerca de.

En móvil, adapta la navegación mediante un menú compacto o una barra inferior. No debe haber desplazamiento horizontal en la página.

Estilo:

Fondo blanco y gris muy claro.

Morado como color principal.

Tarjetas con bordes redondeados y sombras suaves.

Tipografía legible, buen contraste y espacios generosos.

Aspecto profesional, cercano y sencillo.

Iconos consistentes.

Incluye un buscador superior con el texto “Buscar dinámicas…”.

INICIO

Muestra:

Título: “150 dinámicas de terapia ocupacional infantil”.

Descripción breve: “Encuentra actividades organizadas por área, edad y habilidades, con materiales e instrucciones paso a paso”.

Botón “Explorar dinámicas”, que abre el catálogo.

Indicadores de dinámicas disponibles, categorías, habilidades únicas y favoritos.

Una selección de dinámicas destacadas.

Calcula los indicadores a partir de los datos reales. No escribas cantidades estáticas que puedan quedar desactualizadas.

Las tarjetas destacadas deben abrir la misma ficha utilizada en el catálogo.

CATÁLOGO DE DINÁMICAS

Muestra las 150 dinámicas en una cuadrícula responsive.

Cada tarjeta incluirá:

Icono y categoría.

Título.

Objetivo resumido.

Edad recomendada.

Duración en minutos.

Dificultad: Fácil, Media o Avanzada.

Corazón para añadir o quitar de favoritos.

Al pulsar una tarjeta, abre la ficha de la dinámica.

Al pulsar el corazón, cambia únicamente su estado de favorito, sin abrir la ficha.

Incluye:

Número de resultados.

Búsqueda.

Filtros por categoría, edad, dificultad y habilidad.

Botón “Limpiar filtros”.

Orden por título y duración.

Paginación de 18 dinámicas por página.

Los filtros y la búsqueda deben combinarse. Al cambiar un filtro, vuelve a la primera página.

Para la edad, permite seleccionar una edad concreta y muestra las dinámicas cuyo intervalo incluya esa edad.

La búsqueda debe consultar título, objetivo, categoría, habilidades y materiales. Debe ignorar mayúsculas y tildes.

Cuando no haya coincidencias, muestra un mensaje claro y un botón para limpiar la búsqueda y los filtros.

El buscador superior debe llevar al catálogo con la consulta aplicada cuando se use desde otra sección.

Conserva la búsqueda, los filtros, el orden y la página al abrir y cerrar una ficha. Preferiblemente, representa ese estado en los parámetros de la URL.

CATEGORÍAS

Crea estas 9 categorías:

Motricidad fina.

Motricidad gruesa.

Integración sensorial.

Atención y concentración.

Autonomía.

Estimulación cognitiva.

Socialización.

Percepción sensorial.

Actividades escolares.

Muestra una tarjeta por categoría con icono, nombre y cantidad real de dinámicas.

Al pulsar una categoría:

Abre el catálogo con esa categoría seleccionada.

Muestra su nombre y los resultados correspondientes.

Permite combinarla con otros filtros.

Incluye una opción para volver a ver todas las dinámicas.

Cada dinámica tendrá una categoría principal y podrá trabajar varias habilidades.

FICHA COMPLETA DE DINÁMICA

En ordenador, abre una ventana modal amplia. En móvil, utiliza una vista que aproveche prácticamente toda la pantalla.

Cabecera:

Título.

Categoría.

Corazón de favoritos.

Botón de cierre.

Información:

Edad mínima y máxima.

Duración.

Dificultad.

Habilidades en etiquetas.

Lista de materiales.

Objetivo.

Instrucciones prácticas numeradas.

Consejos para facilitar o adaptar la actividad.

Observaciones para el profesional.

Precauciones específicas cuando correspondan.

En escritorio puedes organizarla en dos columnas:

Izquierda: datos básicos, habilidades y materiales.

Derecha: objetivo, instrucciones, consejos y observaciones.

En móvil, presenta todo en una sola columna.

Comportamiento:

Permite desplazarse por el contenido largo.

Bloquea el desplazamiento del fondo mientras está abierta.

Permite cerrar con la X, con Escape y con el botón “Cerrar dinámica”.

Devuelve el foco a la tarjeta que abrió la ficha.

Mantiene el punto del catálogo al cerrar.

Gestiona correctamente el foco y las etiquetas accesibles.

Las observaciones son contenido informativo de la dinámica, no un campo para registrar pacientes.

FAVORITOS

La sección Favoritos mostrará únicamente las dinámicas guardadas.

Incluye:

Cantidad de favoritos.

Tarjetas con el mismo formato del catálogo.

Apertura de la ficha completa.

Posibilidad de quitar favoritos desde las tarjetas o desde la ficha.

Sincroniza inmediatamente el estado entre Inicio, Dinámicas, Favoritos y la ficha.

Guarda identificadores de dinámicas en localStorage. Los favoritos deben conservarse al recargar o cerrar y abrir el navegador.

Aclara discretamente en esta sección: “Tus favoritos se guardan en este navegador”.

Estado vacío:
“Aún no tienes dinámicas favoritas. Pulsa el corazón de una dinámica para guardarla aquí”.
Botón: “Explorar dinámicas”.

Gestiona datos de localStorage inválidos sin bloquear la aplicación.

VÍDEOS COMPLEMENTARIOS

La referencia contiene un carrusel de vídeos en la parte superior del catálogo.

Prepara un componente reutilizable para mostrar:

Título del vídeo.

Miniatura.

Botón “Ver vídeo”.

Desplazamiento horizontal.

Los vídeos deben proceder de una lista de datos configurable.

Como todavía no he proporcionado vídeos:

Deja la lista vacía.

Oculta la sección cuando no haya vídeos.

No inventes enlaces, miniaturas ni vídeos.

No muestres botones sin destino.

Cuando se añada una URL válida, debe poder abrirse en una pestaña nueva. No es necesario implementar un reproductor integrado en esta versión.

ACERCA DE

Crea una página breve que explique:

Qué ofrece la biblioteca.

Cómo ayuda a organizar la preparación de actividades.

Que cada dinámica incluye objetivos, materiales e instrucciones.

Cómo utilizar categorías, búsqueda y favoritos.

No afirmes que las actividades están clínicamente validadas, probadas por especialistas o que garantizan resultados.

Incluye una nota breve:
“Material de apoyo para la planificación de actividades. Adapta cada propuesta a las necesidades del niño y al criterio del profesional”.

CONTENIDO DE LAS 150 DINÁMICAS

No dispongo todavía de un archivo con el contenido. Genera un catálogo inicial de 150 propuestas originales en español, completas y diferentes entre sí, como contenido editorial pendiente de revisión profesional.

Distribución:

Motricidad fina: 20.

Motricidad gruesa: 20.

Integración sensorial: 15.

Atención y concentración: 20.

Autonomía: 15.

Estimulación cognitiva: 20.

Socialización: 15.

Percepción sensorial: 10.

Actividades escolares: 15.

Total: 150.

Evita repetir la misma actividad cambiando únicamente el nombre o un material. Cada propuesta debe tener un objetivo y una secuencia coherentes.

Cada dinámica debe contener:

ID único y estable.

Título.

ID de categoría.

Edad mínima y máxima.

Duración en minutos.

Dificultad.

Habilidades.

Materiales.

Objetivo.

Pasos numerados.

Consejos y adaptaciones.

Observaciones.

Precauciones cuando correspondan.

Indicador de destacada.

Usa actividades sencillas y materiales accesibles. Las instrucciones deben ser lo suficientemente claras para comprender la preparación y el desarrollo.

Evita protocolos especializados que requieran evaluación individual, prácticas de riesgo o promesas de resultados terapéuticos. Añade precauciones concretas cuando haya piezas pequeñas, posibles alérgenos o actividades de equilibrio.

Mantén estos datos en archivos estructurados independientes de los componentes para poder revisarlos, corregirlos o reemplazarlos más adelante.

No rellenes el catálogo con títulos vacíos, texto genérico repetido o fichas incompletas. No muestres “150” si no existen realmente las 150 fichas.

ESTRUCTURA TÉCNICA

Utiliza:

Componentes reutilizables para tarjetas, filtros, modal, navegación e indicadores.

Un modelo TypeScript para las dinámicas.

Un catálogo centralizado de categorías y habilidades.

Una única fuente de estado para favoritos.

Rutas diferenciadas para las cinco secciones.

Un almacenamiento local con clave versionada.

Identificadores estables para conservar favoritos aunque cambien los títulos.

No añadas dependencias externas innecesarias ni llamadas a IA durante el uso de la aplicación. El contenido inicial debe estar disponible desde los datos del proyecto.

VERIFICACIÓN FINAL

Comprueba que:

Existen exactamente 150 dinámicas con identificadores únicos.

Todas tienen sus campos completos y categorías válidas.

Los contadores coinciden con los datos.

Las 9 categorías filtran correctamente.

Búsqueda, filtros, orden y paginación funcionan conjuntamente.

Las fichas se abren desde Inicio, Dinámicas y Favoritos.

Cerrar una ficha conserva el estado del catálogo.

Los corazones se sincronizan en todas las pantallas.

Los favoritos persisten tras recargar.

Los estados vacíos funcionan.

La aplicación se puede utilizar desde móvil y ordenador.

No hay enlaces inventados, botones decorativos ni errores de consola.

Construye la aplicación completa siguiendo estos requisitos. Resuelve las decisiones menores de implementación sin detenerte y, al finalizar, resume qué has implementado y cualquier limitación pendiente.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://terapia-ocupacional-infantil.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7d164907-4e00-475f-ac07-c95f41f67b79).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
