import { useEffect, useState } from "react";
import axios from "axios";

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

function ComponentHtml() {
    const endPoint = "https://jsonplaceholder.typicode.com/users";
    const [arrayStudents, setArrayStudents] = useState([]);
    const [sendForm, setSendForm] = useState({ name: "", course: "", status: "" });
    const [filterName, setFilterName] = useState([]);
    const [filterCourse, setfilterCourse] = useState([]);

    useEffect(() => {
        axios
            .get(endPoint)
            .then((response) => {
                const newStudent = response.data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    course: courses[Math.floor(Math.random() * courses.length)],
                    status: isActive(),
                }));
                setArrayStudents(newStudent);
            })
            .catch((error) => {
                console.error("Errore nel fetch con axios:", error);
            });

    }, []);

    function isActive() {
        const number = Math.floor(Math.random() * 10);
        return number % 2 === 0 ? "active" : "inactive";
    };

    function handleFormData(event) {
        const { name, value } = event.target;

        setSendForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    function handleSubmit(event) {
        event.preventDefault();

        if (!sendForm.name || !sendForm.course || !sendForm.status) {
            alert("Compila tutti i campi");
            return;
        }

        const newStudent = {
            ...sendForm,
            id: arrayStudents.length + 1,
        };

        setArrayStudents((prev) => [...prev, newStudent]);

        alert("Studente aggiunto con successo!");

        setSendForm({
            name: "",
            course: "",
            status: "",
        });
    };

    const filterField = arrayStudents.filter((element) =>
        element.name.toLowerCase().includes(filterName) &&
        element.course.toLowerCase().includes(filterCourse)
    );

    function handleDelete(id) {
        const fill = arrayStudents.filter(element => element.id !== id);
        setArrayStudents(fill);
        alert("Studente eliminato con successo!");
    };



    return (
        <main className="container">
            <h1>Gestione Studenti</h1>

            <div id="status-message" className="status-message"></div>

            <section className="form-section">
                <h2>Aggiungi Studente</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            required
                            value={sendForm.name}
                            onChange={handleFormData}
                        />
                    </label>
                    <label>
                        Corso:
                        <input
                            type="text"
                            name="course"
                            required
                            value={sendForm.course}
                            onChange={handleFormData}
                        />
                    </label>
                    <label>
                        Stato:
                        <select
                            name="status"
                            required
                            value={sendForm.status}
                            onChange={handleFormData}
                        >
                            <option value="">-- Seleziona uno stato --</option>
                            <option value="active">Attivo</option>
                            <option value="inactive">Inattivo</option>
                        </select>
                    </label>
                    <button type="submit">Aggiungi</button>
                </form>
            </section>

            <section className="filter-section">
                <h2>Filtra</h2>
                <input type="text" id="filter-name" placeholder="Filtra per nome" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                <input type="text" id="filter-course" placeholder="Filtra per corso" value={filterCourse} onChange={(e) => setfilterCourse(e.target.value)} />
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
                    {filterField.map((student) => (
                        <li key={student.id} className={student.status === "inactive" ? "inactive" : ""}>
                            <div>
                                <strong>{student.name}</strong> - {student.course}
                                <span className="status"> ({student.status})</span>
                            </div>
                            <div className="actions">
                                <button className="edit-btn">Modifica</button>
                                <button className="delete-btn" onClick={() => handleDelete(student.id)}>Elimina</button>
                            </div>
                            <form className="edit-form">
                                <label>
                                    Nome:
                                    <input type="text" name="name" value={student.name} readOnly />
                                </label>
                                <label>
                                    Corso:
                                    <input type="text" name="course" value={student.course} readOnly />
                                </label>
                                <label>
                                    Stato:
                                    <select name="status" value={student.status} readOnly>
                                        <option value="active">Attivo</option>
                                        <option value="inactive">Inattivo</option>
                                    </select>
                                </label>
                                <button type="submit" disabled>Salva modifiche</button>
                            </form>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default ComponentHtml;
// Milestone 5 – Eliminazione
// Rimuovi lo studente dallo stato al clic su “Elimina”
// Mostra messaggio di conferma
// Milestone 6 – Modifica
// Al clic su “Modifica”, mostra il form inline per quello studente
// Al clic su “Salva modifiche”:
// Valida i dati
// Aggiorna lo studente nello stato
// Mostra messaggio di conferma o errore
// Concetti da usare
// useState, useEffect
// event.target.name per form dinamici
// map, filter, sort in modo immutabile
// Rendering condizionale per la form di modifica
// Componenti riutilizzabili

// const handleDelete = (id) => {
//     setArrayStudents(element => element.filter(e => e.id !== id))
// }