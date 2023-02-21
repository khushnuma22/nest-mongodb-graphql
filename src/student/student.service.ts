import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>,
    ) { }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOneBy({ id });
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async createStudent(createStudentInpute: CreateStudentInput): Promise<Student> {
        const { firstName, lastName } = createStudentInpute;

        const student = this.studentRepository.create({
            id: uuid(),
            firstName,
            lastName,
        });
        return this.studentRepository.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                } as any,
            },  
        });
    }
}
