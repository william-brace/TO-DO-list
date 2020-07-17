import Task from './models/task';
import * as taskView from './views/taskView';

let uniqid = require('uniqid');
let tasks = [];
let completedTasks = [];
let tab = 'doing';


const persistData = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

const retrieveData = () => {
    let items = JSON.parse(localStorage.getItem('tasks'));
    let completedItems = JSON.parse(localStorage.getItem('completedTasks'));

    return [items, completedItems];
}

//Returns true if tab is set to doing
const checkTabDoing = () => {
     return (tab === 'doing' ? true : false);
}

const checkTabDone = () => {
    return (tab === 'done' ? true : false);
}

//Returns true if there are no blank tasks
const checkBlankTasks = () => {

    //Check to see if any tasks have been added
    if (tasks.length === 0)
        return true;
    //blank task count
    let blanks = 0;

    //checking for blank tasks
    tasks.forEach(cur => {
        if (cur.description === '')
            blanks++;
    });
    
    if (blanks > 0)
    {
        return false;
    }
    else
        return true;
}

//////////Implement IDs into new items

const controlAddTask = () => {

    //1. Create new task item only if user is in doing tab and only if there are no tasks without descriptions
    if (checkTabDoing() && checkBlankTasks())
    {
        let curTask = new Task(uniqid(),'');
        tasks.push(curTask);  //push new task to task array

        persistData();

        //2. Dislay task items to user interface
        taskView.displayTasks(tasks);

    }

    if (checkTabDone())
    {
        taskView.doneTabAddTaskError();
    }
    
}

const findTaskById = task_id => {
    
    let foundTask;

    for (let i = 0; i < tasks.length; i++)
    {
        if (tasks[i].id === task_id)
        {
            console.log(`Task ${i} ID in tasks array is ${tasks[i].id} and task id im looking for is ${task_id}`);
            foundTask = tasks[i];
        }
    }

    console.log(`found task is ${foundTask}`);
    return foundTask;

}


const controlUpdateTask = (id, value) => {


    let taskToUpdate = findTaskById(id);
    console.log(`value of taskToUpdate is ${taskToUpdate}`)
    console.log(`Value of task input is ${value}`);
    taskToUpdate.updateTask(value);
    persistData();
    
    //update view
    taskView.displayTasks(tasks);

    

}

const controlCompleteTask = taskId => {
    //Recieve id and value and find corresponding data from tasks array

    let toComplete;

    tasks.forEach( (cur,index) => {
        console.log(`Id is ${cur.id} and match id is ${taskId} and index os ${index}`);
        if (cur.id === taskId)
        {
            console.log('We have a match');
            //toComplete = cur;//placeholder value
            tasks.splice(index,1);//Remove this data from tasks array
            completedTasks.push(cur);//push this data to tasks completed array
        }
    });

    persistData();

    taskView.displayTasks(tasks);
}

const controlRemoveTask = taskId => {
    tasks.forEach( (cur,index) => {
        if (cur.id === taskId)
        {   
            tasks.splice(index,1);//Remove this data from tasks array
        }
    });

    persistData();

    taskView.displayTasks(tasks);
}

const controlRemoveCompletedTask = taskId => {
    completedTasks.forEach( (cur,index) => {
        if (cur.id === taskId)
        {   
            completedTasks.splice(index,1);//Remove this data from tasks array
        }
    });

    persistData();

    taskView.displayTasks(completedTasks);
}

const controlChangeToDoneTab = () => {
    if (checkTabDoing())
    {
        taskView.changeToDoneTab(completedTasks);
        tab = 'done';
    }
}

const controlChangeToDoingTab = () => {
    if (checkTabDone())
    {
        taskView.changeToDoingTab(tasks);
        tab = 'doing';
    }
}

const controlClearAllButton = () => {
    if (checkTabDoing())
    {
        tasks.length = 0;
        taskView.displayTasks(tasks);
    }

    if (checkTabDone()) {
        completedTasks.length = 0;
        taskView.displayTasks(completedTasks);
    }

    persistData();
}


window.addEventListener('load', () => {
    let [previousTasks, previousCompletedTasks] = retrieveData();

    console.log(previousTasks, previousCompletedTasks);
    
    if (previousTasks)
        tasks = previousTasks;

    if (previousCompletedTasks)
        completedTasks = previousCompletedTasks;

    taskView.displayTasks(tasks);
})

document.querySelector('#btn-add-task').addEventListener('click', controlAddTask);

document.querySelector('#list').addEventListener('keydown', e => {

    if (e.keyCode === 13 && checkTabDoing())
    {   
        //listen for enter keypress or click off and take input Id and value and update task model and task view accordingly
        controlUpdateTask(e.target.id, e.target.value);
    }
});

document.querySelector('#doing-tab').addEventListener('click', controlChangeToDoingTab);

document.querySelector('#done-tab').addEventListener('click', controlChangeToDoneTab);

document.querySelector('#list').addEventListener('click', e => {
   
    console.log(e.target.className)

    if (e.target.className.includes('btn-complete') && checkTabDoing())
    {
        console.log(`This is the button`);
        controlCompleteTask(e.target.id);

        console.log(tasks);
        console.log(completedTasks);
    }

    if (e.target.className === 'btn-remove' && checkTabDoing())
    {
        controlRemoveTask(e.target.id);
        console.log(tasks);
        console.log(completedTasks);
    }
    else if (e.target.className === 'btn-remove' && checkTabDone())
    {
        controlRemoveCompletedTask(e.target.id);
    }
    
});

document.querySelector('#btn-clear-all-container').addEventListener('click', e => {
    if (e.target.id === 'btn-clear-all')
    {
        controlClearAllButton();
    }
})


