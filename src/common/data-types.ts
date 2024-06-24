interface IStudent {
    Id: number

    FirstName: string
    SecondName: string | null
    LastName: string

    AlbumNo: number
    Departpemnt: string
    DegreeOfStudy: number
}

interface IGrade {
    StudyAverage: number
    Thesis: number
    Exam: number | null
}

interface ISubject {
    Id: number
    Name: string
}

interface IQuestion {
    Id: number
    SubjectId: number
    Question: string

    Answers(): IAnswer[]
}

interface IAnswer {
    Id: number
    QuestionId: number
    Answer: string
}