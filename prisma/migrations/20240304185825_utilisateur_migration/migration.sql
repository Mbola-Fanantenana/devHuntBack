-- CreateTable
CREATE TABLE "Utilisateur" (
    "idUtilisateur" SERIAL NOT NULL,
    "pseudoUtilisateur" TEXT NOT NULL,
    "emailUtilisateur" TEXT NOT NULL,
    "mdpUtilisateur" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("idUtilisateur")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_pseudoUtilisateur_key" ON "Utilisateur"("pseudoUtilisateur");
