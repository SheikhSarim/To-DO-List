const Check = document.getElementById("Check");
const Submit = document.getElementById("submitBTN");
const Show = document.getElementById("Show");

$(function () {
    $("#datePickerButton").click(function () {
        $("#datepicker").datepicker("show");
    });

    $("#datepicker").datepicker({
        dateFormat: "dd/mm/yy",
        onClose: function (dateText, inst) { }
    });
});

Submit.addEventListener("click", () => {
    const taskText = Check.value.trim();
    const taskDate = $("#datepicker").val();

    if (!taskText) {
        alert("Please fill task");
        return;
    }

    const newTask = document.createElement('div');
    newTask.classList.add('taskItem');

    const label = document.createElement('label');
    label.classList.add('custom-input');

    const taskContent = document.createElement('input');
    taskContent.type = 'text';
    taskContent.id = 'Input-field';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'Done';
    checkbox.checked = false;
    checkbox.addEventListener('change', () => handleCheckboxChange(checkbox, taskContent));

    const checkmark = document.createElement('div');
    checkmark.classList.add('custom-input-checkmark');

    label.appendChild(checkbox);
    label.appendChild(checkmark);

    newTask.appendChild(label);





    // Concatenate taskText and Dateshow.textContent for taskContent value
    taskContent.value = taskText;
    taskContent.classList.add('form-control');
    taskContent.setAttribute("readonly", "readonly");

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('Buttons-box');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn', 'btn-warning');
    editButton.addEventListener('click', () => {
        if (editButton.innerText.toLowerCase() == "edit") {
            taskContent.removeAttribute("readonly");
            editButton.innerText = "Save";
        } else {
            taskContent.setAttribute("readonly", "readonly");
            taskContent.blur();
            editButton.innerText = "Edit";
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.addEventListener('click', () => {
        newTask.remove();
    });

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    newTask.appendChild(taskContent);

    if (taskDate) {

        // Create a separate span element for Dateshow
        const Dateshow = document.createElement('span');
        Dateshow.textContent = "Due Date: " + taskDate;
        Dateshow.classList.add('alert', 'alert-primary', 'DDate');

        newTask.appendChild(Dateshow);
    }


    newTask.appendChild(buttonsContainer);

    function handleCheckboxChange(checkbox, taskContent) {
        if (checkbox.checked) {
            taskContent.style.textDecoration = "line-through";
            taskContent.style.color = "#888";
        } else {
            taskContent.style.textDecoration = "none";
            taskContent.style.color = "#000";
        }
    }
    Show.querySelector('.TasksList').appendChild(newTask);
    Check.value = '';
    $("#datepicker").val('');
});