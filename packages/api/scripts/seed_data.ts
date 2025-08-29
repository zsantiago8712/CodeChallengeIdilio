import { Category } from '@prisma/client';

export const REAL_SHOWS = [
    {
        name: 'Breaking Bad',
        description:
            'Un profesor de química se convierte en fabricante de metanfetaminas tras ser diagnosticado con cáncer.',
        category: Category.DRAMA,
        seasons: 5,
        year_released: 2008, // Año real
        episodes: [
            { season: 1, count: 7, avgDuration: 47 },
            { season: 2, count: 13, avgDuration: 47 },
            { season: 3, count: 13, avgDuration: 47 },
            { season: 4, count: 13, avgDuration: 47 },
            { season: 5, count: 16, avgDuration: 47 },
        ],
    },
    {
        name: 'Game of Thrones',
        description:
            'Múltiples familias nobles luchan por el control del Trono de Hierro en los Siete Reinos de Westeros.',
        category: Category.FANTASY,
        seasons: 8,
        year_released: 2011, // Año real
        episodes: [
            { season: 1, count: 10, avgDuration: 56 },
            { season: 2, count: 10, avgDuration: 54 },
            { season: 3, count: 10, avgDuration: 57 },
            { season: 4, count: 10, avgDuration: 56 },
            { season: 5, count: 10, avgDuration: 59 },
            { season: 6, count: 10, avgDuration: 63 },
            { season: 7, count: 7, avgDuration: 71 },
            { season: 8, count: 6, avgDuration: 68 },
        ],
    },
    {
        name: 'The Office',
        description:
            'Una comedia que sigue la vida diaria de los empleados de una oficina en Scranton, Pennsylvania.',
        category: Category.COMEDY,
        seasons: 9,
        year_released: 2005, // Año real
        episodes: [
            { season: 1, count: 6, avgDuration: 22 },
            { season: 2, count: 22, avgDuration: 22 },
            { season: 3, count: 25, avgDuration: 22 },
            { season: 4, count: 19, avgDuration: 22 },
            { season: 5, count: 28, avgDuration: 22 },
            { season: 6, count: 26, avgDuration: 22 },
            { season: 7, count: 26, avgDuration: 22 },
            { season: 8, count: 24, avgDuration: 22 },
            { season: 9, count: 25, avgDuration: 22 },
        ],
    },
    {
        name: 'Stranger Things',
        description:
            'Un grupo de niños en los años 80 descubre experimentos gubernamentales sobrenaturales en su pequeña ciudad.',
        category: Category.SCI_FI,
        seasons: 4,
        year_released: 2016, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 51 },
            { season: 2, count: 9, avgDuration: 56 },
            { season: 3, count: 8, avgDuration: 58 },
            { season: 4, count: 9, avgDuration: 78 },
        ],
    },
    {
        name: 'The Walking Dead',
        description:
            'Sobrevivientes de un apocalipsis zombi luchan por mantenerse con vida en un mundo post-apocalíptico.',
        category: Category.HORROR,
        seasons: 11,
        year_released: 2010, // Año real
        episodes: Array.from({ length: 11 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (24 - 12 + 1)) + 12,
            avgDuration: Math.floor(Math.random() * (65 - 42 + 1)) + 42,
        })),
    },
    {
        name: 'Friends',
        description:
            'Seis amigos navegan por la vida, el amor y las carreras en Nueva York durante los años 90.',
        category: Category.COMEDY,
        seasons: 10,
        year_released: 1994, // Año real
        episodes: Array.from({ length: 10 }, (_, i) => ({
            season: i + 1,
            count: i < 9 ? 24 : 18,
            avgDuration: 22,
        })),
    },
    {
        name: 'The Sopranos',
        description:
            'Un jefe de la mafia de Nueva Jersey equilibra los problemas familiares con dirigir una organización criminal.',
        category: Category.DRAMA,
        seasons: 6,
        year_released: 1999, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (15 - 12 + 1)) + 12,
            avgDuration: Math.floor(Math.random() * (60 - 50 + 1)) + 50,
        })),
    },
    {
        name: 'The Wire',
        description:
            'Una mirada profunda al tráfico de drogas en Baltimore a través de los ojos de traficantes y policías.',
        category: Category.DRAMA,
        seasons: 5,
        year_released: 2002, // Año real
        episodes: Array.from({ length: 5 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (13 - 10 + 1)) + 10,
            avgDuration: Math.floor(Math.random() * (65 - 55 + 1)) + 55,
        })),
    },
    {
        name: 'Lost',
        description:
            'Los sobrevivientes de un accidente aéreo están varados en una isla misteriosa.',
        category: Category.SCI_FI,
        seasons: 6,
        year_released: 2004, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (25 - 14 + 1)) + 14,
            avgDuration: Math.floor(Math.random() * (48 - 42 + 1)) + 42,
        })),
    },
    {
        name: 'Mad Men',
        description:
            'La vida de los ejecutivos publicitarios en Madison Avenue durante los años 60.',
        category: Category.DRAMA,
        seasons: 7,
        year_released: 2007, // Año real
        episodes: Array.from({ length: 7 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (14 - 12 + 1)) + 12,
            avgDuration: Math.floor(Math.random() * (50 - 45 + 1)) + 45,
        })),
    },
    {
        name: 'House of Cards',
        description: 'Un político ambicioso manipula su camino al poder en Washington D.C.',
        category: Category.DRAMA,
        seasons: 6,
        year_released: 2013, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: 13,
            avgDuration: 50,
        })),
    },
    {
        name: 'Black Mirror',
        description: 'Antología que explora los aspectos más oscuros de la tecnología moderna.',
        category: Category.SCI_FI,
        seasons: 5,
        year_released: 2011, // Año real
        episodes: Array.from({ length: 5 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (6 - 3 + 1)) + 3,
            avgDuration: 60,
        })),
    },
    {
        name: 'Westworld',
        description: 'Androides conscientes en un parque temático del viejo oeste futurista.',
        category: Category.SCI_FI,
        seasons: 4,
        year_released: 2016, // Año real
        episodes: Array.from({ length: 4 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (10 - 8 + 1)) + 8,
            avgDuration: 58,
        })),
    },
    {
        name: 'True Detective',
        description: 'Antología criminal que sigue diferentes casos de detectives.',
        category: Category.DRAMA,
        seasons: 3,
        year_released: 2014, // Año real
        episodes: Array.from({ length: 3 }, (_, i) => ({
            season: i + 1,
            count: 8,
            avgDuration: 55,
        })),
    },
    {
        name: 'Sherlock',
        description:
            'Una adaptación moderna del detective Sherlock Holmes en Londres contemporáneo.',
        category: Category.DRAMA,
        seasons: 4,
        year_released: 2010, // Año real
        episodes: Array.from({ length: 4 }, (_, i) => ({
            season: i + 1,
            count: i < 3 ? 3 : 1,
            avgDuration: 90,
        })),
    },
    {
        name: 'The Crown',
        description: 'La vida de la Reina Isabel II desde los años 40 hasta la actualidad.',
        category: Category.DRAMA,
        seasons: 6,
        year_released: 2016, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: 10,
            avgDuration: 58,
        })),
    },
    {
        name: 'Narcos',
        description: 'La historia del narcotráfico en Colombia y México.',
        category: Category.DRAMA,
        seasons: 3,
        year_released: 2015, // Año real
        episodes: Array.from({ length: 3 }, (_, i) => ({
            season: i + 1,
            count: 10,
            avgDuration: 50,
        })),
    },
    {
        name: 'Better Call Saul',
        description:
            'La precuela de Breaking Bad que sigue la transformación de Jimmy McGill en Saul Goodman.',
        category: Category.DRAMA,
        seasons: 6,
        year_released: 2015, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (13 - 10 + 1)) + 10,
            avgDuration: 47,
        })),
    },
    {
        name: 'The Mandalorian',
        description:
            'Un cazarrecompensas mandaloriano navega por la galaxia exterior después de la caída del Imperio.',
        category: Category.SCI_FI,
        seasons: 3,
        year_released: 2019, // Año real
        episodes: Array.from({ length: 3 }, (_, i) => ({
            season: i + 1,
            count: 8,
            avgDuration: 40,
        })),
    },
    {
        name: 'Peaky Blinders',
        description:
            'Una familia criminal de Birmingham en la Inglaterra post-Primera Guerra Mundial.',
        category: Category.DRAMA,
        seasons: 6,
        year_released: 2013, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: 6,
            avgDuration: 58,
        })),
    },
    {
        name: 'The Witcher',
        description:
            'Un cazador de monstruos navega por un mundo lleno de criaturas peligrosas y política.',
        category: Category.FANTASY,
        seasons: 3,
        year_released: 2019, // Año real
        episodes: Array.from({ length: 3 }, (_, i) => ({
            season: i + 1,
            count: 8,
            avgDuration: 60,
        })),
    },
    {
        name: 'Vikings',
        description: 'Las aventuras legendarias del guerrero vikingo Ragnar Lothbrok.',
        category: Category.ACTION,
        seasons: 6,
        year_released: 2013, // Año real
        episodes: Array.from({ length: 6 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (20 - 10 + 1)) + 10,
            avgDuration: 44,
        })),
    },
    {
        name: 'Ozark',
        description: 'Un asesor financiero se ve obligado a lavar dinero para un cartel mexicano.',
        category: Category.DRAMA,
        seasons: 4,
        year_released: 2017, // Año real
        episodes: Array.from({ length: 4 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (14 - 10 + 1)) + 10,
            avgDuration: 60,
        })),
    },
    {
        name: 'Money Heist',
        description:
            'Un grupo de ladrones planea el mayor atraco de la historia en la Casa de la Moneda española.',
        category: Category.ACTION,
        seasons: 5,
        year_released: 2017, // Año real
        episodes: Array.from({ length: 5 }, (_, i) => ({
            season: i + 1,
            count: Math.floor(Math.random() * (15 - 8 + 1)) + 8,
            avgDuration: 70,
        })),
    },
    {
        name: 'The Simpsons',
        description: 'La vida de la familia amarilla más famosa de Springfield.',
        category: Category.COMEDY,
        seasons: 37,
        year_released: 1989, // Año real
        episodes: Array.from({ length: 37 }, (_, i) => ({
            season: i + 1,
            count: 22,
            avgDuration: 22,
        })),
    },
    {
        name: 'Law & Order: Special Victims Unit',
        description:
            'Un equipo de detectives élite de la policía de Nueva York investiga crímenes de agresión sexual, abuso infantil y violencia doméstica.',
        category: Category.DRAMA,
        seasons: 27,
        year_released: 1999, // Año real
        episodes: Array.from({ length: 27 }, (_, i) => ({
            season: i + 1,
            count: i < 26 ? 22 : 22,
            avgDuration: 43,
        })),
    },
    {
        name: 'NCIS',
        description:
            'Agentes especiales del Servicio de Investigación Criminal Naval investigan crímenes relacionados con la Marina y el Cuerpo de Marines de EE. UU.',
        category: Category.DRAMA,
        seasons: 23,
        year_released: 2003, // Año real
        episodes: Array.from({ length: 23 }, (_, i) => ({
            season: i + 1,
            count: i < 22 ? 24 : 22,
            avgDuration: 42,
        })),
    },
    {
        name: 'Wednesday',
        description:
            'Wednesday Addams asiste a la Nevermore Academy, donde intenta dominar sus habilidades psíquicas, detener una monstruosa ola de asesinatos y resolver el misterio sobrenatural que envolvió a sus padres.',
        category: Category.FANTASY,
        seasons: 2,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 50 },
            { season: 2, count: 8, avgDuration: 55 },
        ],
    },
    {
        name: 'Alien: Earth',
        description:
            'Una precuela de la franquicia Alien, ambientada en 2120, donde un grupo de soldados se enfrenta a una amenaza peligrosa en la Tierra después del aterrizaje forzoso de una nave espacial misteriosa.',
        category: Category.SCI_FI,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 8, avgDuration: 60 }],
    },
    {
        name: 'Peacemaker',
        description:
            'El violento y patriótico Peacemaker, quien cree en lograr la paz a cualquier costo, es reclutado por un equipo para misiones encubiertas.',
        category: Category.ACTION,
        seasons: 2,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 40 },
            { season: 2, count: 8, avgDuration: 45 },
        ],
    },
    {
        name: 'Severance',
        description:
            'En Lumon Industries, los empleados se someten a un procedimiento quirúrgico que separa sus recuerdos entre su vida laboral y personal.',
        category: Category.SCI_FI,
        seasons: 2,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 9, avgDuration: 50 },
            { season: 2, count: 9, avgDuration: 55 },
        ],
    },
    {
        name: 'The Diplomat',
        description:
            'Una diplomática estadounidense es nombrada embajadora en el Reino Unido y se encuentra en medio de una crisis internacional, mientras intenta salvar su matrimonio.',
        category: Category.DRAMA,
        seasons: 3,
        year_released: 2023, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 50 },
            { season: 2, count: 8, avgDuration: 50 },
            { season: 3, count: 8, avgDuration: 50 },
        ],
    },
    {
        name: 'Landman',
        description:
            'Ambientada en el mundo en auge de las compañías petroleras de West Texas, la serie sigue a un fixer que trabaja en la industria del petróleo.',
        category: Category.DRAMA,
        seasons: 2,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [
            { season: 1, count: 10, avgDuration: 60 },
            { season: 2, count: 10, avgDuration: 60 },
        ],
    },
    {
        name: 'Slow Horses',
        description:
            'Un equipo de agentes del MI5 fallidos es exiliado a una oscura oficina donde tienen que lidiar con la burocracia y las operaciones de inteligencia de bajo nivel.',
        category: Category.DRAMA,
        seasons: 5,
        year_released: 2022, // Año real
        episodes: Array.from({ length: 5 }, (_, i) => ({
            season: i + 1,
            count: 6,
            avgDuration: 45,
        })),
    },
    {
        name: 'Chief of War',
        description:
            'Una épica histórica sobre la unificación de las Islas Hawaianas desde una perspectiva indígena, siguiendo al guerrero Kaiana en su intento de unir las islas antes de la colonización occidental.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 9, avgDuration: 60 }],
    },
    {
        name: 'Outlander: Blood of My Blood',
        description:
            'Una precuela de Outlander que sigue las historias de amor de los padres de Jamie Fraser y Claire Beauchamp en el siglo XVIII en las Tierras Altas de Escocia y en la Primera Guerra Mundial en Inglaterra.',
        category: Category.ROMANCE,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 10, avgDuration: 60 }],
    },
    {
        name: 'Butterfly',
        description:
            'Un espía que huye es perseguido por un asesino después de que una elección que hizo años atrás le pasa factura.',
        category: Category.ACTION,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 6, avgDuration: 45 }],
    },
    {
        name: 'The Twisted Tale of Amanda Knox',
        description:
            'Una dramatización del caso real de Amanda Knox, explorando su condena injusta y sus secuelas, y la anatomía del sesgo.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 8, avgDuration: 60 }],
    },
    {
        name: 'Hostage',
        description:
            'La primera ministra del Reino Unido se encuentra en una situación tensa cuando su esposo es tomado como rehén, y la presidenta francesa es chantajeada, lo que las enfrenta en una lucha por sus carreras y vidas.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 6, avgDuration: 50 }],
    },
    {
        name: 'Only Murders in the Building',
        description:
            'Tres extraños con una obsesión compartida por los crímenes reales de repente se encuentran envueltos en uno propio en su exclusivo edificio de apartamentos de Nueva York.',
        category: Category.COMEDY,
        seasons: 5,
        year_released: 2021, // Año real
        episodes: Array.from({ length: 5 }, (_, i) => ({
            season: i + 1,
            count: i < 4 ? 10 : 10,
            avgDuration: 30,
        })),
    },
    {
        name: 'Percy Jackson and the Olympians',
        description:
            'Un semidiós moderno de 12 años, Percy Jackson, es acusado por el dios griego Zeus de robar su rayo maestro y debe viajar por Estados Unidos para encontrarlo y restaurar el orden en el Olimpo.',
        category: Category.FANTASY,
        seasons: 2,
        year_released: 2023, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 35 },
            { season: 2, count: 8, avgDuration: 40 },
        ],
    },
    {
        name: 'Adolescence',
        description:
            'Una miniserie que explora el impacto de la propaganda red-pill en la mente de los jóvenes, siguiendo a Jamie, de 13 años, acusado de asesinato.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 4, avgDuration: 60 }],
    },
    {
        name: 'Dying for Sex',
        description:
            'Una miniserie de ocho partes basada en un podcast que cuenta la historia de Molly Kochan, diagnosticada con cáncer de mama en etapa IV, quien decide dejar a su esposo y embarcarse en una odisea sexual.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 8, avgDuration: 30 }],
    },
    {
        name: 'Dept. Q',
        description:
            'Un brillante y malhumorado detective, Carl Morck, traumatizado por un caso anterior, es relegado a casos sin resolver y a una oficina en el sótano en Edimburgo.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 6, avgDuration: 55 }],
    },
    {
        name: 'The Pitt',
        description:
            'Un drama hospitalario ambientado durante 15 horas consecutivas en el mismo turno de sala de emergencias implacable, celebrando la competencia y la compasión del personal médico.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 15, avgDuration: 60 }],
    },
    {
        name: 'The Residence',
        description:
            'Un misterio de asesinato a puerta cerrada en la Casa Blanca durante una cena de estado, donde el ujier principal es asesinado y una detective excéntrica investiga a los ridículos testigos y sospechosos.',
        category: Category.COMEDY,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 8, avgDuration: 45 }],
    },
    {
        name: 'Murderbot',
        description:
            'Alexander Skarsgård interpreta a un droide de seguridad que solo quiere que lo dejen solo para ver sus dramas favoritos, mientras trata con gobiernos que usan los medios estatales para justificar atrocidades.',
        category: Category.SCI_FI,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 6, avgDuration: 30 }],
    },
    {
        name: 'North of North',
        description:
            'Una comedia ambientada en un pequeño pueblo inuit en Nunavut, Canadá, que sigue a una mujer inuit que deja un mal matrimonio y trata de empezar de nuevo su vida.',
        category: Category.COMEDY,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 8, avgDuration: 30 }],
    },
    {
        name: 'The Studio',
        description:
            'Una comedia de la industria del entretenimiento protagonizada por Seth Rogen como un nuevo jefe de estudio de cine que está muy por encima de su cabeza.',
        category: Category.COMEDY,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 10, avgDuration: 30 }],
    },
    {
        name: 'The Righteous Gemstones',
        description:
            'Una familia de televangelistas mundialmente famosos con una historia de desviación, codicia y trabajo de caridad.',
        category: Category.COMEDY,
        seasons: 4,
        year_released: 2019, // Año real
        episodes: Array.from({ length: 4 }, (_, i) => ({
            season: i + 1,
            count: i < 3 ? 9 : 9,
            avgDuration: 30,
        })),
    },
    {
        name: 'Platonic',
        description:
            'Una pareja de amigos que se reconecta en la mediana edad y explora las consecuencias de su renovado vínculo.',
        category: Category.COMEDY,
        seasons: 2,
        year_released: 2023, // Año real
        episodes: [
            { season: 1, count: 10, avgDuration: 30 },
            { season: 2, count: 10, avgDuration: 30 },
        ],
    },
    {
        name: 'Code of Silence',
        description:
            'Un drama criminal con una heroína sorda que es reclutada por detectives para ayudarles a descifrar un video de una banda criminal mediante la lectura de labios.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 6, avgDuration: 45 }],
    },
    {
        name: 'Eyes of Wakanda',
        description:
            'Guerreros wakandianos que, a lo largo de la historia, han viajado por el mundo para recuperar peligrosos artefactos de vibranium.',
        category: Category.SCI_FI,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 4, avgDuration: 30 }],
    },
    {
        name: 'King of the Hill',
        description:
            'Las vidas de la familia Hill y sus amigos en la ficticia ciudad de Arlen, Texas.',
        category: Category.COMEDY,
        seasons: 14,
        year_released: 1997, // Año real (original)
        episodes: Array.from({ length: 14 }, (_, i) => ({
            season: i + 1,
            count: i < 13 ? 20 : 10,
            avgDuration: 22,
        })),
    },
    {
        name: 'Upload',
        description:
            'En un futuro tecnológicamente avanzado donde los humanos pueden "subirse" a un más allá virtual de su elección, un joven muere y se encuentra en un mundo de lujo, pero con nuevos desafíos.',
        category: Category.SCI_FI,
        seasons: 4,
        year_released: 2020, // Año real
        episodes: Array.from({ length: 4 }, (_, i) => ({
            season: i + 1,
            count: i < 3 ? 10 : 8,
            avgDuration: 30,
        })),
    },
    {
        name: 'The Terminal List: Dark Wolf',
        description:
            'Una precuela de "The Terminal List" que explora los orígenes del protagonista, James Reece, antes de los eventos de la serie principal.',
        category: Category.ACTION,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 8, avgDuration: 55 }],
    },
    {
        name: 'NCIS: Tony & Ziva',
        description:
            'Un spin-off de NCIS que sigue las vidas de los personajes favoritos de los fans, Tony DiNozzo y Ziva David.',
        category: Category.DRAMA,
        seasons: 1,
        year_released: 2025, // Año estimado (se estrenará en 2025)
        episodes: [{ season: 1, count: 10, avgDuration: 42 }],
    },
    {
        name: 'Gen V',
        description:
            'Un spin-off de "The Boys" que sigue a jóvenes superhéroes mientras entrenan en una universidad para héroes operada por Vought International.',
        category: Category.ACTION,
        seasons: 2,
        year_released: 2023, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 50 },
            { season: 2, count: 8, avgDuration: 50 },
        ],
    },
    {
        name: 'The Morning Show',
        description:
            'Una mirada entre bastidores al mundo de los programas matutinos, explorando los egos, ambiciones y luchas de poder.',
        category: Category.DRAMA,
        seasons: 4,
        year_released: 2019, // Año real
        episodes: Array.from({ length: 4 }, (_, i) => ({
            season: i + 1,
            count: 10,
            avgDuration: 50,
        })),
    },
    {
        name: 'Doctor Who',
        description:
            'Las aventuras de un Señor del Tiempo que viaja por el tiempo y el espacio en su TARDIS, ayudando a las personas y luchando contra el mal.',
        category: Category.SCI_FI,
        seasons: 15, // A partir del renacimiento de 2005
        year_released: 2005, // Año real (renacimiento)
        episodes: Array.from({ length: 15 }, (_, i) => ({
            season: i + 1,
            count: i < 1 ? 13 : 10,
            avgDuration: 45,
        })),
    },
    {
        name: 'Andor',
        description:
            'Una precuela de "Rogue One" que explora el pasado del personaje Cassian Andor y su camino para convertirse en un héroe rebelde, en un período de creciente represión imperial.',
        category: Category.SCI_FI,
        seasons: 2,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 12, avgDuration: 40 },
            { season: 2, count: 12, avgDuration: 45 },
        ],
    },
    {
        name: 'The Last of Us',
        description:
            'Veinte años después de que una pandemia devastara la civilización, un superviviente endurecido es contratado para sacar de contrabando a una niña de 14 años fuera de una zona de cuarentena opresiva.',
        category: Category.HORROR,
        seasons: 2,
        year_released: 2023, // Año real
        episodes: [
            { season: 1, count: 9, avgDuration: 50 },
            { season: 2, count: 8, avgDuration: 55 },
        ],
    },
    {
        name: 'The White Lotus',
        description:
            'Sigue a los huéspedes y empleados de la cadena de resorts The White Lotus en varias de sus propiedades, ya que sus vacaciones son alteradas por sus diversas disfunciones.',
        category: Category.COMEDY,
        seasons: 3,
        year_released: 2021, // Año real
        episodes: Array.from({ length: 3 }, (_, i) => ({
            season: i + 1,
            count: 7,
            avgDuration: 60,
        })),
    },
    {
        name: 'Fallout',
        description:
            'Basado en la serie de videojuegos, la serie sigue a los supervivientes en un mundo post-apocalíptico después de una guerra nuclear.',
        category: Category.SCI_FI,
        seasons: 2,
        year_released: 2024, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 60 },
            { season: 2, count: 8, avgDuration: 60 },
        ],
    },
    {
        name: 'Emily in Paris',
        description:
            'Una ejecutiva de marketing estadounidense es contratada por una empresa de marketing de lujo en París para proporcionar una perspectiva estadounidense.',
        category: Category.COMEDY,
        seasons: 5,
        year_released: 2020, // Año real
        episodes: Array.from({ length: 5 }, (_, i) => ({
            season: i + 1,
            count: 10,
            avgDuration: 30,
        })),
    },
    {
        name: 'Ted Lasso',
        description:
            'Un entrenador de fútbol americano es contratado para entrenar a un equipo de fútbol profesional en Inglaterra, a pesar de no tener experiencia en el deporte.',
        category: Category.COMEDY,
        seasons: 3,
        year_released: 2020, // Año real
        episodes: [
            { season: 1, count: 10, avgDuration: 30 },
            { season: 2, count: 12, avgDuration: 30 },
            { season: 3, count: 12, avgDuration: 45 },
        ],
    },
    {
        name: 'Yellowstone',
        description:
            'La saga de la familia Dutton, dueña del rancho más grande de Estados Unidos, que se enfrenta a promotores de tierras, una reserva india y el primer Parque Nacional de América.',
        category: Category.DRAMA,
        seasons: 5,
        year_released: 2018, // Año real
        episodes: [
            { season: 1, count: 9, avgDuration: 60 },
            { season: 2, count: 10, avgDuration: 60 },
            { season: 3, count: 10, avgDuration: 60 },
            { season: 4, count: 10, avgDuration: 60 },
            { season: 5, count: 14, avgDuration: 60 },
        ],
    },
    {
        name: 'Succession',
        description:
            'La disfuncional familia Roy lucha por el control de su imperio mediático y de entretenimiento tras la jubilación de su patriarca.',
        category: Category.DRAMA,
        seasons: 4,
        year_released: 2018, // Año real
        episodes: [
            { season: 1, count: 10, avgDuration: 60 },
            { season: 2, count: 10, avgDuration: 60 },
            { season: 3, count: 9, avgDuration: 60 },
            { season: 4, count: 10, avgDuration: 60 },
        ],
    },
    {
        name: 'House of the Dragon',
        description:
            'Ambientada 200 años antes de los eventos de "Game of Thrones", esta serie cuenta la historia de la Casa Targaryen.',
        category: Category.FANTASY,
        seasons: 2,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 10, avgDuration: 60 },
            { season: 2, count: 8, avgDuration: 60 },
        ],
    },
    {
        name: 'The Bear',
        description:
            'Un joven chef de alta cocina regresa a Chicago para dirigir la tienda de sándwiches de su familia tras una trágica muerte.',
        category: Category.DRAMA,
        seasons: 3,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 8, avgDuration: 30 },
            { season: 2, count: 10, avgDuration: 30 },
            { season: 3, count: 10, avgDuration: 30 },
        ],
    },
    {
        name: 'Squid Game',
        description:
            'Cientos de jugadores con problemas de dinero aceptan una extraña invitación para competir en juegos infantiles mortales por una enorme recompensa en efectivo.',
        category: Category.DRAMA,
        seasons: 2,
        year_released: 2021, // Año real
        episodes: [
            { season: 1, count: 9, avgDuration: 60 },
            { season: 2, count: 6, avgDuration: 60 },
        ],
    },
    {
        name: 'Foundation',
        description:
            'Basada en la serie de libros de Isaac Asimov, la serie sigue a un grupo de exiliados en su monumental viaje para salvar a la humanidad y reconstruir la civilización en medio de la caída de un imperio galáctico.',
        category: Category.SCI_FI,
        seasons: 3,
        year_released: 2021, // Año real
        episodes: [
            { season: 1, count: 10, avgDuration: 50 },
            { season: 2, count: 10, avgDuration: 50 },
            { season: 3, count: 10, avgDuration: 50 },
        ],
    },
    {
        name: 'The Sandman',
        description:
            'Después de pasar 105 años prisionero, Sueño, la personificación del sueño, se embarca en un viaje por diferentes mundos y líneas de tiempo para restaurar su reino y recuperar sus objetos perdidos.',
        category: Category.FANTASY,
        seasons: 2,
        year_released: 2022, // Año real
        episodes: [
            { season: 1, count: 11, avgDuration: 45 },
            { season: 2, count: 8, avgDuration: 50 },
        ],
    },
];
