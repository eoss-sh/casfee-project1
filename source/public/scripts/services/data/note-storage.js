export default class NoteStorage {
    constructor() {
        const notes = [
            {
                id: '1',
                dueDate: '2021-06-01',
                title: 'Title of the first Notes',
                description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
                done: false,
                importance: 1,
            },
            {
                id: '2',
                dueDate: '2021-01-01',
                title: 'Title of the second Note',
                description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
                done: true,
                importance: 2,
            },
            {
                id: '3',
                dueDate: '2021-07-01',
                title: 'Title of the third Note',
                description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis et delectus vel dolorum ullam laborum blanditiis praesentium quo quia sit!',
                done: false,
                importance: 5,
            },
        ];
        this.notes = notes;
    }

    getNotes() {
        return this.notes;
    }
}
