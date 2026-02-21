class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor(initialActivities = []) {
        this.activities = [];
        this.id = 0;
        this.hydrate(initialActivities);
    }

    hydrate(rawActivities = []) {
        this.activities = rawActivities.map(
            (activity) => new Activity(activity.id, activity.title, activity.description, activity.imgUrl)
        );
        this.id = this.activities.reduce((maxId, activity) => Math.max(maxId, activity.id), 0);
    }

    getAllActivities() {
        return [...this.activities];
    }

    createActivity(title, description, imgUrl) {
        this.id += 1;
        const activity = new Activity(this.id, title, description, imgUrl);
        this.activities.push(activity);
        return activity;
    }

    deleteActivity(id) {
        this.activities = this.activities.filter((activity) => activity.id !== id);
    }

    clearActivities() {
        this.activities = [];
    }
}

const STORAGE_KEY = "isaac.activities";

function loadActivitiesFromStorage() {
    if (typeof localStorage === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
        return [];
    }
}

function saveActivitiesToStorage(activities) {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

function activityCreateHTML(activity, onDelete) {
    const { id, title, description, imgUrl } = activity;

    const titleElement = document.createElement("h3");
    titleElement.textContent = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    descriptionElement.classList.add("descripcion");

    const imageElement = document.createElement("img");
    imageElement.src = imgUrl;
    imageElement.alt = title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => onDelete(id));

    const bodyCard = document.createElement("div");
    bodyCard.classList.add("cuerpo");
    bodyCard.appendChild(titleElement);
    bodyCard.appendChild(descriptionElement);
    bodyCard.appendChild(imageElement);
    bodyCard.appendChild(deleteButton);

    const card = document.createElement("article");
    card.classList.add("tarjeta");
    card.appendChild(bodyCard);

    return card;
}

function renderListActivities(repository, container, onDelete) {
    container.innerHTML = "";

    const activities = repository.getAllActivities();

    if (!activities.length) {
        const emptyState = document.createElement("p");
        emptyState.className = "empty-state";
        emptyState.textContent = "Sin actividades por el momento.";
        container.appendChild(emptyState);
        return;
    }

    const activityElements = activities.map((activity) => activityCreateHTML(activity, onDelete));
    activityElements.forEach((activityElement) => container.appendChild(activityElement));
}

function createPresenter(repository) {
    const form = document.getElementById("activityForm");
    const titleInput = document.getElementById("nombre");
    const descriptionInput = document.getElementById("descripcion");
    const imageUrlInput = document.getElementById("link");
    const clearButton = document.getElementById("clearButton");
    const container = document.getElementById("divContainerCards");

    function syncAndRender() {
        saveActivitiesToStorage(repository.getAllActivities());
        renderListActivities(repository, container, deleteSingleActivity);
    }

    function clearForm() {
        titleInput.value = "";
        descriptionInput.value = "";
        imageUrlInput.value = "";
    }

    function addActivity(event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const imgUrl = imageUrlInput.value.trim();

        if (!title || !description || !imgUrl) {
            alert("Todos los campos deben ser completados.");
            return;
        }

        repository.createActivity(title, description, imgUrl);
        syncAndRender();
        clearForm();
    }

    function deleteSingleActivity(id) {
        repository.deleteActivity(id);
        syncAndRender();
    }

    function clearAllActivities() {
        repository.clearActivities();
        syncAndRender();
    }

    form.addEventListener("submit", addActivity);
    clearButton.addEventListener("click", clearAllActivities);

    syncAndRender();
}

function initializeVisualEffects() {
    if (typeof window === "undefined") return;

    if (window.AOS) {
        window.AOS.init({ duration: 650, once: true, offset: 50, easing: "ease-out-cubic" });
    }

    if (window.VanillaTilt) {
        const tiltTargets = document.querySelectorAll(".tilt");
        window.VanillaTilt.init(tiltTargets, {
            max: 8,
            speed: 450,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
    }
}

function initializeApp() {
    if (typeof window === "undefined") return;

    const initialActivities = loadActivitiesFromStorage();
    const repository = new Repository(initialActivities);

    createPresenter(repository);
    initializeVisualEffects();
}

initializeApp();

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Activity, Repository };
}
