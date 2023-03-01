-- CreateTable
CREATE TABLE "RecoverPassword" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RecoverPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RecoverPassword_token_key" ON "RecoverPassword"("token");

-- CreateIndex
CREATE UNIQUE INDEX "RecoverPassword_userId_key" ON "RecoverPassword"("userId");

-- AddForeignKey
ALTER TABLE "RecoverPassword" ADD CONSTRAINT "RecoverPassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
