import React, { useState } from 'react';

interface TaskInputProps {
  onAddTask: (task: string) => void;
}

const TaskInput = ({ onAddTask }: TaskInputProps): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  };

  function handleAddTask() {
    if (inputValue.trim() !== '') {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      onAddTask(inputValue);
      setInputValue('');
    }
  }

  return (
    <div className='task-input'>
      <div className='field has-addons'>
        <div className='control is-expanded'>
          <input
            className='input'
            type='text'
            value={inputValue}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder='Enter a task...'
          />
        </div>
        <div className='control'>
          <button className='button is-info' onClick={handleAddTask}>
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
