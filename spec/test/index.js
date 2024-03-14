class toDoList{
    constructor(){
        this.toDoList = [];
       
    }  

    getTodos(){
        return this.toDoList;
    };

    addTodos(todos){
        this.toDoList.push(todos);
    };

    deleteToDo(){
        this.toDoList.pop();
    };

    

};

module.exports = toDoList;
