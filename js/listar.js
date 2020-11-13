let $URL_REST = "http://www.proyectos.arcelia.net/evr/src/public"
var nRow = 1;
var celdas = ["matricula", "nombre", "curp", "email", "sexo", "ciudad", "detalle"];

function agregarRenglon(idT) {
    nRow = 1;
    var tabla = document.getElementById(idT);
    var endPoint = $URL_REST + "/alumnos";
    if (document.getElementById("alumnos").value != "") {
        endPoint = $URL_REST + "/alumnos/" + document.getElementById("alumnos").value;
        document.getElementById("alumnos").value = "";
        while (tabla.rows.length > 1) {
            tabla.deleteRow(1);
        }

    }
    fetch(endPoint)
        .then(response => response.json())
        .then(data => {
            data.forEach(alumno => {
                var renglon = tabla.insertRow(nRow);
                for (i = 0; i < celdas.length; i++) {
                    var celda = renglon.insertCell(i);
                    if (celdas[i] == "matricula") {
                        var textoCelda = document.createTextNode(alumno.clave_alu);
                    } else {
                        switch (celdas[i]) {
                            case "nombre":
                                var textoCelda = document.createTextNode(alumno.nombre + " " + alumno.ap_paterno + " " + alumno.ap_materno);
                                break;
                            case "curp":
                                var textoCelda = document.createTextNode(alumno.curp);
                                break;
                            case "email":
                                var textoCelda = document.createTextNode(alumno.email);
                                break;
                            case "sexo":
                                var textoCelda = document.createTextNode(alumno.sexo);
                                break;
                            case "ciudad":
                                var textoCelda = document.createTextNode(alumno.ciudad);
                                break;
                            case "detalle":
                                var textoCelda = document.createElement('a');
                                textoCelda.classList.add('btn', 'btn-primary');
                                textoCelda.textContent = 'ver';
                                textoCelda.href = "hola.html" + "?matricula=" + alumno.clave_alu;
                                break;

                        }
                    }

                    celda.appendChild(textoCelda);
                }
                nRow++;
            });
        }).catch(error => console.log())
}