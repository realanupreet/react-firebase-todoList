import "./styles.css";
import db from "./firebase";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where
} from "firebase/firestore";
const Dot = ({ color }) => {
  const spanstyle = {
    backgroundColor: color,
    height: "3vw",
    width: "3vw",
    display: "inline-block",
    margin: "0vw 1vw",
    borderRadius: "50%"
  };
  return <span style={spanstyle}></span>;
};

export default function App() {
  const [colors, SetColors] = useState();
  console.log(colors);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "colors"), (snapshot) => {
      SetColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  const handleNew = async () => {
    const name = prompt("Enter color name");
    const value = prompt("Enter vaue for the color");
    if (name && value) {
      const collectionRef = collection(db, "colors");
      const payload = {
        name,
        value
      };
      await addDoc(collectionRef, payload);
    }
  };
  const handleEdit = async (id) => {
    const docRef = doc(db, "colors", id);
    const name = prompt("Enter new color name");
    const value = prompt("Enter new vaue for the color");
    if (name && value) {
      const payload = {
        name,
        value
      };
      await setDoc(docRef, payload);
      console.log(id, "hehhe");
    }
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "colors", id);
    await deleteDoc(docRef);
    console.log(id);
  };
  const astyle = {
    margin: ".3vw .5vw",
    cursor: "pointer"
  };
  const handleQueryDelete = async () => {
    const collectionRef = collection(db, "colors");
    const name = prompt("Enter color name to query");
    const q = query(collectionRef, where("name", "==", name));
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({ ...doc.data, id: doc.id }));
    results.forEach(async (result) => {
      docRef = doc(db, "colors", result.id);
      await deleteDoc(docRef);
    });
  };
  return (
    <div className="App">
      <button onClick={handleNew}>new</button>
      <button onClick={handleQueryDelete} style={{ margin: "0vw 1vw" }}>
        query delete
      </button>
      {colors && (
        <>
          <ul>
            {colors.map((color) => (
              <li key={color.id}>
                {color.name}
                <Dot color={color.value} />
                <button
                  style={astyle}
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(color.id);
                  }}
                >
                  edit
                </button>
                <button style={astyle} onClick={() => handleDelete(color.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {!colors && (
        <>
          <div>loading...</div>
        </>
      )}
    </div>
  );
}
