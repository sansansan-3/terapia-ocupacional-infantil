export type CategoriaGuiaId = "avances" | "casa" | "seguimiento" | "dudas";

export interface CategoriaGuia {
  id: CategoriaGuiaId;
  nombre: string;
  emoji: string;
  descripcion: string;
}

export interface RecursoComunicacion {
  id: string;
  titulo: string;
  categoria: CategoriaGuiaId;
  situacion: string;
  mensaje: string;
  keywords: string[];
  tipo: "guia-comunicacion";
}

export const CATEGORIAS_GUIA: CategoriaGuia[] = [
  { id: "avances", nombre: "Compartir avances", emoji: "💬", descripcion: "Mensajes para comunicar progresos observados durante las sesiones." },
  { id: "casa", nombre: "Recomendaciones para casa", emoji: "🏠", descripcion: "Ideas para acompañar el trabajo realizado en terapia." },
  { id: "seguimiento", nombre: "Seguimiento después de sesión", emoji: "📝", descripcion: "Plantillas para mantener una comunicación clara después de cada sesión." },
  { id: "dudas", nombre: "Responder dudas frecuentes", emoji: "❓", descripcion: "Respuestas orientativas para preguntas habituales de las familias." },
];

type Base = [titulo: string, situacion: string, mensaje: string, keywords: string[]];

