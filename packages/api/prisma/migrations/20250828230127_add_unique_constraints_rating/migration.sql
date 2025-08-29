-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('ACTION', 'COMEDY', 'DRAMA', 'FANTASY', 'HORROR', 'ROMANCE', 'SCI_FI');

-- CreateTable
CREATE TABLE "public"."Show" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "num_seasons" INTEGER NOT NULL,
    "year_released" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Episode" (
    "id" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "num_episode" INTEGER NOT NULL,
    "num_season" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShowImage" (
    "id" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShowImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ShowRating" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShowRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EpisodeRating" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "episode_id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "review" TEXT,

    CONSTRAINT "EpisodeRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserLikeShows" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "show_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLikeShows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Show_name_idx" ON "public"."Show"("name");

-- CreateIndex
CREATE INDEX "Show_category_idx" ON "public"."Show"("category");

-- CreateIndex
CREATE INDEX "Show_year_released_idx" ON "public"."Show"("year_released");

-- CreateIndex
CREATE INDEX "Episode_show_id_idx" ON "public"."Episode"("show_id");

-- CreateIndex
CREATE INDEX "Episode_num_season_num_episode_idx" ON "public"."Episode"("num_season", "num_episode");

-- CreateIndex
CREATE INDEX "ShowImage_show_id_idx" ON "public"."ShowImage"("show_id");

-- CreateIndex
CREATE INDEX "ShowRating_show_id_idx" ON "public"."ShowRating"("show_id");

-- CreateIndex
CREATE INDEX "ShowRating_user_id_show_id_idx" ON "public"."ShowRating"("user_id", "show_id");

-- CreateIndex
CREATE UNIQUE INDEX "ShowRating_user_id_show_id_key" ON "public"."ShowRating"("user_id", "show_id");

-- CreateIndex
CREATE INDEX "EpisodeRating_episode_id_idx" ON "public"."EpisodeRating"("episode_id");

-- CreateIndex
CREATE INDEX "EpisodeRating_user_id_episode_id_idx" ON "public"."EpisodeRating"("user_id", "episode_id");

-- CreateIndex
CREATE UNIQUE INDEX "EpisodeRating_user_id_episode_id_key" ON "public"."EpisodeRating"("user_id", "episode_id");

-- CreateIndex
CREATE INDEX "UserLikeShows_show_id_idx" ON "public"."UserLikeShows"("show_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserLikeShows_user_id_show_id_key" ON "public"."UserLikeShows"("user_id", "show_id");

-- AddForeignKey
ALTER TABLE "public"."Episode" ADD CONSTRAINT "Episode_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShowImage" ADD CONSTRAINT "ShowImage_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ShowRating" ADD CONSTRAINT "ShowRating_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EpisodeRating" ADD CONSTRAINT "EpisodeRating_episode_id_fkey" FOREIGN KEY ("episode_id") REFERENCES "public"."Episode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserLikeShows" ADD CONSTRAINT "UserLikeShows_show_id_fkey" FOREIGN KEY ("show_id") REFERENCES "public"."Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
