// describe("demo", function () {
//   it("Este test debe pasar siempre", function () {
//     expect(4 + 2).toBe(6);
//   });
// });
// describe("Este es mi primer grupo de test", () => {
//   it("El numero 2 va aser igual al numero 2", () =>{
//     expect(2).toEqual(5);
//   });
// });

// const sumar = (a,b) => a+b;
// describe("La función sumar",() =>{
//   it("debe estar definida",() => {
//     expect(sumar).toBeDefined();
//   });

//   it("Debe sumar dos números",() =>{
//     expect(sumar(2,2)).toBe(4);
//     expect(sumar(4,4)).toBe(8);
//     expect(sumar(5,0)).toBe(5);
//   });
// });   
//      PRUEBA CON OBJETOS DE     //

const filtrar = (arr) => arr.filter((num) =>num%2==0);

describe("La funcion filtrar", () =>{
  it("Debe estar definida", () =>{
    expect(filtrar).toBeDefined()
  });

  it("Debe retornar un array",() =>{
    expect(Array.isArray(filtrar([1,2,3,4,5,6]))).toBe(true);
  });

  it("Debe retornar un array con los numeros pares", () =>{
    expect(filtrar([1,2,3,4,5,6])).toEqual([2,4,6]); //pares
    expect(filtrar([2,4,6])).toEqual([2,4,6]);      // nuemos iguales
    expect(filtrar([1,3,5,7,9])).toEqual([]);  //numeros impares
    expect(filtrar([])).toEqual([]); // array bacio
  });
});
// generar un set de tests siguiendo la metodología TDD. En este ejercicio vamos a construir una clase llamada ToDoList cuya función será almacenar, agregar y eliminar tareas por realizar. 


// describe("Una prueba con objetos", () =>{
//   it("Yo espero que dos numeros sean iguales", () =>{
//     expect(5).toBe(5);
//     expect(10).toBe(10);
//   });

//   it("Yo espero que dos palabras sean iguales", () =>{
//     expect("Jorge").toBe("Jorge")
//     expect("Alejo").toBe("Alejo");

//   });
//         //  OBJETOS SE USA EL MATCHER toEqual 
//   it("Yo espero que dos objetos iguales sean iguales", () => {
//     expect({nombre:"Jorge"}).toEqual({nombre:"Jorge"});
//     expect({nombre:"Alejo"}).toEqual({nombre:"Alejo"});
//   });
//       //   ARRAYS SE USA MATCHER toEqual
//   it("Yo espero que los arrays sean iguales", () => {
//     expect([1,2,3,4]).toEqual([1,2,3,4]);
//   })

// });

