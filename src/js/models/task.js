
export default class Task {

    constructor(id,description) {
        this.id = id;
        this.description = description;
    }

    updateTask(value) {
        this.description = value;
    }

    
}