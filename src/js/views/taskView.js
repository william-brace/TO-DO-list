export const doneTabAddTaskError = () => {
    let error = `
    <span>You must be in the Doing tab to add a new task!</span>
    `
    clearError();
    document.querySelector('.error').insertAdjacentHTML('beforeend', error);
}


const clearError = () => {
    document.querySelector('.error').innerHTML = '';
}

export const changeToDoneTab = completedTasks => {
    document.querySelector('#backboard').className = 'done-tab-color';

    clearError();
    clearTasks();
    

    displayTasks(completedTasks);
}

export const changeToDoingTab = tasks => {
    document.querySelector('#backboard').className = 'doing-tab-color';

    clearError();
    clearTasks();

    displayTasks(tasks);
}

export const clearTasks = () => {
    document.querySelector('#list').innerHTML = '';
}

const clearBtnClearAll = () => {
    document.querySelector('#btn-clear-all-container').innerHTML = '';

    console.log('clear all has been cleared')
}


export const displayTasks = tasks => {

    let markup;

    clearTasks();
    clearBtnClearAll();
    

    tasks.forEach(cur => {
        markup = `
        <div class='list-item'>
            <div class='task-left'>
                <input id=${cur.id} class='btn-complete align-self-center task-left-space' type='radio'>
                <input value='${cur.description}' type=text placeholder="Click here to enter your task!" autofocus='autofocus' maxlength="82" class='task-item align-self-center task-left-space' id='${cur.id}'></input>
            </div>
            <span class='close align-self-center task-right-space'><button  class='btn-remove' id=${cur.id}>X</button></span> 
        </div>
        `;
    
        document.querySelector('#list').insertAdjacentHTML('beforeend',markup);
    });




    console.log(`length is ${tasks.length}`);

    if (tasks.length === 0)
        console.log('This shit is 0');

    if (tasks.length > 0)
    {
        let btnMarkup = `
        <button id="btn-clear-all">Clear All</button>
        `
        console.log('Clear all btn is getting inserted');
       document.querySelector('#btn-clear-all-container').insertAdjacentHTML('beforeend', btnMarkup);

    }
}