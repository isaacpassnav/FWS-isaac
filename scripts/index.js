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

// ------------------------------------


// Crear una instancia de la clase Repository
const myActivitiesRepository = new Repository();

const newActivity = myActivitiesRepository.createActivity("Título de la actividad", "Descripción de la actividad", "URL de la imagen");

const allActivities = myActivitiesRepository.getAllActivities();

myActivitiesRepository.deleteActivity(1);

function activityToHtmlElement(activity) {
    // Extraer las propiedades del objeto Activity usando destructuring
    const { id, title, description, imgUrl } = activity;

    // Crear los elementos HTML
    const cardDiv = document.createElement('div');
    const titleElement = document.createElement('h3');
    const descriptionElement = document.createElement('p');
    const imgElement = document.createElement('img');

    // Asignar los valores a las propiedades correspondientes
    titleElement.innerHTML = title;
    descriptionElement.innerHTML = description;
    imgElement.src = imgUrl;

    // Agregar clases CSS a los elementos
    cardDiv.classList.add('activity-card');
    titleElement.classList.add('activity-title');
    descriptionElement.classList.add('activity-description');
    imgElement.classList.add('activity-image');

    // "Appendear" los elementos al contenedor <div>
    cardDiv.appendChild(titleElement);
    cardDiv.appendChild(descriptionElement);
    cardDiv.appendChild(imgElement);

    // Asignar una clase CSS al contenedor <div> para estilos
    cardDiv.classList.add('activity-card-container');

    // Retornar el contenedor <div> con todos los elementos correspondientes dentro
    return cardDiv;
}

// Función para convertir una actividad en un elemento HTML
function activityToHtmlElement(activity) {
    // Aquí va el código de la función que creamos previamente
    // que convierte una instancia de Activity en un elemento HTML
}

// Función para convertir todas las actividades en elementos HTML y agregarlas al contenedor
function updateActivitiesInContainer() {
    // Seleccionar el contenedor
    const container = document.querySelector('.activities-container');

    // Vaciar el contenido actual del contenedor
    container.innerHTML = '';

    // Obtener el listado completo de actividades
    const allActivities = myActivitiesRepository.getAllActivities();

    // Mapear el listado de actividades para convertirlos en elementos HTML
    const activitiesHtmlElements = allActivities.map(activityToHtmlElement);

    // "Appendear" todos los elementos HTML del nuevo array dentro del contenedor
    activitiesHtmlElements.forEach(element => container.appendChild(element));
}


