let form = document.querySelector("form"); 
let lists = document.querySelector(".todo-lists");
form.addEventListener('submit', (e)=>{
    // alert("i am working");
    let todo = e.target.todo.value;
    console.log(todo)
    let todoData = JSON.parse(localStorage.getItem("TodoData")) ?? [];
    console.log(todoData)
    todoData.push({
        id: todoData.length,
        message: todo,
        completed: false
    });
    localStorage.setItem("TodoData", JSON.stringify(todoData));
    DisplayTodo();
    e.target.reset();
    e.preventDefault();
})

let DisplayTodo = (filter = 'all') =>{
    let todoData = JSON.parse(localStorage.getItem("TodoData")) ?? [];
    let finalData = "";
    todoData.forEach((elem,i)=>{
        // Apply filtering logic
        if (filter === 'all' || 
            (filter === 'completed' && elem.completed) || 
            (filter === 'incompleted' && !elem.completed)) {
        finalData += `
        <div class="todo-box">
            <input type="checkbox" name="check" onclick="Completed(${i})" ${elem.completed ? 'checked' : ''}>
            <input type="text" name="message" value="${elem.message}" readonly class="${elem.completed ? 'completed' : ''}">
            <i class="ri-file-edit-fill" onclick="UpdateTodo(${i})"></i>
            <i class="ri-delete-bin-6-line" onclick="DeleteTodo(${i})"></i>
        </div>`
        }
    });
    lists.innerHTML = finalData;
}

let Completed = (index) =>{
    // alert("its working");
    let todoData = JSON.parse(localStorage.getItem("TodoData")) ?? [];
    let checkboxes = document.querySelectorAll('input[type="checkbox"][name="check"]');
    let message = document.querySelectorAll('input[type="text"][name="message"]');
    let isChecked = checkboxes[index].checked;
    todoData[index].completed = isChecked;
    if(isChecked){
        // todoData[index].completed = true;
        message[index].classList.add("completed");
        console.log(isChecked)
    }else{
        // todoData[index].completed = false;
        message[index].classList.remove("completed");
    }
    localStorage.setItem("TodoData", JSON.stringify(todoData));
}

let UpdateTodo = (index) =>{
    let message = document.querySelectorAll('input[type="text"][name="message"]');
    let todoData = JSON.parse(localStorage.getItem("TodoData")) ?? [];
    if(message[index].hasAttribute('readonly')){
        message[index].removeAttribute('readonly')
        message[index].focus();
    }else{
        let newValue = message[index].value.trim();
        if(newValue === ""){
            alert("todo cannot be empty");
        }else{
            todoData[index].message = newValue;
            localStorage.setItem("TodoData", JSON.stringify(todoData));
        }
        
        message[index].setAttribute('readonly','readonly');
        DisplayTodo();
    }
    
}

let DeleteTodo = (index) =>{
    confirm("Sure you want to Delete it");
    let todoData = JSON.parse(localStorage.getItem("TodoData")) ?? [];
    todoData.splice(index,1);
    localStorage.setItem("TodoData", JSON.stringify(todoData));
    DisplayTodo();
}

// filter todos
let menus = document.querySelectorAll(".todo-menus ul li");
let todolists = document.querySelectorAll(".todo-lists .todo-box");
let todoData = JSON.parse(localStorage.getItem("TodoData")) ?? [];
menus.forEach((e) => {
  e.addEventListener("click", (event) => {
    document.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");

    let filter = event.target.textContent.toLowerCase();
    DisplayTodo(filter);

    // todolists.forEach((box)=>{
    //     box.classList.add("hide");
    //     const x = todoData.filter((elem)=> elem.completed == true);
    //     if(x.Completed == true || x.completed == false){
    //         box.classList.remove("hide");
    //     }
    // })
  });
});


console.log(todoData);
const x = todoData.filter((elem)=> elem.completed == true);
console.log(x);

DisplayTodo();