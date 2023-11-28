// 11
export default class UserClass{
    constructor(_parent,_item,_index,funcDelete){
      let newd=new Date(_item.date_created)
      
      this.parent = _parent;
      this.id = _item._id;
      this.name = _item.name;
      this.email = _item.email;
      this.password = _item.password;
      this.date = newd.getDate()+"-"+(newd.getMonth()+1)+"-"+newd.getFullYear()
      this.index = _index;
      this.funcDelete = funcDelete;
    }
  
    render(){
      let myTr = document.createElement("tr");
      document.querySelector(this.parent).append(myTr);
  
      myTr.innerHTML += `
      <td>${this.index + 1}</td>
      <td>${this.name}</td>
      <td>${this.email}</td> 
      <td>${this.date}</td>
     
      <td><button id="del" class="btn btn-danger">X</button></td>
      `
      let btnDel=myTr.querySelector('#del')
      btnDel.addEventListener("click",()=>{ 
        console.log(this.id)
        this.funcDelete(this.id)
      });
    }
  }