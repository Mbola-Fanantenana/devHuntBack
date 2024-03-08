/*
  Warnings:

  - A unique constraint covering the columns `[matriculeUtilisateur]` on the table `Utilisateur` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "adresseUtilisateur" TEXT,
ADD COLUMN     "imgUtilisateur" TEXT,
ADD COLUMN     "matriculeUtilisateur" TEXT,
ADD COLUMN     "niveauUtilisateur" TEXT,
ADD COLUMN     "nomUtilisateur" TEXT,
ADD COLUMN     "prenomUtilisateur" TEXT,
ADD COLUMN     "telUtilisateur" TEXT,
ALTER COLUMN "pseudoUtilisateur" DROP NOT NULL,
ALTER COLUMN "emailUtilisateur" DROP NOT NULL,
ALTER COLUMN "mdpUtilisateur" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Entraide" (
    "idEntraide" SERIAL NOT NULL,
    "logoEntraide" TEXT,
    "chefEntraide" TEXT,
    "detailEntraide" TEXT,
    "lienEntraide" TEXT,
    "nomEntraide" TEXT,

    CONSTRAINT "Entraide_pkey" PRIMARY KEY ("idEntraide")
);

-- CreateTable
CREATE TABLE "Info" (
    "idInfo" SERIAL NOT NULL,
    "contenueInfo" TEXT NOT NULL,
    "dateInfo" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "heureInfo" TEXT,
    "imgInfo" TEXT,
    "idUtilisateur" INTEGER NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("idInfo")
);

-- CreateTable
CREATE TABLE "Forum" (
    "idForum" SERIAL NOT NULL,
    "contenuForum" TEXT,
    "dateForum" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "heureForum" TEXT,
    "idUtilisateur" INTEGER NOT NULL,
    "imgForum" TEXT,
    "titre" TEXT,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("idForum")
);

-- CreateTable
CREATE TABLE "Comment" (
    "idCom" SERIAL NOT NULL,
    "idForum" INTEGER NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "contenu" TEXT NOT NULL,
    "dateCom" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "heureCom" TEXT NOT NULL,
    "imgCom" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("idCom")
);

-- CreateTable
CREATE TABLE "Message" (
    "idMessage" SERIAL NOT NULL,
    "contenuMessage" TEXT,
    "emetteurMessageId" INTEGER NOT NULL,
    "recepteurMessageId" INTEGER NOT NULL,
    "dateEnvoi" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "heureMessage" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("idMessage")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entraide_nomEntraide_key" ON "Entraide"("nomEntraide");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_matriculeUtilisateur_key" ON "Utilisateur"("matriculeUtilisateur");

-- AddForeignKey
ALTER TABLE "Info" ADD CONSTRAINT "Info_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_idForum_fkey" FOREIGN KEY ("idForum") REFERENCES "Forum"("idForum") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_emetteurMessageId_fkey" FOREIGN KEY ("emetteurMessageId") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recepteurMessageId_fkey" FOREIGN KEY ("recepteurMessageId") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE RESTRICT ON UPDATE CASCADE;
