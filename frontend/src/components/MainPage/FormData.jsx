import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Formdata = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!data.title || !data.description) {
      setErrorMsg('Kindly fill in all the details');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-token': token,
        },
      };
      const res = await axios.post('http://localhost:8000/api/notes', data, config);
      console.log(res.data);
      setData({ title: '', description: '' });
      navigate('/displayData');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg('An error occurred. Please try again.');
      }
      console.log(err);
    }
  };
  
  return (
    <div>
      <center>
        <form onSubmit={submitHandler}>
          <span id="errMsg-1">{errorMsg}</span>
          <section className="title-container">
            <label htmlFor="title">Title</label>
            <br />
            <input
              type="text"
              id="title"
              onChange={changeHandler}
              name="title"
              value={data.title}
              placeholder="Title"
            />
          </section>
          <section className="description-container">
            <label htmlFor="description">Description</label>
            <br />
            <input
              type="text"
              id="description"
              onChange={changeHandler}
              name="description"
              value={data.description}
              placeholder="Description"
            />
          </section>
          <input type="submit" id="btn" value="Add Note" />
        </form>
      </center>
    </div>
  );
};

export default Formdata;
