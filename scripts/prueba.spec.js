const {Repository,Activity} = require("../scripts/index");


describe("La clase Activity",() =>{
    it("Debe ser una clase",() =>{
        expect(typeof Activity.prototype.constructor).toBe("function");
    });

    it("Debe crear una instancia de Activiy con los parametros correctos",() =>{
        const activity = new Activity([],"Titulo","Descripción", "url.png")
        expect(activity.id).toBe();
        expect(activity.title).toBe("Titulo");
        expect(activity.description).toBe("Descripción");
        expect(activity.imgUrl).toBe("url.png");
    })

});

describe("La clase Repository",() =>{
    it("Debe ser una clase",() =>{
        expect(typeof Repository.prototype.constructor).toBe("function");
    });

    it("Debe tener un metodo getAllActivities",() =>{
        const activities = new Activity();
        expect(activities.getAllActivities).toBeDefined();
    });

    it("Debe tener un metodo createActivity",() =>{
        const activities = new Activity();
        expect(activities.createActivity.push()).toBeDefined();
    });
    it("Debe tener un metodo deleteActivity", () =>{
        const activities = new  Activity();
        expect(activities.deleteActivity).toBeDefined();
    });
});