const AVANCES: Base[] = [
  ["Comunicar avance en coordinación mano-ojo", "Cuando el niño muestra mejoras en actividades que requieren precisión manual.", "Durante las últimas sesiones hemos trabajado actividades enfocadas en coordinación mano-ojo. Hemos observado avances progresivos y continuaremos reforzando esta habilidad mediante actividades adaptadas.", ["coordinación", "precisión", "manos"]],
  ["Mejora en el agarre del lápiz", "Cuando el niño sujeta el lápiz de forma más funcional y estable.", "Queríamos compartir que en las últimas sesiones hemos notado un agarre del lápiz más estable y cómodo. Seguiremos practicando con trazos y juegos gráficos para consolidar este progreso.", ["lápiz", "agarre", "escritura", "grafomotricidad"]],
  ["Mayor tiempo de atención en la tarea", "Cuando el niño logra mantenerse más tiempo concentrado en una actividad.", "Hemos observado que ahora es capaz de mantener la atención durante más tiempo en las actividades propuestas. Es un avance muy positivo que seguiremos acompañando con tareas de duración progresiva.", ["atención", "concentración", "tiempo"]],
  ["Progreso en equilibrio", "Cuando el niño se desplaza con más seguridad en circuitos o superficies inestables.", "En las sesiones recientes se ha mostrado más seguro en actividades de equilibrio, como caminar sobre líneas o superar pequeños obstáculos. Continuaremos trabajando esta área con propuestas lúdicas.", ["equilibrio", "motricidad gruesa", "circuito"]],
  ["Avance en autonomía al vestirse", "Cuando el niño logra ponerse o quitarse prendas con menos ayuda.", "Nos alegra contarles que está logrando realizar con más autonomía algunos pasos del vestido, como ponerse la chaqueta. Les animamos a darle tiempo en casa para practicar estos pasos.", ["autonomía", "vestido", "rutinas"]],
  ["Mejor tolerancia a texturas", "Cuando el niño acepta explorar materiales que antes evitaba.", "Durante las sesiones hemos visto que se muestra más dispuesto a explorar texturas nuevas con las manos. Respetamos su ritmo y seguiremos ofreciendo experiencias sensoriales de forma gradual.", ["sensorial", "texturas", "tolerancia"]],
  ["Progreso en el uso de tijeras", "Cuando el niño recorta con mayor control y seguimiento de líneas.", "Hemos notado un buen progreso en el uso de las tijeras: ahora recorta con más control y sigue líneas sencillas. Seguiremos proponiendo recortes de dificultad creciente.", ["tijeras", "recortar", "motricidad fina"]],
  ["Mejora en la interacción con otros niños", "Cuando el niño participa más en juegos compartidos o por turnos.", "En las actividades grupales hemos observado que participa con más iniciativa y respeta mejor los turnos. Es un paso importante en su desarrollo social que seguiremos favoreciendo.", ["socialización", "turnos", "juego"]],
  ["Avance en seguimiento de instrucciones", "Cuando el niño comprende y ejecuta secuencias de varios pasos.", "Queremos compartir que ahora sigue instrucciones de dos o tres pasos con mayor facilidad. Continuaremos trabajando la comprensión de secuencias durante las sesiones.", ["instrucciones", "secuencias", "comprensión"]],
  ["Mayor regulación durante la sesión", "Cuando el niño gestiona mejor la frustración o los cambios de actividad.", "En las últimas sesiones ha manejado mejor los momentos de cambio entre actividades y ha mostrado más calma ante pequeñas dificultades. Seguiremos acompañando este proceso con anticipación y rutinas claras.", ["regulación", "frustración", "transiciones"]],
  ["Progreso en trazos y dibujo", "Cuando el niño realiza trazos más definidos o dibujos más completos.", "Hemos observado trazos más definidos y mayor intención en sus dibujos. Es un avance valioso para la preparación a la escritura que seguiremos reforzando.", ["dibujo", "trazos", "preescritura"]],
  ["Mejora en la coordinación bilateral", "Cuando el niño usa ambas manos de forma coordinada en una tarea.", "Durante las actividades hemos visto una mejor coordinación entre ambas manos, por ejemplo al sujetar el papel mientras recorta o enhebra. Continuaremos proponiendo tareas que integren las dos manos.", ["bilateral", "manos", "coordinación"]],
  ["Avance en planificación motora", "Cuando el niño organiza mejor sus movimientos para realizar una tarea nueva.", "Hemos notado que planifica mejor sus movimientos ante actividades nuevas, como circuitos o construcciones. Seguiremos ofreciendo retos variados para fortalecer esta habilidad.", ["praxis", "planificación motora", "circuitos"]],
  ["Mayor iniciativa en el juego", "Cuando el niño propone juegos o elige actividades por sí mismo.", "Nos gustaría destacar que muestra más iniciativa: propone juegos y elige materiales por sí mismo. Es una señal positiva de confianza que seguiremos fomentando.", ["iniciativa", "juego", "confianza"]],
  ["Progreso general del trimestre", "Al cerrar un periodo de trabajo y resumir avances generales.", "Al finalizar este periodo queremos compartir que hemos observado avances en varias de las áreas trabajadas. Agradecemos su colaboración y seguiremos ajustando los objetivos según su evolución.", ["resumen", "trimestre", "evolución"]],
];

