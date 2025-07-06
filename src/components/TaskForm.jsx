import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [form, setForm] = useState({ cardName: '', topic: '', difficulty: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5001/api/task', form);
    alert('Task created: ' + res.data.task.cardName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="cardName" onChange={handleChange} placeholder="Card Name" />
      <input name="topic" onChange={handleChange} placeholder="Topic" />
      <input name="difficulty" onChange={handleChange} placeholder="Difficulty" />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
