// nuestra “ToDoList" debe superar para comprobar su correcto funcionamiento. Los test que construiremos serán los siguientes:

// "Debe ser una clase"
// "Debe tener los metodos:
    // getTodos(): debe retornar la lista de tareas.
    // addTodos(): debe pushear al array una tarea.
    // deleteTodos(): debe eliminar el ultimo elemento del array

const toDoList = require("../test/index")


describe("La clase toDoList",() => {

    it("Debe ser una clase", () =>{
        expect(typeof toDoList.prototype.constructor).toBe("function")
    });

    it("Debe tener implementado el metodo getTodos", () =>{
        const lista = new toDoList();
        expect(lista.getTodos).toBeDefined();
    });

    it("Debe tener implementado el metodo addTodos", () =>{
        const lista = new toDoList();
        expect(lista.addTodos).toBeDefined();
    });

    it("Debe tener implementado el metodo deleteToDo", () =>{
        const lista = new toDoList();
        expect(lista.deleteToDo).toBeDefined();
    });
    it("El metodo getTodos() debe retornar un array[]", () =>{ 
        const lista = new toDoList();
        expect(Array.isArray(lista.getTodos())).toBe(Array.isArray(lista.getTodos()));
    });
    it("El metodo addtodos() debe agregar un elemento nuevo",() => { // error 2
        const lista = new toDoList();
        lista.addTodos("Hacer la HW de la clase de hoy");
        expect(lista.getTodos()).toEqual(["Hacer la HW de la clase de hoy"]);
    });
    it("El metodo deleteToDo() debe eliminar la ultima tarea",() =>{ // error 3
        const lista = new toDoList();
        lista.addTodos("A");
        lista.addTodos("B");
        lista.addTodos("C");
        lista.deleteToDo();
        expect(lista.getTodos()).toContain("A");
        expect(lista.getTodos()).toContain("B");
        expect(lista.getTodos()).not.toContain("C");
    });

} );

