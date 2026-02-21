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
        this.hydrate(initialActivities);
    }

    hydrate(rawActivities = []) {
        this.activities = rawActivities.map(
            (activity) => new Activity(activity.id, activity.title, activity.description, activity.imgUrl)
        );
    }

    getAllActivities() {
        return [...this.activities];
    }

    createActivity(title, description, imgUrl) {
        const temporaryId = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        const activity = new Activity(temporaryId, title, description, imgUrl);
        this.activities.push(activity);
        return activity;
    }

    addExistingActivity(activity) {
        this.activities.push(new Activity(activity.id, activity.title, activity.description, activity.imgUrl));
    }

    deleteActivity(id) {
        this.activities = this.activities.filter((activity) => activity.id !== id);
    }

    clearActivities() {
        this.activities = [];
    }
}

const STORAGE_KEY = "isaac.activities";
const API_BASE_URL = "http://localhost:3001/api";

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

async function fetchActivitiesFromApi() {
    const response = await fetch(`${API_BASE_URL}/activities`);
    if (!response.ok) throw new Error("No se pudo obtener actividades.");
    return response.json();
}

async function createActivityInApi(activityInput) {
    const response = await fetch(`${API_BASE_URL}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityInput)
    });

    if (!response.ok) throw new Error("No se pudo crear la actividad.");
    return response.json();
}

async function deleteActivityInApi(id) {
    const response = await fetch(`${API_BASE_URL}/activities/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("No se pudo eliminar la actividad.");
}

async function clearActivitiesInApi() {
    const response = await fetch(`${API_BASE_URL}/activities`, { method: "DELETE" });
    if (!response.ok) throw new Error("No se pudo limpiar actividades.");
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

    async function addActivity(event) {
        event.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const imgUrl = imageUrlInput.value.trim();

        if (!title || !description || !imgUrl) {
            alert("Todos los campos deben ser completados.");
            return;
        }

        try {
            const createdActivity = await createActivityInApi({ title, description, imgUrl });
            repository.addExistingActivity(createdActivity);
            syncAndRender();
            clearForm();
        } catch (_error) {
            alert("No se pudo guardar en backend. Verifica que la API este activa.");
        }
    }

    async function deleteSingleActivity(id) {
        try {
            await deleteActivityInApi(id);
            repository.deleteActivity(id);
            syncAndRender();
        } catch (_error) {
            alert("No se pudo eliminar en backend.");
        }
    }

    async function clearAllActivities() {
        try {
            await clearActivitiesInApi();
            repository.clearActivities();
            syncAndRender();
        } catch (_error) {
            alert("No se pudo limpiar actividades en backend.");
        }
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

async function initializeApp() {
    if (typeof window === "undefined") return;

    let initialActivities = loadActivitiesFromStorage();

    try {
        initialActivities = await fetchActivitiesFromApi();
    } catch (_error) {
        // Fallback local para desarrollo cuando la API no esta activa.
    }

    const repository = new Repository(initialActivities);

    createPresenter(repository);
    initializeVisualEffects();
}

initializeApp();

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Activity, Repository };
}
