-- CreateTable
CREATE TABLE "Courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "courseCode" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Departmentcourses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseCode" TEXT NOT NULL,
    "semesterCode" TEXT NOT NULL,
    "staffId" INTEGER NOT NULL,
    "departmentCode" TEXT NOT NULL,
    "level" TEXT,
    "credit" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Departmentcourses_departmentCode_fkey" FOREIGN KEY ("departmentCode") REFERENCES "Departments" ("departmentCode") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "Departmentcourses_semesterCode_fkey" FOREIGN KEY ("semesterCode") REFERENCES "Semesters" ("semesterCode") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "Departmentcourses_courseCode_fkey" FOREIGN KEY ("courseCode") REFERENCES "Courses" ("courseCode") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "Departmentcourses_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staffs" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Departments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "departmentCode" TEXT NOT NULL,
    "facultyCode" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Departments_facultyCode_fkey" FOREIGN KEY ("facultyCode") REFERENCES "Faculties" ("code") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Faculties" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Results" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "courseRegId" INTEGER,
    "mark" INTEGER,
    "isPassed" INTEGER DEFAULT 0,
    "isRetake" INTEGER DEFAULT 0,
    "pending" INTEGER DEFAULT 1,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Results_courseRegId_fkey" FOREIGN KEY ("courseRegId") REFERENCES "StudentCourseReg" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Semesters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "semesterCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "sessionCode" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Semesters_sessionCode_fkey" FOREIGN KEY ("sessionCode") REFERENCES "Session" ("sessionCode") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sessionCode" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Staffs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',
    "email" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Staffs_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "StudentCourseReg" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matric_number" TEXT,
    "semesterId" INTEGER,
    "departmentCourseId" INTEGER,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudentCourseReg_matric_number_fkey" FOREIGN KEY ("matric_number") REFERENCES "Students" ("matric_number") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "StudentCourseReg_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Students" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matric_number" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Students_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "UserSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "token" TEXT NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STAFF',
    "emailVerified" DATETIME,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "last_updated_on" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "token" TEXT,
    "expires" DATETIME
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "token" TEXT,
    "expires" DATETIME
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_courses_1" ON "Courses"("courseCode");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_departments_1" ON "Departments"("departmentCode");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_faculties_1" ON "Faculties"("code");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_semester_1" ON "Semesters"("semesterCode");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_session_1" ON "Session"("sessionCode");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_staffs_1" ON "Staffs"("email");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_students_1" ON "Students"("matric_number");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_students_2" ON "Students"("email");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_userSession_1" ON "UserSession"("token");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_users_1" ON "Users"("email");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_verificationToken_1" ON "VerificationToken"("email");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_verificationToken_2" ON "VerificationToken"("token");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_passwordResetToken_1" ON "PasswordResetToken"("email");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_passwordResetToken_2" ON "PasswordResetToken"("token");
Pragma writable_schema=0;
