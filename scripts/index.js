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
const LOCAL_API_BASE_URL = "http://localhost:3001/api";

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

function isValidHttpUrl(value) {
    try {
        const parsedUrl = new URL(value);
        return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (_error) {
        return false;
    }
}

function normalizeImageUrl(rawValue) {
    if (typeof rawValue !== "string") return "";
    const trimmedValue = rawValue.trim();
    if (!trimmedValue) return "";

    if (trimmedValue.startsWith("http://") || trimmedValue.startsWith("https://")) {
        return trimmedValue;
    }

    if (trimmedValue.startsWith("//")) {
        return `https:${trimmedValue}`;
    }

    return `https://${trimmedValue}`;
}

async function fetchActivitiesFromApi(apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl}/activities`);
    if (!response.ok) throw new Error("No se pudo obtener actividades.");
    return response.json();
}

async function createActivityInApi(apiBaseUrl, activityInput) {
    const response = await fetch(`${apiBaseUrl}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityInput)
    });

    if (!response.ok) throw new Error("No se pudo crear la actividad.");
    return response.json();
}

async function deleteActivityInApi(apiBaseUrl, id) {
    const response = await fetch(`${apiBaseUrl}/activities/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("No se pudo eliminar la actividad.");
}

async function clearActivitiesInApi(apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl}/activities`, { method: "DELETE" });
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
    imageElement.loading = "lazy";
    imageElement.referrerPolicy = "no-referrer";
    imageElement.addEventListener("error", () => {
        imageElement.src = "https://placehold.co/600x360/0f2743/eef4ff?text=Imagen+no+disponible";
        imageElement.alt = "Imagen no disponible";
    });

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

function createPresenter(repository, options = {}) {
    let useApi = Boolean(options.useApi);
    const apiBaseUrl = options.apiBaseUrl || LOCAL_API_BASE_URL;
    let notifiedApiFallback = false;
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
        const imgUrl = normalizeImageUrl(imageUrlInput.value);

        if (!title || !description || !imgUrl) {
            alert("Todos los campos deben ser completados.");
            return;
        }
        if (!isValidHttpUrl(imgUrl)) {
            alert("La imagen debe ser una URL valida (http o https).");
            return;
        }

        if (useApi) {
            try {
                const createdActivity = await createActivityInApi(apiBaseUrl, { title, description, imgUrl });
                repository.addExistingActivity(createdActivity);
                syncAndRender();
                clearForm();
                return;
            } catch (_error) {
                useApi = false;
                if (!notifiedApiFallback) {
                    alert("No hay conexion con la API. Se guardara en modo local.");
                    notifiedApiFallback = true;
                }
            }
        }

        repository.createActivity(title, description, imgUrl);
        syncAndRender();
        clearForm();
    }

    async function deleteSingleActivity(id) {
        if (useApi) {
            try {
                await deleteActivityInApi(apiBaseUrl, id);
                repository.deleteActivity(id);
                syncAndRender();
                return;
            } catch (_error) {
                useApi = false;
                if (!notifiedApiFallback) {
                    alert("No hay conexion con la API. Operando en modo local.");
                    notifiedApiFallback = true;
                }
            }
        }

        repository.deleteActivity(id);
        syncAndRender();
    }

    async function clearAllActivities() {
        if (useApi) {
            try {
                await clearActivitiesInApi(apiBaseUrl);
                repository.clearActivities();
                syncAndRender();
                return;
            } catch (_error) {
                useApi = false;
                if (!notifiedApiFallback) {
                    alert("No hay conexion con la API. Operando en modo local.");
                    notifiedApiFallback = true;
                }
            }
        }

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

async function initializeApp() {
    if (typeof window === "undefined") return;

    const isLocalHost =
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const apiBaseUrl = isLocalHost ? LOCAL_API_BASE_URL : null;

    let initialActivities = loadActivitiesFromStorage();
    let useApi = Boolean(apiBaseUrl);

    if (apiBaseUrl) {
        try {
            initialActivities = await fetchActivitiesFromApi(apiBaseUrl);
            useApi = true;
        } catch (_error) {
            useApi = false;
            console.warn("API no disponible: operando con localStorage.");
        }
    }

    const repository = new Repository(initialActivities);

    createPresenter(repository, { useApi, apiBaseUrl });
    initializeVisualEffects();
}

initializeApp();

if (typeof module !== "undefined" && module.exports) {
    module.exports = { Activity, Repository };
}
