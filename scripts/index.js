class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(title, description, imgUrl) {
        const id = this.activities.length + 1; // Genera un id único para la nueva actividad
        const newActivity = new Activity(id, title, description, imgUrl);
        this.activities.push(newActivity);
        return newActivity; // Retorna la nueva actividad creada
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

// Ejemplo de uso




