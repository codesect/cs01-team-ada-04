import React from 'react';
import SwitchToggle from './SwitchToggle';

function Toggles() {
  return (
    <div>
      <SwitchToggle
        label="Uppercase letters"
        name="uppercase"
        isChecked
        onToggle={console.log}
      />
    </div>
  );
}
export default Toggles;
