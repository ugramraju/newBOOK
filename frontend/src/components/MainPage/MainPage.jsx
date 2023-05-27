import React, { useEffect, useState } from "react";
import axios from "axios";
import Home from "../Home/Home";

const DisplayData = () => {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://new-ouln.onrender.com/api/getNotes", {
          headers: {
            "x-token": token,
          },
        });
        setUserData(response.data.notes || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if (confirmed) {
        const token = localStorage.getItem("token");
        await axios.delete(`https://new-ouln.onrender.com/api/deleteNotes/${id}`, {
          headers: {
            "x-token": token,
          },
        });
        setUserData((prevData) => prevData.filter((eachData) => eachData._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? userData
    : userData.filter((each) =>
        each.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleEdit = (note) => {
    setSelectedNote(note);
    setEditMode(true);
  };

  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const updatedNote = await axios.put(
        `https://new-ouln.onrender.com/api/updateNotes/${id}`,
        selectedNote,
        {
          headers: {
            "x-token": token,
          },
        }
      );
      setUserData((prevData) =>
        prevData.map((eachData) => {
          if (eachData._id === updatedNote.data.note._id) {
            return updatedNote.data.note;
          }
          return eachData;
        })
      );
      setEditMode(false);
      setSelectedNote(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedNote({
      ...selectedNote,
      [name]: value,
    });
  };

  return (
    <>
      <Home />
      <section>
        <input
          type="text"
          id="search"
          style={{
            width: "200px",
            height: "30px",
            borderRadius: "5px",
            border: "0px solid",
            color: "black",
          }}
          placeholder="Search notes"
          onChange={handleSearch}
        />
      </section>
      {editMode && selectedNote && (
        <div>
          <input
            type="text"
            name="title"
            value={selectedNote.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            value={selectedNote.description}
            onChange={handleInputChange}
          ></textarea>

          <button onClick={handleCancel}>Cancel</button>
          <button onClick={() => selectedNote && handleSave(selectedNote._id)}>Save</button>

        </div>
      )}
      {userData.length > 0 ? (
        results.map((each) => (
          <div key={each._id}>
             <div>{new Date(each.createdAt).toLocaleString()}</div> {/* Display timestamp */}
            <div>{each.title}</div>
            <div>{each.description}</div>
            <button onClick={() => handleEdit(each)}>Edit</button>
            <button onClick={() => handleDelete(each._id)}>Delete</button>
          </div>
        ))
      ) : (
        <div>No data found.</div>
      )}
    </>
  );
};

export default DisplayData;
