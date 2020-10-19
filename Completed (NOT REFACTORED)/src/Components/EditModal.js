import React from 'react';

export default class EditModal extends React.Component{

    render(){
    
      return (
        <div>
          <form onSubmit={this.props.handleEditSubmit}>
            <p>Edit the Item's Name</p>
            <label></label>
            <input type='text' id='newItemName' defaultValue={this.props.itemName} />
            <input type="submit" />
          </form>
          <button type="button" onClick={this.props.handleCloseEditForm}>Close</button>     
        </div>
      );
    }
}