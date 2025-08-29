import { faker } from '@faker-js/faker';
import { Category, PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { REAL_SHOWS } from './seed_data';

const prisma = new PrismaClient();

// Configurar Supabase (reemplaza con tus credenciales)
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

// Function to process shows in batches to avoid connection pool exhaustion
async function processShowsInBatches<T>(
    items: T[],
    batchSize: number,
    processor: (batch: T[]) => Promise<void>
): Promise<void> {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        console.log(
            `Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(items.length / batchSize)}`
        );
        await processor(batch);
        // Add a small delay between batches to reduce connection pressure
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
}

// Function to create a delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para subir imagen a Supabase con reintentos infinitos
async function uploadImageToSupabase(fileName: string): Promise<string> {
    let attempt = 0;

    while (true) {
        attempt++;
        try {
            // Generar una nueva URL en cada intento para mayor variedad
            const imageUrl = faker.image.url();
            console.log(`Attempt ${attempt} - Downloading image: ${imageUrl}`);

            // Descargar la imagen
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            console.log(`Uploading ${fileName} (${buffer.length} bytes)`);

            // Subir a Supabase Storage
            const { error } = await supabase.storage
                .from('idilio') // Nombre del bucket correcto
                .upload(`shows/${fileName}`, buffer, {
                    contentType: 'image/jpeg',
                    upsert: true,
                });

            if (error) {
                throw new Error(`Supabase upload error: ${error.message}`);
            }

            // Obtener URL pública
            const {
                data: { publicUrl },
            } = supabase.storage.from('idilio').getPublicUrl(`shows/${fileName}`);

            console.log(`   Uploaded successfully on attempt ${attempt}: ${publicUrl}`);
            return publicUrl;
        } catch (error) {
            console.error(` Attempt ${attempt} failed for ${fileName}:`, error);
            console.log(`  ⏳ Retrying in 2 seconds...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
}

// Generar nombre de episodio basado en la categoría del show
function generateEpisodeName(category: Category): string {
    const templates = {
        [Category.DRAMA]: [
            'The {adjective} {noun}',
            '{adjective} Decisions',
            'Breaking {noun}',
            'The Last {noun}',
            '{adjective} Truth',
            'Past {plural_noun}',
            'New {plural_noun}',
            'The {adjective} Way',
        ],
        [Category.COMEDY]: [
            'The One with the {noun}',
            '{adjective} {noun}',
            '{noun} Problems',
            'The {adjective} {noun}',
            '{adjective} Times',
            'Office {plural_noun}',
            'The {noun} Episode',
            '{adjective} Days',
        ],
        [Category.SCI_FI]: [
            'The {adjective} {noun}',
            '{noun} Protocol',
            'Quantum {plural_noun}',
            'The {adjective} Dimension',
            'Neural {plural_noun}',
            'Digital {noun}',
            'The {adjective} Algorithm',
            'Virtual {plural_noun}',
        ],
        [Category.FANTASY]: [
            'The {adjective} {noun}',
            'Realm of {plural_noun}',
            'The {adjective} Crown',
            'Ancient {plural_noun}',
            'The {adjective} Prophecy',
            'Magic {plural_noun}',
            'The {noun} Wars',
            'Mystic {plural_noun}',
        ],
        [Category.HORROR]: [
            'The {adjective} {noun}',
            'Night of the {noun}',
            'Blood {plural_noun}',
            'The {adjective} Dead',
            'Dark {plural_noun}',
            'The {noun} Hunt',
            'Evil {plural_noun}',
            'The {adjective} Terror',
        ],
        [Category.ACTION]: [
            'The {adjective} {noun}',
            'Operation {noun}',
            'The {adjective} Strike',
            'Final {plural_noun}',
            'The {noun} Protocol',
            'Combat {plural_noun}',
            'The {adjective} Mission',
            'Tactical {plural_noun}',
        ],
        [Category.ROMANCE]: [
            'The {adjective} {noun}',
            '{adjective} Hearts',
            'Love {plural_noun}',
            'The {adjective} Kiss',
            '{adjective} Feelings',
            'Sweet {plural_noun}',
            'The {noun} Wedding',
            'True {plural_noun}',
        ],
    };

    const adjectives = [
        'Final',
        'Dark',
        'Lost',
        'Hidden',
        'Secret',
        'Last',
        'First',
        'Great',
        'Silent',
        'Broken',
    ];
    const nouns = [
        'Truth',
        'Secret',
        'Plan',
        'Game',
        'War',
        'Battle',
        'Journey',
        'Choice',
        'Moment',
        'Vision',
    ];
    const pluralNouns = [
        'Secrets',
        'Lies',
        'Games',
        'Wars',
        'Battles',
        'Choices',
        'Visions',
        'Dreams',
        'Memories',
        'Shadows',
    ];

    // Fallback para categorías no definidas
    const categoryTemplates = templates[category] || templates[Category.DRAMA];
    const template = faker.helpers.arrayElement(categoryTemplates) as string;

    return template
        .replace('{adjective}', faker.helpers.arrayElement(adjectives))
        .replace('{noun}', faker.helpers.arrayElement(nouns))
        .replace('{plural_noun}', faker.helpers.arrayElement(pluralNouns));
}

// Generar usuarios fake (solo IDs)
function createFakeUserIds(count: number = 100): string[] {
    return Array.from({ length: count }, () => faker.string.uuid());
}

// Seed principal
async function seed() {
    try {
        console.log('🌱 Starting seed...');
        console.log(`📡 Supabase URL: ${supabaseUrl}`);
        console.log(`🔑 Service Role Key: ${supabaseKey ? '✅ Present' : '❌ Missing'}`);

        // Test bucket access
        console.log('🔍 Testing bucket access...');
        const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
        if (bucketError) {
            console.error('❌ Error accessing storage:', bucketError);
            throw bucketError;
        }
        console.log(
            '📦 Available buckets:',
            buckets?.map((b) => b.name)
        );

        const showImagesBucket = buckets?.find((b) => b.name === 'idilio');
        if (!showImagesBucket) {
            console.error('❌ idilio bucket not found!');
            throw new Error("Bucket 'idilio' does not exist");
        }
        console.log('✅ idilio bucket found and accessible');

        // Limpiar datos existentes
        console.log('🧹 Cleaning existing data...');
        await prisma.episodeRating.deleteMany();
        await prisma.showRating.deleteMany();
        await prisma.userLikeShows.deleteMany();
        await prisma.episode.deleteMany();
        await prisma.showImage.deleteMany();
        await prisma.show.deleteMany();

        // Generar usuarios fake
        console.log(' Creating fake users...');
        const userIds = createFakeUserIds(100);

        // Procesar shows secuencialmente para evitar agotar el pool de conexiones
        console.log(`Processing ${50} shows sequentially...`);

        for (let i = 0; i < 50; i++) {
            const showData = REAL_SHOWS[i];
            console.log(`📺 Processing show: ${showData.name} (${i + 1}/${50})`);

            try {
                // Crear el show
                const show = await prisma.show.create({
                    data: {
                        name: showData.name,
                        year_released: showData.year_released,
                        description: showData.description,
                        num_seasons: showData.seasons,
                        category: showData.category,
                    },
                });

                // Generar y subir imágenes
                console.log(`🖼️  Generating images for ${show.name}...`);
                const fileName = `${show.id}-poster.jpg`;

                const images_for_show = [];
                for (let images_per_show = 0; images_per_show < 3; images_per_show++) {
                    const supabaseUrl = await uploadImageToSupabase(fileName);
                    images_for_show.push(supabaseUrl);
                }

                // Crear imágenes en lotes más pequeños
                const imageData = images_for_show.map((image) => ({
                    show_id: show.id,
                    url: image,
                }));

                await prisma.showImage.createMany({
                    data: imageData,
                });

                // Crear episodios secuencialmente por temporada
                console.log(` Creating episodes for ${show.name}...`);
                for (const seasonData of showData.episodes) {
                    const episodeData = Array.from(
                        { length: seasonData.count },
                        (_, episodeIndex) => ({
                            show_id: show.id,
                            name: generateEpisodeName(showData.category),
                            num_episode: episodeIndex + 1,
                            num_season: seasonData.season,
                            description: faker.lorem.paragraph({ min: 1, max: 3 }),
                            duration: faker.number.int({
                                min: seasonData.avgDuration - 10,
                                max: seasonData.avgDuration + 10,
                            }),
                        })
                    );

                    // Crear episodios en lotes de 10
                    await processShowsInBatches(episodeData, 10, async (batch) => {
                        await prisma.episode.createMany({ data: batch });
                    });
                }

                // Crear ratings en lotes
                console.log(` Creating ratings for ${show.name}...`);
                const ratingsCount = faker.number.int({ min: 50, max: 200 });

                // Usar Set para evitar duplicados
                const uniqueRatings = new Set<string>();
                const ratingData = [];

                while (ratingData.length < ratingsCount && uniqueRatings.size < userIds.length) {
                    const userId = faker.helpers.arrayElement(userIds);
                    const ratingKey = `${userId}-${show.id}`;

                    if (!uniqueRatings.has(ratingKey)) {
                        uniqueRatings.add(ratingKey);
                        ratingData.push({
                            user_id: userId,
                            show_id: show.id,
                            score: faker.number.int({ min: 1, max: 10 }),
                            review: faker.helpers.maybe(() => faker.lorem.paragraph(), {
                                probability: 0.3,
                            }),
                        });
                    }
                }

                // Procesar ratings en lotes de 25
                await processShowsInBatches(ratingData, 25, async (batch) => {
                    for (const rating of batch) {
                        try {
                            await prisma.showRating.create({ data: rating });
                        } catch (error) {
                            console.log(error);
                            // Ignorar duplicados silenciosamente
                        }
                    }
                });

                // Crear likes en lotes
                console.log(`️  Creating likes for ${show.name}...`);
                const likesCount = faker.number.int({ min: 20, max: 100 });

                // Usar Set para evitar duplicados
                const uniqueLikes = new Set<string>();
                const likeData = [];

                while (likeData.length < likesCount && uniqueLikes.size < userIds.length) {
                    const userId = faker.helpers.arrayElement(userIds);
                    const likeKey = `${userId}-${show.id}`;

                    if (!uniqueLikes.has(likeKey)) {
                        uniqueLikes.add(likeKey);
                        likeData.push({
                            user_id: userId,
                            show_id: show.id,
                        });
                    }
                }

                // Procesar likes en lotes de 25
                await processShowsInBatches(likeData, 25, async (batch) => {
                    for (const like of batch) {
                        try {
                            await prisma.userLikeShows.create({ data: like });
                        } catch (error) {
                            console.log(error);
                            // Ignorar duplicados silenciosamente
                        }
                    }
                });

                console.log(`✅ Completed ${show.name}`);

                // Pequeña pausa entre shows para dar tiempo al pool de conexiones
                await delay(200);
            } catch (error) {
                console.error(` Error processing show ${showData.name}:`, error);
                // Continuar con el siguiente show en lugar de fallar completamente
                continue;
            }
        }

        console.log('🎉 Seed completed successfully!');
    } catch (error) {
        console.error(' Seed failed:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Ejecutar seed
seed();
