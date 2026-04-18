import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import { addTask, editTask } from '../api/task.api';
import { useAuth } from '../contexts/authContext';

export default function TaskDialog({ open, onClose,onTaskAdded,value }) {

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Not Started"); 
  const [description, setDescription] = useState("");


  
  useEffect(() => {
    if (value) {
      setTitle(value.title || "");
      setStatus(value.status || "");
      setDescription(value.description || "");
    }
  }, [value]); 


  const onSubmit = async () => {
    if(!title || !description)
    {
      toast.error("Fields can not be empty");
      return;
    }

    if(value && value.id){
      onEditTask();
    }
    else{
      onAddTask();
    }
  
  };

  const onAddTask=async()=>{
      const toastId = toast.loading("Adding Task");

      const res=await addTask({title,description,status});
      toast.dismiss(toastId);
      if(res.success){
        if(onTaskAdded) onTaskAdded();
        setTitle("");
        setStatus("");
        setDescription("");
        onClose();
        toast.success(res.message)
      }
  }
  
  const onEditTask =async()=>{
        const toastId = toast.loading("Updating Task");

        const res=await editTask(value.id,{title,description,status});
        toast.dismiss(toastId);
        if(res.success){
        if(onTaskAdded) onTaskAdded();

          setTitle("");
          setStatus("");
          setDescription("");
          onClose();
          toast.success(res.message);
        }
    }


  return (
    <Dialog open={open} onClose={onClose}  fullWidth maxWidth="md"
    >
      <DialogTitle>{value ? " Update Task":"Add a New Task"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter task details below.
        </DialogContentText>

      
        <TextField
          autoFocus
          required
          margin="dense"
          id="title"
          label="Task Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
        />


      <Box sx={{ minWidth: 120 }} marginY={"1rem"} margin="dense">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={(e)=>setStatus(e.target.value)}
        >
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          
        </Select>
      </FormControl>
      </Box>

        <TextField
          required
          margin="dense"
          id="description"
          label="Task Description"
          multiline
          rows={4}
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>{value ?"Update":"Add Task"}</Button>
      </DialogActions>
    </Dialog>
  );
}
