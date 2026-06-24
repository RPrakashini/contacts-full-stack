import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const API = "http://contacts-back-env.eba-kn2zisnc.ap-south-1.elasticbeanstalk.com";

  // ✅ Fetch contacts
 const fetchContacts = () => {
  axios.get(`${API}/contacts`)
    .then(res => {
      let data = res.data;

      // 🔥 Handle API Gateway response
      if (data.body) {
        data = JSON.parse(data.body);
      }

      setContacts(Array.isArray(data) ? data : []);
    })
    .catch(err => console.error(err));
};

  // ✅ Run once when page loads
  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Add contact
  const addContact = () => {
    if (!name || !phone) {
      alert("Please enter name and phone");
      return;
    }

    axios.post(`${API}/contacts`, { name, phone })
      .then(() => {
        setName("");
        setPhone("");
        fetchContacts(); // refresh list
      })
      .catch(err => {
        console.error("Error adding contact:", err);
      });
  };

  return (
    <div style={styles.container}>
      <h1>📒 Contact Manager</h1>

      {/* FORM */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Enter Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />

        <button onClick={addContact} style={styles.button}>
          Add Contact
        </button>
      </div>

      {/* LIST */}
      <div>
        {contacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          Array.isArray(contacts) && contacts.map((c, i) => (
            <div key={i} style={styles.card}>
              <p><b>Name:</b> {c.name}</p>
              <p><b>Phone:</b> {c.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  form: {
    marginBottom: "20px"
  },
  input: {
    margin: "5px",
    padding: "10px",
    width: "200px"
  },
  button: {
    padding: "10px 20px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "300px",
    borderRadius: "8px"
  }
};

export default App;