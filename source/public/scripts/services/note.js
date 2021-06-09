export default class Note {
    constructor(id, title, description, dueDate, importance, done) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.createdDate = new Date();
        this.importance = importance || 1;
        this.done = false;
    }
}
