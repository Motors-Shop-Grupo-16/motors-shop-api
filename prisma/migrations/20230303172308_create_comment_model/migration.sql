-- CreateTable
CREATE TABLE "coments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "announcementId" TEXT,
    "userId" TEXT,

    CONSTRAINT "coments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coments" ADD CONSTRAINT "coments_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coments" ADD CONSTRAINT "coments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
