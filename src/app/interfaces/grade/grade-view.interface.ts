export interface IGradeView {
  id?: number;
  academicYear?: string;
  term?: number;
  cycle?: number;
  studentId?: number;
  studentUserId?: number;
  studentNumber?: string;
  studentLname?: string;
  studentFname?: string;
  studentEmail?: string;
  instructorId?: number;
  instructorUserId?: number;
  instructorNumber?: string;
  instructorFname?: string;
  instructorLname?: string;
  instructorEmail?: string;
  assessmentId?: number;
  myClassId?: number;
  programSopiId?: number;
  sopi?: string;
  programCourseId?: number;
  course?: string;
  grade?: number;
}
