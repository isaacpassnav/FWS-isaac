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
        this.id = 0;
    }
    getAllActivities() {
        return this.activities;
    }
    createActivity(title, description, imgUrl) {
        this.id++;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

// Crear una instancia de la clase Repository
const myActivitiesRepository = new Repository();

function activityCreateHTML(activity) {
    const {title, description, imgUrl} = activity;

    const titulo = document.createElement("h3");
    titulo.textContent = title;

    const descripcion = document.createElement("p");
    descripcion.textContent = description;
    descripcion.classList.add("descripcion");

    const imagen = document.createElement("img");
    imagen.src = imgUrl;

    const cuerpoCard = document.createElement("div");
    cuerpoCard.classList.add("cuerpo");
    cuerpoCard.appendChild(titulo);
    cuerpoCard.appendChild(descripcion);
    cuerpoCard.appendChild(imagen); // La imagen se coloca al final

    const tituloCard = document.createElement("div");
    tituloCard.classList.add("titulo");
    tituloCard.appendChild(cuerpoCard);

    const tarjeta = document.createElement("div");
    tarjeta.appendChild(tituloCard);
    tarjeta.classList.add("tarjeta");

    return tarjeta;
}


function renderListActivities() {
    const container = document.getElementById("divContainerCards");
    container.innerHTML = " ";

    const activities = myActivitiesRepository.getAllActivities();
    const activityElements = activities.map(activityCreateHTML);

    activityElements.forEach(activity => {
        container.appendChild(activity);
    });
}

function agregarActividadHandler(event) {
    event.preventDefault();

    const tituloInput = document.getElementById("nombre");
    const descripcionInput = document.getElementById("descripcion");
    const imagenUrlInput = document.getElementById("link");

    const title = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const imgUrl = imagenUrlInput.value.trim();

    if (!title || !descripcion || !imgUrl) {
        alert("todos los campos deben ser completados.");
        return;
    }

    myActivitiesRepository.createActivity(title, descripcion, imgUrl);

    renderListActivities();

    tituloInput.value = "";
    descripcionInput.value = "";
    imagenUrlInput.value = "";
}
// const activitiesContainer = document.getElementById("activities");

const enviarButton = document.getElementById("button");
enviarButton.addEventListener("click", agregarActividadHandler);