const CASA: Base[] = [
  ["Juegos de pinza con objetos cotidianos", "Cuando se trabaja la motricidad fina y se quiere dar continuidad en casa.", "Para acompañar lo trabajado en sesión, pueden proponer juegos de pinza en casa: recoger pompones con pinzas de ropa o trasladar objetos pequeños entre recipientes, siempre con supervisión.", ["pinza", "motricidad fina", "juego"]],
  ["Participación en tareas de cocina", "Cuando se quiere fomentar autonomía y coordinación de forma natural.", "Una buena forma de reforzar lo trabajado es invitarle a participar en tareas sencillas de cocina, como mezclar, verter o untar, adaptadas a su edad y con supervisión adulta.", ["cocina", "autonomía", "vida diaria"]],
  ["Rutina visual para la mañana", "Cuando al niño le cuesta organizar las rutinas diarias.", "Les recomendamos preparar una rutina visual con dibujos o fotos de los pasos de la mañana (vestirse, desayunar, lavarse los dientes). Ayuda a anticipar y a ganar autonomía.", ["rutina", "pictogramas", "organización"]],
  ["Juego de movimiento en el parque", "Cuando se trabaja la motricidad gruesa y el equilibrio.", "Les animamos a aprovechar el parque para trepar, columpiarse o caminar por bordillos bajos con supervisión. Son actividades que complementan muy bien el trabajo de equilibrio en sesión.", ["parque", "equilibrio", "motricidad gruesa"]],
  ["Plastilina y masas caseras", "Cuando se quiere fortalecer la musculatura de las manos.", "Jugar con plastilina o masa casera (amasar, hacer bolitas, churros) ayuda a fortalecer las manos. Pueden hacerlo unos minutos varias veces por semana. Revisen los ingredientes si hay alergias.", ["plastilina", "fuerza", "manos"]],
  ["Momentos de calma antes de dormir", "Cuando el niño tiene dificultades para regularse al final del día.", "Puede ayudar crear un momento tranquilo antes de dormir: luz suave, música relajada o un cuento. Mantener la misma secuencia cada noche favorece la regulación.", ["calma", "sueño", "regulación"]],
  ["Juegos de mesa por turnos", "Cuando se trabajan habilidades sociales y tolerancia a la espera.", "Los juegos de mesa sencillos son una excelente forma de practicar esperar turnos y aceptar ganar o perder. Les sugerimos jugar partidas cortas en familia.", ["juegos de mesa", "turnos", "socialización"]],
  ["Practicar abotonar con ropa propia", "Cuando se trabaja el vestido y la motricidad fina.", "Pueden practicar abrochar y desabrochar botones grandes en prendas propias o de muñecos, sin prisas y celebrando cada intento. Los botones pequeños conviene dejarlos para más adelante.", ["botones", "vestido", "autonomía"]],
  ["Exploración sensorial con arroz o legumbres", "Cuando se trabaja la integración sensorial en un entorno seguro.", "Una bandeja con arroz o legumbres y pequeños juguetes escondidos ofrece una experiencia sensorial divertida. Es importante supervisar siempre para evitar que se lleve piezas a la boca.", ["sensorial", "bandeja", "exploración"]],
  ["Dibujar en superficies verticales", "Cuando se quiere favorecer la postura de muñeca y hombro.", "Dibujar en una pizarra, un papel pegado a la pared o una ventana con rotuladores lavables ayuda a mejorar la postura de la muñeca y la estabilidad del hombro.", ["vertical", "dibujo", "postura"]],
  ["Recoger juguetes como juego", "Cuando se quiere reforzar orden, clasificación y autonomía.", "Convertir la recogida de juguetes en un juego (clasificar por colores o tamaños) refuerza la autonomía y la organización. Pueden usar cajas con dibujos para cada tipo de juguete.", ["orden", "clasificación", "autonomía"]],
  ["Circuito sencillo en casa", "Cuando se trabaja la coordinación y la planificación motora.", "Con cojines, sillas y cinta en el suelo pueden montar un pequeño circuito para gatear, saltar y pasar por debajo. Asegúrense de que el espacio esté despejado y sea seguro.", ["circuito", "coordinación", "casa"]],
  ["Lectura compartida con preguntas", "Cuando se trabaja la atención y la comprensión.", "Leer juntos un cuento y hacer preguntas sencillas sobre los personajes o lo que va a pasar favorece la atención y la comprensión. Unos minutos diarios son suficientes.", ["lectura", "atención", "comprensión"]],
  ["Uso de cubiertos en las comidas", "Cuando se trabaja la autonomía en la alimentación.", "Les animamos a darle oportunidad de usar la cuchara y el tenedor por sí mismo, aunque tarde más o se ensucie. Un plato con borde y un cubierto de mango grueso pueden facilitarlo.", ["cubiertos", "alimentación", "autonomía"]],
  ["Pausas de movimiento durante los deberes", "Cuando al niño le cuesta mantenerse sentado haciendo tareas.", "Durante los deberes pueden introducir pausas breves de movimiento cada 10-15 minutos (saltar, estirarse, llevar algo a otra habitación). Suele ayudar a retomar la tarea con más atención.", ["deberes", "pausas", "atención"]],
];

