class OldPerson {
     content="hi,boss, i'm Old staff "
     sayHello(){
         return this.content
     }
}
//const od = new OldPerson();
//console.log(od.sayHello);

//继承
// class newPerson extends OldPerson {
//     sayHi(){
//         return "hi,boss,i'm newbie"
//     }
// } 
// const np = new newPerson();
// console.log(np.sayHello());
//newPerson中也有了父类中的sayHello


/**
 * 重写父类中的sayHello
 *  */
 class newPerson extends OldPerson {
     sayHello(){ //super关键字
         return super.sayHello()+'. i like coding'
     }
    sayHi(){
        return "hi,boss,i'm newbie"
    }
} 