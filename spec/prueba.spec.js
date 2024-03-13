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

describe("Una prueba con objetos", () =>{
  it("Yo espero que dos numeros sean iguales", () =>{
    expect(5).toBe(5);
    expect(10).toBe(10);
  });

  it("Yo espero que dos palabras sean iguales", () =>{
    expect("Jorge").toBe("Jorge")
    expect("Alejo").toBe("Alejo");

  });
        //  OBJETOS SE USA EL MATCHER toEqual 
  it("Yo espero que dos objetos iguales sean iguales", () => {
    expect({nombre:"Jorge"}).toEqual({nombre:"Jorge"});
    expect({nombre:"Alejo"}).toEqual({nombre:"Alejo"});
  });
      //   ARRAYS SE USA MATCHER toEqual
  it("Yo espero que los arrays sean iguales", () => {
    expect([1,2,3,4]).toEqual([1,2,3,4]);
  })

});