const SEGUIMIENTO: Base[] = [
  ["Resumen breve de la sesión", "Después de una sesión habitual para informar de lo trabajado.", "Hoy hemos trabajado actividades de [área trabajada]. Ha participado con interés y hemos observado [observación]. En la próxima sesión continuaremos con esta línea de trabajo.", ["resumen", "sesión", "informe"]],
  ["Sesión con buena participación", "Cuando el niño ha estado especialmente implicado en la sesión.", "Queríamos contarles que hoy ha tenido una sesión muy positiva: ha participado con entusiasmo en todas las actividades propuestas. ¡Gracias por acompañarle en este proceso!", ["participación", "positiva", "motivación"]],
  ["Sesión con dificultades puntuales", "Cuando el niño ha estado cansado, inquieto o con menos disposición.", "Hoy la sesión ha sido algo más difícil; le hemos notado más cansado de lo habitual. Es algo normal y forma parte del proceso. Ajustamos las actividades y retomaremos en la próxima sesión.", ["dificultad", "cansancio", "ajuste"]],
  ["Recordatorio de la próxima sesión", "Para confirmar fecha y hora de la siguiente cita.", "Les recordamos que la próxima sesión será el [día] a las [hora]. Si necesitan cambiarla, por favor avísennos con antelación. ¡Gracias!", ["recordatorio", "cita", "horario"]],
  ["Material para traer a la próxima sesión", "Cuando se necesita que la familia aporte algún objeto.", "Para la próxima sesión les pedimos que, si es posible, traigan [material]. Lo utilizaremos para trabajar actividades relacionadas con su vida diaria.", ["material", "preparación", "próxima sesión"]],
  ["Agradecimiento por la colaboración", "Cuando la familia ha aplicado recomendaciones en casa.", "Queremos agradecerles su colaboración con las actividades en casa. Se nota su implicación y es de gran ayuda para dar continuidad al trabajo de las sesiones.", ["agradecimiento", "familia", "colaboración"]],
  ["Cambio de objetivos de trabajo", "Cuando se ajustan las metas tras observar el progreso.", "A partir de las próximas sesiones empezaremos a trabajar también [nuevo objetivo], ya que hemos observado avances en los objetivos anteriores. Si tienen cualquier duda, estaremos encantados de comentarlo.", ["objetivos", "planificación", "cambio"]],
  ["Solicitud de información a la familia", "Cuando se quiere conocer cómo se desenvuelve el niño en casa.", "Nos ayudaría mucho saber cómo se desenvuelve en casa con [actividad o rutina]. Cualquier observación que quieran compartir nos permitirá ajustar mejor las sesiones.", ["información", "observación", "casa"]],
  ["Aviso de sesión cancelada", "Cuando la sesión no puede realizarse en la fecha prevista.", "Lamentamos informarles de que la sesión del [día] no podrá realizarse. Les propondremos una nueva fecha lo antes posible. Disculpen las molestias.", ["cancelación", "aviso", "cita"]],
  ["Propuesta de reunión con la familia", "Cuando se quiere revisar la evolución con más detalle.", "Nos gustaría proponerles un breve encuentro para comentar la evolución y resolver dudas. ¿Qué día y horario les vendría mejor en las próximas semanas?", ["reunión", "evolución", "familia"]],
];

