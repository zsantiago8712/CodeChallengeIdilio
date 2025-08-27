-- CreateTable
CREATE TABLE "public"."Show" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "num_temporadas" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Episode" (
    "id" TEXT NOT NULL,
    "id_show" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "num_temporada" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "duracion" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShowRating" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "resena" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShowRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EpisodeRating" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "episodio_id" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "resena" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EpisodeRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Episode" ADD CONSTRAINT "Episode_id_show_fkey" FOREIGN KEY ("id_show") REFERENCES "public"."Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShowRating" ADD CONSTRAINT "ShowRating_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "public"."Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EpisodeRating" ADD CONSTRAINT "EpisodeRating_episodio_id_fkey" FOREIGN KEY ("episodio_id") REFERENCES "public"."Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
