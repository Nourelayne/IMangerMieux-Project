let alimentMaxId = 1;
let aliments = [];
let edited = false;
let selectedRow = null;
let backendURL = "http://localhost/IDAW/Projet_IMM/BackEnd/api/aliments/";

$(document).ready(function() {

    $.getJSON(backendURL + "selectAliment.php", function(aliments) {
        $.each(aliments, function(i, a) {
            let aliment = {};
            aliment.id = alimentMaxId;
            aliment.nom = a.nom;
            aliment.energie = a.energie;
            aliment.protéines = a.protéines;
            aliment.glucides = a.glucides;
            aliment.lipides = a.lipides;
            aliment.sucres = a.sucres;
            aliment.alcool = a.alcool;
            aliment.sodium = a.sodium;
            aliment.eau = a.eau;
            appendTable(aliment);
        });
    });
});

function appendTable(newAliment) {
    $("#table-content").append(`  <tr> 
                <td> ${newAliment.nom}  </td> <td> 
                ${newAliment.energie}  </td> <td> 
                ${newAliment.protéines}  </td> <td> 
                ${newAliment.glucides} </td> <td>
                ${newAliment.lipides}  </td> <td> 
                ${newAliment.sucres}  </td> <td> 
                ${newAliment.alcool}  </td> <td> 
                ${newAliment.sodium}  </td> <td>  
                ${newAliment.eau}  </td> <td>
                    <button type="button" class="btn btn-warning" onclick="edit(${newAliment.id})"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></button>
                    <button type="button" class="btn btn-danger" onclick="remove(${newAliment.id})"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></button>
                </td> 
    </tr>`);
    aliments.push(newAliment);
    alimentMaxId++;
}


function ajaxAddAliment(aliment) {
    $.ajax({
        url: backendURL + "addAliment.php",
        method: "POST",
        dataType: "json",
        data: aliment
    })
}

function ajaxUpdateAliment(aliment) {
    $.ajax({
        url: backendURL + "updateAliment.php",
        method: "POST",
        dataType: "json",
        data: aliment
    })
}

function ajaxDeleteAliment(id) {
    $.ajax({
        url: backendURL + "deleteAliment.php",
        method: "POST",
        dataType: "json",
        data: {
            'id': id
        },
    })
}

function clearFields() {
    $("#nom").val("");
    $("#energie").val("");
    $("#protéines").val("");
    $("#glucides").val("");
    $("#lipides").val("");
    $("#sucres").val("");
    $("#alcool").val("");
    $("#sodium").val("");
    $("#eau").val("");
}

function readInputs() {
    let newAliment = {};
    edited ? newAliment.id = selectedRow.rowIndex : newAliment.id = alimentMaxId;
    newAliment.nom = $("#nom").val();
    newAliment.energie = $("#energie").val();
    newAliment.protéines = $("#protéines").val();
    newAliment.glucides = $("#glucides").val();
    newAliment.lipides = $("#lipides").val();
    newAliment.sucres = $("#sucres").val();
    newAliment.alcool = $("#alcool").val();
    newAliment.sodium = $("#sodium").val();
    newAliment.eau = $("#eau").val();
    return newAliment;
}

function onFormSubmit() {
    event.preventDefault();
    let aliment = readInputs();
    if (!edited) {
        appendTable(aliment);
        ajaxAddAliment(aliment);
        clearFields();
    } else {
        aliments.splice(selectedRow.rowIndex - 1, 1, aliment);
        saveAliment(aliment);
        clearFields();
    }
}

function remove(id) {
    if (confirm("êtes-vous sure de vouloir supprimer cet enregistrement?")) {
        ajaxDeleteAliment(id);
        alimentMaxId = alimentMaxId - 1;
        event.target.closest("tr").remove();
        aliments = aliments.filter(aliment => aliment.id !== id);
    }
}

function edit(id) {
    edited = true;
    selectedRow = event.target.closest("tr");
    $("#nom").val(aliments[id - 1].nom);
    $("#nom").attr('disabled', 'disabled');
    $("#energie").val(aliments[id - 1].energie);
    $("#protéines").val(aliments[id - 1].protéines);
    $("#glucides").val(aliments[id - 1].glucides);
    $("#lipides").val(aliments[id - 1].lipides);
    $("#sucres").val(aliments[id - 1].sucres);
    $("#alcool").val(aliments[id - 1].alcool);
    $("#sodium").val(aliments[id - 1].sodium);
    $("#eau").val(aliments[id - 1].eau);
}

function saveAliment(aliment) {
    selectedRow.cells[0].innerHTML = aliment.nom;
    selectedRow.cells[1].innerHTML = aliment.energie;
    selectedRow.cells[2].innerHTML = aliment.protéines;
    selectedRow.cells[3].innerHTML = aliment.glucides;
    selectedRow.cells[4].innerHTML = aliment.lipides;
    selectedRow.cells[5].innerHTML = aliment.sucres;
    selectedRow.cells[6].innerHTML = aliment.alcool;
    selectedRow.cells[7].innerHTML = aliment.sodium;
    selectedRow.cells[8].innerHTML = aliment.eau;
    ajaxUpdateAliment(aliment);
}