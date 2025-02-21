function enviarOpinion() {
    let materia = document.getElementById("materia").value;
    let nombre = document.getElementById("nombre").value;
    let grado = document.getElementById("grado").value;
    let opinion = document.getElementById("opinion").value;
    let anonimo = document.getElementById("anonimo").checked;

    if (opinion.trim() === "") {
        alert("Escribe una opinión antes de enviar.");
        return;
    }

    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
    opiniones.push({ materia, nombre, grado, opinion, anonimo, respuesta: "" });
    localStorage.setItem("opiniones", JSON.stringify(opiniones));

    document.getElementById("opinion").value = "";
    cargarOpiniones();
}

function cargarOpiniones() {
    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
    let contenedor = document.getElementById("opiniones");
    contenedor.innerHTML = "";

    opiniones.forEach((op, index) => {
        let div = document.createElement("div");
        div.classList.add("opinion");
        div.innerHTML = `
            <p><strong>${op.materia}</strong></p>
            <p>${op.opinion}</p>
            <p>De: ${op.anonimo ? "Anónimo" : op.nombre} (${op.grado})</p>
            ${op.respuesta ? `<p><strong>Respuesta del profesor:</strong> ${op.respuesta}</p>` : ""}
            <button onclick="borrarOpinion(${index})">Borrar</button>
        `;
        contenedor.appendChild(div);
    });
}

function borrarOpinion(index) {
    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
    opiniones.splice(index, 1);
    localStorage.setItem("opiniones", JSON.stringify(opiniones));
    cargarOpiniones();
}

window.onload = cargarOpiniones;
