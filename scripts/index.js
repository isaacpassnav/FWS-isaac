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
        this.id= 0;
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

function activityCreateHTML(){
    const {title, description, imgUrl}= activity;

    const titulo = document.createElement("h3");
    titulo.textContent = title;

    const descripcion = document.createElement("p");
    descripcion.textContent = descripcion;
    descripcion.classList.add("descripcion");

    const imagen = document.createElement("img");
    imagen.src = imgUrl;
    imagen.src = title;

    const CuerpoCard = document.createElement("div");
    cuerpoCard.classList.add("cuerpo");
    cuerpoCard.appendChild(imagen);
    cuerpoCard.appendChild(descripcion);

    const TituloCard = document.createElement("div");
    TituloCard.classList.add(TituloCard);
    TituloCard.appendChild(titulo);

    const tarjeta = document.createElement("div");
    tarjeta.appendChild(TituloCard);
    tarjeta.appendChild(CuerpoCard);
    tarjeta.classList.add("tarjeta");

    return tarjeta;
}
// -----------------------------------------------------------

function renderListActivities(){
    const container =document.getElementById("activities");
    container.innerHTML = " ";

    const activities = repository.getElementById("activities");
    const activityElements = activities.map(activityCreateHTML);

    activityElements.forEach(activity => {
        container.appendChild(activity);
    });
}
function agregarActividadHandler(event){
    event.preventDeaful();

    const tituloInput = document.getElementById("title");
    const descripcionInput = document.getElementById("descripcion");
    const imagenUrlInput = document.getElementById("imgUrl");

    const title = tituloInput.value.trin();
    const descripcion = descripcionInput.value.trin();
    const imgUrl = imagenUrlInput.value.trin();

    if (!title || !descripcion || !imgUrl){
        alert("todos deben ser completados.");
        return;
    }

    repository.createActivity(title,descripcion,imgUrl);

    renderListActivities(activitiesContainer, repository);

    tituloInput.value= "";
    descripcionInput.value= "";
    imagenUrlInput.value= "";

}

const activitiesContainer =document.getElementById("activities");
const enviarButton = document.getElementById("enviar");
enviarButton.addEventListener("click", agregarActividadHandler);


