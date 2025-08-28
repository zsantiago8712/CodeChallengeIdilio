import { faker } from "@faker-js/faker";
import { PrismaClient, Category } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();

// Configurar Supabase (reemplaza con tus credenciales)
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Shows reales con datos completos (50+ shows)
const REAL_SHOWS = [
  {
    name: "Breaking Bad",
    description:
      "Un profesor de química se convierte en fabricante de metanfetaminas tras ser diagnosticado con cáncer.",
    category: Category.DRAMA,
    seasons: 5,
    episodes: [
      { season: 1, count: 7, avgDuration: 47 },
      { season: 2, count: 13, avgDuration: 47 },
      { season: 3, count: 13, avgDuration: 47 },
      { season: 4, count: 13, avgDuration: 47 },
      { season: 5, count: 16, avgDuration: 47 },
    ],
  },
  {
    name: "Game of Thrones",
    description:
      "Múltiples familias nobles luchan por el control del Trono de Hierro en los Siete Reinos de Westeros.",
    category: Category.FANTASY,
    seasons: 8,
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
    name: "The Office",
    description:
      "Una comedia que sigue la vida diaria de los empleados de una oficina en Scranton, Pennsylvania.",
    category: Category.COMEDY,
    seasons: 9,
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
    name: "Stranger Things",
    description:
      "Un grupo de niños en los años 80 descubre experimentos gubernamentales sobrenaturales en su pequeña ciudad.",
    category: Category.SCI_FI,
    seasons: 4,
    episodes: [
      { season: 1, count: 8, avgDuration: 51 },
      { season: 2, count: 9, avgDuration: 56 },
      { season: 3, count: 8, avgDuration: 58 },
      { season: 4, count: 9, avgDuration: 78 },
    ],
  },
  {
    name: "The Walking Dead",
    description:
      "Sobrevivientes de un apocalipsis zombi luchan por mantenerse con vida en un mundo post-apocalíptico.",
    category: Category.HORROR,
    seasons: 11,
    episodes: Array.from({ length: 11 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 12, max: 24 }),
      avgDuration: faker.number.int({ min: 42, max: 65 }),
    })),
  },
  {
    name: "Friends",
    description:
      "Seis amigos navegan por la vida, el amor y las carreras en Nueva York durante los años 90.",
    category: Category.COMEDY,
    seasons: 10,
    episodes: Array.from({ length: 10 }, (_, i) => ({
      season: i + 1,
      count: i < 9 ? 24 : 18,
      avgDuration: 22,
    })),
  },
  // Más shows para llegar a 50+
  {
    name: "The Sopranos",
    description:
      "Un jefe de la mafia de Nueva Jersey equilibra los problemas familiares con dirigir una organización criminal.",
    category: Category.DRAMA,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 12, max: 15 }),
      avgDuration: faker.number.int({ min: 50, max: 60 }),
    })),
  },
  {
    name: "The Wire",
    description:
      "Una mirada profunda al tráfico de drogas en Baltimore a través de los ojos de traficantes y policías.",
    category: Category.DRAMA,
    seasons: 5,
    episodes: Array.from({ length: 5 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 10, max: 13 }),
      avgDuration: faker.number.int({ min: 55, max: 65 }),
    })),
  },
  {
    name: "Lost",
    description:
      "Los sobrevivientes de un accidente aéreo están varados en una isla misteriosa.",
    category: Category.SCI_FI,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 14, max: 25 }),
      avgDuration: faker.number.int({ min: 42, max: 48 }),
    })),
  },
  {
    name: "Mad Men",
    description:
      "La vida de los ejecutivos publicitarios en Madison Avenue durante los años 60.",
    category: Category.DRAMA,
    seasons: 7,
    episodes: Array.from({ length: 7 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 12, max: 14 }),
      avgDuration: faker.number.int({ min: 45, max: 50 }),
    })),
  },
  // Shows adicionales para llegar a 50+
  {
    name: "House of Cards",
    description:
      "Un político ambicioso manipula su camino al poder en Washington D.C.",
    category: Category.DRAMA,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: 13,
      avgDuration: 50,
    })),
  },
  {
    name: "Black Mirror",
    description:
      "Antología que explora los aspectos más oscuros de la tecnología moderna.",
    category: Category.SCI_FI,
    seasons: 5,
    episodes: Array.from({ length: 5 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 3, max: 6 }),
      avgDuration: 60,
    })),
  },
  {
    name: "Westworld",
    description:
      "Androides conscientes en un parque temático del viejo oeste futurista.",
    category: Category.SCI_FI,
    seasons: 4,
    episodes: Array.from({ length: 4 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 8, max: 10 }),
      avgDuration: 58,
    })),
  },
  {
    name: "True Detective",
    description: "Antología criminal que sigue diferentes casos de detectives.",
    category: Category.DRAMA,
    seasons: 3,
    episodes: Array.from({ length: 3 }, (_, i) => ({
      season: i + 1,
      count: 8,
      avgDuration: 55,
    })),
  },
  {
    name: "Sherlock",
    description:
      "Una adaptación moderna del detective Sherlock Holmes en Londres contemporáneo.",
    category: Category.DRAMA,
    seasons: 4,
    episodes: Array.from({ length: 4 }, (_, i) => ({
      season: i + 1,
      count: i < 3 ? 3 : 1,
      avgDuration: 90,
    })),
  },
  {
    name: "The Crown",
    description:
      "La vida de la Reina Isabel II desde los años 40 hasta la actualidad.",
    category: Category.DRAMA,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: 10,
      avgDuration: 58,
    })),
  },
  {
    name: "Narcos",
    description: "La historia del narcotráfico en Colombia y México.",
    category: Category.DRAMA,
    seasons: 3,
    episodes: Array.from({ length: 3 }, (_, i) => ({
      season: i + 1,
      count: 10,
      avgDuration: 50,
    })),
  },
  {
    name: "Better Call Saul",
    description:
      "La precuela de Breaking Bad que sigue la transformación de Jimmy McGill en Saul Goodman.",
    category: Category.DRAMA,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 10, max: 13 }),
      avgDuration: 47,
    })),
  },
  {
    name: "The Mandalorian",
    description:
      "Un cazarrecompensas mandaloriano navega por la galaxia exterior después de la caída del Imperio.",
    category: Category.SCI_FI,
    seasons: 3,
    episodes: Array.from({ length: 3 }, (_, i) => ({
      season: i + 1,
      count: 8,
      avgDuration: 40,
    })),
  },
  {
    name: "Peaky Blinders",
    description:
      "Una familia criminal de Birmingham en la Inglaterra post-Primera Guerra Mundial.",
    category: Category.DRAMA,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: 6,
      avgDuration: 58,
    })),
  },
  {
    name: "The Witcher",
    description:
      "Un cazador de monstruos navega por un mundo lleno de criaturas peligrosas y política.",
    category: Category.FANTASY,
    seasons: 3,
    episodes: Array.from({ length: 3 }, (_, i) => ({
      season: i + 1,
      count: 8,
      avgDuration: 60,
    })),
  },
  {
    name: "Vikings",
    description:
      "Las aventuras legendarias del guerrero vikingo Ragnar Lothbrok.",
    category: Category.ACTION,
    seasons: 6,
    episodes: Array.from({ length: 6 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 10, max: 20 }),
      avgDuration: 44,
    })),
  },
  {
    name: "Ozark",
    description:
      "Un asesor financiero se ve obligado a lavar dinero para un cartel mexicano.",
    category: Category.DRAMA,
    seasons: 4,
    episodes: Array.from({ length: 4 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 10, max: 14 }),
      avgDuration: 60,
    })),
  },
  {
    name: "Money Heist",
    description:
      "Un grupo de ladrones planea el mayor atraco de la historia en la Casa de la Moneda española.",
    category: Category.ACTION,
    seasons: 5,
    episodes: Array.from({ length: 5 }, (_, i) => ({
      season: i + 1,
      count: faker.number.int({ min: 8, max: 15 }),
      avgDuration: 70,
    })),
  },
];

