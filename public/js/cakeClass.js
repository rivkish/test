// 11
export default class CakeClass{
    constructor(_parent,_item,_index,funcDelete){
      this.parent = _parent;
      this.id = _item._id;
      this.name = _item.name;
      this.cals = _item.cals;
      this.price = _item.price;
      this.img = _item.img;
      this.index = _index;
      this.funcDelete = funcDelete;
    }
  
    render(){
      let myTr = document.createElement("tr");
      document.querySelector(this.parent).append(myTr);
  
      myTr.innerHTML += `
      <td>${this.index + 1}</td>
      <td>${this.name}</td>
      <td>${this.cals}</td>
      <td>${this.price}</td>
      <td class="w-50"><img src="${this.img}" class="w-25"></td>
     
      <td><button id="del" class="btn btn-danger">X</button></td>
      `
      let btnDel=myTr.querySelector('#del')
      btnDel.addEventListener("click",()=>{ 
        this.funcDelete(this.id)
      });
    }
  }