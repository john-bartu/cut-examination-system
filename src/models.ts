export interface Subject {
    num: number,
    title: string,
    classType: string,
    passType: string,
    toAvg: boolean,
    hasExam: boolean,
    hours: number,
    hasGrade: boolean,
    grades: [] | null,
    ECTS: number | string | null
}

export interface Semester {
    num: number
    year: string,
    finishDate: Date
    subjects: Subject[]
    avgGrade: number | null,
    totalECTS: number | string
}

export interface Student {
    name: string,
    albumNum: number,
    birthDate: Date,
    enrollDate: Date,
    faculty: string,
    course: string,
    specialty: string,
    specialization: string | null
}

export interface Thesis {
    subject: string,
    subjectEng: string,
    promoter: string,
    reviewers: string
}

export interface ProgressRecord {
    recordDate: Date,
    academicYear: string,
    student: Student,
    semesters: Semester[],
    thesis: Thesis,
}
