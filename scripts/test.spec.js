
// "Debe ser una clase" **
// "Cada lista debe ser una instancia de ToDoList" **
// "Debería agregar un elemento a la lista" 

// "Debería eliminar el último elemento de la lista"
// "Debería retornar la lista de elementos"
const {Activity, Repository} = require("../scripts/index");

describe("La clase Activity",() =>{
    it("La clase Activyty debe ser una función constructora",() =>{
        expect(typeof Activity.prototype.constructor).toBe("function")    
    });

    it("Debe crear una instancia de Activity con los parametros correctos",() =>{
    const activity = new Activity([], "title, description, imgUrl");
    expect("id").toBe();
    expect("title").toBe("titulo");
    expect("description").toBe("descripción");
    expect("imgUrl").toBe("url.png");
    }); 
});
describe("La clase Repository",() =>{
    it("La clase Repository debe ser una función constructora",() =>{
        beforeEach(() =>{
            const repositorio =new Repository();
        });
        expect(typeof Repository.prototype.constructor).toBe("function")
    });
    it("Debe tener el metodo getAllActivities",() =>{
        const repositorio = new Repository();
        expect(repositorio.getAllActivities).toBeDefined();
    })
    it("Debe tener el metodo createActivity",() =>{
        const createActivity = new Activity();
        expect(createActivity.createActivity.push()).toBeDefined();
    });
    it("Debe tener el metodo deleteActivity",() =>{
        const eliminarActividad = new Activity();
        expect(eliminarActividad.deleteActivity).toBeDefined();
    });
});

describe("La clase Repository",() =>{
    it("La clase Repository debe ser una función",() =>{
        expect(typeof Repository.prototype.constructor).toBe("function");
    });        
    it("getAllActivities debe devolver todas las actividades creadas",() =>{
        repositorio.createActivity("Actividad1","Descripción1", "imagen1.png");
        repositorio.createActivity("Actividad2","Descripción2", "imagen2.png");
        const activities = new Repository.getAllActivities();
        expect(activities.lenght).toBe(2);
    });
    it("createActivity para crear una actividad correctamente",() =>{
        activities.createActivity("Actividad-test", "Descripción-test", "imagen-test.png");
        const activities = new Repository.getAllActivities();
        expect(activities.lenght()).toBe(1);
        expect(activities[0].title()).toBe("Actividad-test");
        expect(activities[0].descripcion()).toBe("Descripción-test");
        expect(activities[0].imgUrl()).toBe("imagen-test.png");

    });
    it("deleteActivity borra una prueba correctamente",() =>{
        activities.createActivity("titulo de prueba","descripcion de prueba", "imagen.png de prueba")
        const activitiesBefore = activities.getAllActivities();
        activities.deleteActivity(1);
        const activitiesAfter = activities.getAllActivities();
        expect(activitiesAfter.lenght()).toBe(0);
    });
});
describe("Prueba para la función activityCreateHTML",() =>{
    it("activityCreateHTML debe devolver el elemento HTML esperado",() =>{
        const activity = new Activity(1,"tiulo de prueba", "descripcion de prueba", "imagen de prueba");
        const htmlElement = activityCreateHTML(activity);
        expect(htmlElement.tagName).toBe("div");
        expect(htmlElement.classList.contains("tarjeta")).toBe(true);
    });
});

describe("La clase Repository",() =>{
    it("La clase Repository debe tener metodos especificos",() =>{
        const repositorio = new Repository();

        expect(repositorio.getAllActivities).toBeDefined();
        expect(repositorio.createActivity).toBeDefined();
        expect(repositorio.deleteActivity).toBeDefined();
    });
});


