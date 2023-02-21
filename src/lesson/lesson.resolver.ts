import { Lesson } from './lesson.entity';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from "@nestjs/graphql";
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ) { }

    @Query(returns => LessonType)
    lesson(
        @Args('id') id : string,
    ){
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons() {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLession(
        @Args('createLessonInput') createLessonInput : CreateLessonInput,
    ) {
        return this.lessonService.createLession(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentToLesson(
        @Args('assignStudentsToLessonInput') assignStudentsToLessonInput: AssignStudentsToLessonInput
    ) {
        const { lessonId, studentIds } = assignStudentsToLessonInput;
        return this.lessonService.assignStudentToLesson(lessonId, studentIds);
}
@ResolveField()
async students(@Parent() lesson: Lesson){
    console.log(lesson);
    return this.studentService.getManyStudents(lesson.students)
    
}
}