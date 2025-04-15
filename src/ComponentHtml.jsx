import { useEffect, useState } from "react";
import axios from "axios";

const students = [
    {
        id: 1,
        name: "Alice Bianchi",
        course: "Matematica",
        status: "active",
    },
    {
        id: 2,
        name: "Luca Verdi",
        course: "Informatica",
        status: "inactive",
    },
];

const courses = [
    "Matematica",
    "Fisica",
    "Storia",
    "Informatica",
    "Letteratura",
    "Biologia",
    "Economia",
    "Arte",
];

// Milestone 2 – Fetch da API esterna + struttura studenti
// Crea un array locale di corsi, es.:
// ["Matematica", "Fisica", "Storia", "Informatica", "Letteratura", "Biologia", "Economia", "Arte"]
// Fai una richiesta GET a https://jsonplaceholder.typicode.com/users usando useEffect
// Mappa la risposta per ottenere oggetti con questo formato:
// {
//   id: user.id,
//   name: user.name,
//   course: corso random dalla lista,
//   status: valore casuale tra "active" / "inactive"
// }
// Inserisci questi studenti nello stato



function ComponentHtml() {
    const endPoint = "https://jsonplaceholder.typicode.com/users"
    const [arrayStudents, setArrayStudents] = useState([]);
    useEffect(() => {

        axios.get(endPoint)
            .then((response) => {
                const newStudent = response.data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    course: courses[Math.floor(Math.random() * courses.length)],
                    status: isActive(),
                }));
                setArrayStudents(newStudent);
                console.log(response.data)
            })
            .catch((error) => {
                console.error("Errore nel fetch con axios:", error);
            });
    }, [])
    console.log(arrayStudents)



    //useEffect(fetchActresses, []);





    ///////////////////////////////////FUNCTIONS/////////////////////////////////////////;

    function isActive() {
        const number = Math.floor(Math.random() * 10);
        if (number % 2 === 0) {
            return 'active';
        } else {
            return 'inactive';

        }
    }

    function fetchCourses() {

    }


    function handle() {

    }




    // console.log(array)
    return (
        <>
            <main className="container">
                <h1>Gestione Studenti</h1>

                <div id="status-message" className="status-message"></div>

                <section className="form-section">
                    <h2>Aggiungi Studente</h2>
                    <form id="student-form">
                        <label>
                            Nome:
                            <input type="text" name="name" required />
                        </label>
                        <label>
                            Corso:
                            <input type="text" name="course" required />
                        </label>
                        <label>
                            Stato:
                            <select name="status" required>
                                <option value="active">Attivo</option>
                                <option value="inactive">Inattivo</option>
                            </select>
                        </label>
                        <button type="submit">Aggiungi</button>
                    </form>
                </section>

                <section className="filter-section">
                    <h2>Filtra</h2>
                    <input type="text" id="filter-name" placeholder="Filtra per nome" />
                    <input type="text" id="filter-course" placeholder="Filtra per corso" />
                </section>

                <section className="list-section">
                    <div className="list-header">
                        <h2>Elenco Studenti</h2>
                        <div className="sort-controls">
                            <label>Ordina per:</label>
                            <select id="sort-by">
                                <option value="name">Nome</option>
                                <option value="course">Corso</option>
                            </select>
                        </div>
                    </div>


                    <ul id="student-list">

                        {arrayStudents.map(arrayStudents => (
                            <li key={arrayStudents.id}>

                                <div>
                                    <strong>{arrayStudents.name}</strong> -{arrayStudents.course}
                                    <span className="status">{arrayStudents.status}</span>
                                </div>
                                <div className="actions">
                                    <button className="edit-btn">Modifica</button>
                                    <button className="delete-btn">Elimina</button>
                                </div>
                                <form className="edit-form">
                                    <label>
                                        Nome:
                                        <input type="text" name="name" value={arrayStudents.name} />
                                    </label>
                                    <label>
                                        Corso:
                                        <input type="text" name="course" value={arrayStudents.course} />
                                    </label>
                                    <label>
                                        Stato:
                                        <select name={arrayStudents.status}>
                                            <option value="active" selected>Attivo</option>
                                            <option value="inactive">Inattivo</option>
                                        </select>
                                    </label>
                                    <button type="submit">Salva modifiche</button>
                                </form>
                            </li>
                        ))};

                        <li className="inactive">
                            <div>
                                <strong>Marco</strong> - Storia
                                <span className="status">(inattivo)</span>
                            </div>
                            <div className="actions">
                                <button className="edit-btn">Modifica</button>
                                <button className="delete-btn">Elimina</button>
                            </div>
                            <form className="edit-form">
                                <label>
                                    Nome:
                                    <input type="text" name="name" value="Marco" />
                                </label>
                                <label>
                                    Corso:
                                    <input type="text" name="course" value="Storia" />
                                </label>
                                <label>
                                    Stato:
                                    <select name="status">
                                        <option value="active">Attivo</option>
                                        <option value="inactive" selected>Inattivo</option>
                                    </select>
                                </label>
                                <button type="submit">Salva modifiche</button>
                            </form>
                        </li>
                    </ul>
                </section>
            </main>


        </>
    )
}

export default ComponentHtml;