// Función para subir imagen a Supabase con reintentos infinitos
async function uploadImageToSupabase(fileName: string): Promise<string> {
  let attempt = 0;

  while (true) {
    attempt++;
    try {
      // Generar una nueva URL en cada intento para mayor variedad
      const imageUrl = faker.image.url();
      console.log(`  📥 Attempt ${attempt} - Downloading image: ${imageUrl}`);

      // Descargar la imagen
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`,
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      console.log(`  📤 Uploading ${fileName} (${buffer.length} bytes)`);

      // Subir a Supabase Storage
      const { error } = await supabase.storage
        .from("idilio") // Nombre del bucket correcto
        .upload(`shows/${fileName}`, buffer, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (error) {
        throw new Error(`Supabase upload error: ${error.message}`);
      }

      // Obtener URL pública
      const {
        data: { publicUrl },
      } = supabase.storage.from("idilio").getPublicUrl(`shows/${fileName}`);

      console.log(
        `  ✅ Uploaded successfully on attempt ${attempt}: ${publicUrl}`,
      );
      return publicUrl;
    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed for ${fileName}:`, error);
      console.log(`  ⏳ Retrying in 2 seconds...`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// Generar nombre de episodio basado en la categoría del show
function generateEpisodeName(category: Category): string {
  const templates = {
    [Category.DRAMA]: [
      "The {adjective} {noun}",
      "{adjective} Decisions",
      "Breaking {noun}",
      "The Last {noun}",
      "{adjective} Truth",
      "Past {plural_noun}",
      "New {plural_noun}",
      "The {adjective} Way",
    ],
    [Category.COMEDY]: [
      "The One with the {noun}",
      "{adjective} {noun}",
      "{noun} Problems",
      "The {adjective} {noun}",
      "{adjective} Times",
      "Office {plural_noun}",
      "The {noun} Episode",
      "{adjective} Days",
    ],
    [Category.SCI_FI]: [
      "The {adjective} {noun}",
      "{noun} Protocol",
      "Quantum {plural_noun}",
      "The {adjective} Dimension",
      "Neural {plural_noun}",
      "Digital {noun}",
      "The {adjective} Algorithm",
      "Virtual {plural_noun}",
    ],
    [Category.FANTASY]: [
      "The {adjective} {noun}",
      "Realm of {plural_noun}",
      "The {adjective} Crown",
      "Ancient {plural_noun}",
      "The {adjective} Prophecy",
      "Magic {plural_noun}",
      "The {noun} Wars",
      "Mystic {plural_noun}",
    ],
    [Category.HORROR]: [
      "The {adjective} {noun}",
      "Night of the {noun}",
      "Blood {plural_noun}",
      "The {adjective} Dead",
      "Dark {plural_noun}",
      "The {noun} Hunt",
      "Evil {plural_noun}",
      "The {adjective} Terror",
    ],
    [Category.ACTION]: [
      "The {adjective} {noun}",
      "Operation {noun}",
      "The {adjective} Strike",
      "Final {plural_noun}",
      "The {noun} Protocol",
      "Combat {plural_noun}",
      "The {adjective} Mission",
      "Tactical {plural_noun}",
    ],
    [Category.ROMANCE]: [
      "The {adjective} {noun}",
      "{adjective} Hearts",
      "Love {plural_noun}",
      "The {adjective} Kiss",
      "{adjective} Feelings",
      "Sweet {plural_noun}",
      "The {noun} Wedding",
      "True {plural_noun}",
    ],
  };

  const adjectives = [
    "Final",
    "Dark",
    "Lost",
    "Hidden",
    "Secret",
    "Last",
    "First",
    "Great",
    "Silent",
    "Broken",
  ];
  const nouns = [
    "Truth",
    "Secret",
    "Plan",
    "Game",
    "War",
    "Battle",
    "Journey",
    "Choice",
    "Moment",
    "Vision",
  ];
  const pluralNouns = [
    "Secrets",
    "Lies",
    "Games",
    "Wars",
    "Battles",
    "Choices",
    "Visions",
    "Dreams",
    "Memories",
    "Shadows",
  ];

  // Fallback para categorías no definidas
  const categoryTemplates = templates[category] || templates[Category.DRAMA];
  const template = faker.helpers.arrayElement(categoryTemplates) as string;

  return template
    .replace("{adjective}", faker.helpers.arrayElement(adjectives))
    .replace("{noun}", faker.helpers.arrayElement(nouns))
    .replace("{plural_noun}", faker.helpers.arrayElement(pluralNouns));
}

// Generar usuarios fake (solo IDs)
function createFakeUserIds(count: number = 100): string[] {
  return Array.from({ length: count }, () => faker.string.uuid());
}

// Seed principal
async function seed() {
  try {
    console.log("🌱 Starting seed...");
    console.log(`📡 Supabase URL: ${supabaseUrl}`);
    console.log(
      `🔑 Service Role Key: ${supabaseKey ? "✅ Present" : "❌ Missing"}`,
    );

    // Test bucket access
    console.log("🔍 Testing bucket access...");
    const { data: buckets, error: bucketError } =
      await supabase.storage.listBuckets();
    if (bucketError) {
      console.error("❌ Error accessing storage:", bucketError);
      throw bucketError;
    }
    console.log(
      "📦 Available buckets:",
      buckets?.map((b) => b.name),
    );

    const showImagesBucket = buckets?.find((b) => b.name === "idilio");
    if (!showImagesBucket) {
      console.error("❌ idilio bucket not found!");
      throw new Error("Bucket 'idilio' does not exist");
    }
    console.log("✅ idilio bucket found and accessible");

    // Limpiar datos existentes
    console.log("🧹 Cleaning existing data...");
    await prisma.episodeRating.deleteMany();
    await prisma.showRating.deleteMany();
    await prisma.userLikeShows.deleteMany();
    await prisma.episode.deleteMany();
    await prisma.showImage.deleteMany();
    await prisma.show.deleteMany();

    // Generar usuarios fake
    console.log("👥 Creating fake users...");
    const userIds = createFakeUserIds(100);

    // Procesar solo los primeros 5 shows
    const showsToProcess = Math.min(20, REAL_SHOWS.length);
    for (let i = 0; i < showsToProcess; i++) {
      const showData = REAL_SHOWS[i];
      console.log(
        `📺 Processing show: ${showData.name} (${i + 1}/${showsToProcess})`,
      );

      // Crear el show
      const show = await prisma.show.create({
        data: {
          name: showData.name,
          description: showData.description,
          num_seasons: showData.seasons,
          category: showData.category,
        },
      });

      // Generar y subir 1 imagen por show
      console.log(`🖼️  Generating image for ${show.name}...`);
      const fileName = `${show.id}-poster.jpg`;
      const supabaseUrl = await uploadImageToSupabase(fileName);

      await prisma.showImage.create({
        data: {
          show_id: show.id,
          url: supabaseUrl,
        },
      });

      // Crear episodios
      console.log(`🎬 Creating episodes for ${show.name}...`);
      for (const seasonData of showData.episodes) {
        const episodePromises = Array.from(
          { length: seasonData.count },
          (_, episodeIndex) => {
            return prisma.episode.create({
              data: {
                show_id: show.id,
                name: generateEpisodeName(showData.category),
                num_episode: episodeIndex + 1,
                num_season: seasonData.season,
                description: faker.lorem.paragraph({ min: 1, max: 3 }),
                duration: faker.number.int({
                  min: seasonData.avgDuration - 10,
                  max: seasonData.avgDuration + 10,
                }),
              },
            });
          },
        );

        await Promise.all(episodePromises);
      }

      // Crear ratings para el show
      console.log(`⭐ Creating ratings for ${show.name}...`);
      const showRatingPromises = Array.from(
        {
          length: faker.number.int({ min: 50, max: 200 }),
        },
        () => {
          const userId = faker.helpers.arrayElement(userIds);
          return prisma.showRating
            .create({
              data: {
                user_id: userId,
                show_id: show.id,
                score: faker.number.int({ min: 1, max: 10 }),
                review: faker.helpers.maybe(() => faker.lorem.paragraph(), {
                  probability: 0.3,
                }),
              },
            })
            .catch(() => null); // Ignorar duplicados
        },
      );

      await Promise.all(showRatingPromises);

      // Crear likes
      console.log(`❤️  Creating likes for ${show.name}...`);
      const likePromises = Array.from(
        {
          length: faker.number.int({ min: 20, max: 100 }),
        },
        () => {
          const userId = faker.helpers.arrayElement(userIds);
          return prisma.userLikeShows
            .create({
              data: {
                user_id: userId,
                show_id: show.id,
              },
            })
            .catch(() => null); // Ignorar duplicados
        },
      );

      await Promise.all(likePromises);

      console.log(`✅ Completed ${show.name}`);
    }

    console.log("🎉 Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed
seed();