const DUDAS: Base[] = [
  ["¿Cuánto tiempo durará la terapia?", "Cuando la familia pregunta por la duración del proceso.", "Cada niño tiene su propio ritmo, por lo que no es posible fijar una duración exacta. Revisaremos los objetivos periódicamente y les iremos informando de la evolución para valorar juntos los siguientes pasos.", ["duración", "tiempo", "proceso"]],
  ["¿Qué es la terapia ocupacional infantil?", "Cuando la familia desea entender en qué consiste la intervención.", "La terapia ocupacional infantil busca favorecer la participación del niño en sus actividades diarias, como jugar, aprender o vestirse, trabajando habilidades motoras, sensoriales y de autonomía a través del juego.", ["terapia ocupacional", "definición", "qué es"]],
  ["¿Por qué trabajamos jugando?", "Cuando la familia pregunta por el uso del juego en sesión.", "El juego es la ocupación principal de la infancia. A través de él, los niños practican habilidades de forma motivadora y significativa, lo que favorece que las incorporen a su día a día.", ["juego", "metodología", "motivación"]],
  ["¿Qué podemos hacer en casa?", "Cuando la familia quiere participar activamente en el proceso.", "Su participación es muy valiosa. Les iremos proponiendo actividades sencillas adaptadas a lo que trabajamos en sesión. Lo más importante es integrarlas en las rutinas sin convertirlas en una obligación.", ["casa", "participación", "actividades"]],
  ["¿Es normal que avance a distinto ritmo?", "Cuando la familia se preocupa por la velocidad del progreso.", "Sí, es completamente normal. El desarrollo no es lineal y puede haber periodos de avances rápidos y otros de consolidación. Seguiremos observando y ajustando las actividades a sus necesidades.", ["ritmo", "progreso", "preocupación"]],
  ["¿Puedo asistir a la sesión?", "Cuando la familia pregunta si puede estar presente.", "En algunas sesiones puede ser útil que estén presentes, y en otras conviene que el niño trabaje con más independencia. Lo valoraremos juntos según los objetivos de cada momento.", ["asistir", "presencia", "sesión"]],
  ["¿Qué hago si no quiere hacer las actividades en casa?", "Cuando el niño rechaza las propuestas en el hogar.", "Es habitual que a veces no quiera. Les sugerimos no forzar, proponer la actividad como un juego breve y en un momento en que esté tranquilo. También podemos buscar juntos alternativas que le motiven más.", ["rechazo", "casa", "motivación"]],
  ["¿Cómo sabré si está mejorando?", "Cuando la familia quiere conocer cómo se valora la evolución.", "Iremos compartiendo con ustedes las observaciones de las sesiones y los avances en los objetivos planteados. Sus observaciones en casa también son muy importantes para tener una visión completa.", ["evolución", "valoración", "seguimiento"]],
  ["¿Hay que coordinarse con el colegio?", "Cuando la familia pregunta por la relación con el entorno escolar.", "La coordinación con el colegio puede ser muy beneficiosa para dar coherencia a las estrategias. Si están de acuerdo, podemos valorar la mejor forma de compartir información con el equipo educativo.", ["colegio", "coordinación", "escuela"]],
  ["¿Qué pasa si falta a alguna sesión?", "Cuando la familia se preocupa por ausencias puntuales.", "Una ausencia puntual no supone un problema para el proceso. Retomaremos el trabajo en la siguiente sesión. Si prevén varias ausencias, avísennos para organizarnos mejor.", ["ausencia", "faltas", "sesión"]],
];

function crear(cat: CategoriaGuiaId, lista: Base[]): RecursoComunicacion[] {
  return lista.map(([titulo, situacion, mensaje, keywords], i) => ({
    id: `gc-${cat}-${String(i + 1).padStart(2, "0")}`,
    titulo,
    categoria: cat,
    situacion,
    mensaje,
    keywords,
    tipo: "guia-comunicacion",
  }));
}

export const RECURSOS_COMUNICACION: RecursoComunicacion[] = [
  ...crear("avances", AVANCES),
  ...crear("casa", CASA),
  ...crear("seguimiento", SEGUIMIENTO),
  ...crear("dudas", DUDAS),
];

export const MAPA_RECURSOS = new Map(RECURSOS_COMUNICACION.map((r) => [r.id, r]));
export const MAPA_CATEGORIAS_GUIA = Object.fromEntries(CATEGORIAS_GUIA.map((c) => [c.id, c])) as Record<CategoriaGuiaId, CategoriaGuia>;
