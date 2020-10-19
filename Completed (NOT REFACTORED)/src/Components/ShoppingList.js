import React from 'react';
import {getAstraToken} from '../token'
import {v4 as uuidv4} from 'uuid';
import EditModal from './EditModal'

class ShoppingList extends React.Component{
    constructor(){
        super();
        this.state = {
            items: [],
            editText: '',
            isEditing: false,
            addInputText: '',
            itemID: ''
        };
    }

    componentDidMount(){
        this.getItems();
    }

    getItems = async() => {
        try{
            fetch(`${process.env.REACT_APP_API_URL}/v1/keyspaces/${process.env.REACT_APP_KEYSPACE}/tables/${process.env.REACT_APP_TABLE}/rows`, {
                method: 'GET',
                headers: {
                    'X-Cassandra-Token': await getAstraToken()
                }
            })
            .then(res =>
                (!res.ok)
                  ? res.json().then(e => Promise.reject(e))
                  : res.json()
              )
            .then(data => {
                this.setState({
                    items: data.rows
                })
            })
        }
        catch(e){
            console.log(e)
        }
    }

    handleDeleteItem = async(id) => {
        try{
             fetch(`${process.env.REACT_APP_API_URL}/v1/keyspaces/${process.env.REACT_APP_KEYSPACE}/tables/${process.env.REACT_APP_TABLE}/rows/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-Cassandra-Token': await getAstraToken()
                }
            })
            .then(res =>
                (!res.ok)
                  ? res.json().then(e => Promise.reject(e))
                  : this.setState({items: this.state.items.filter(item => item.id !== id)})
              )
        }
        catch(e){
            console.log(e)
        }
    
    }

    createEditForm = (title, itemID) => {
        this.setState({
            isEditing: true,
            editText: title,
            itemID
        })
    }

    handleEditSubmit = async(e) => {
        e.preventDefault()

        let newItemName = document.getElementById('newItemName').value

        let reqBody = {
            "changeset": [
                {
                    column: "itemname",
                    value: newItemName
                }
            ]
        }

        try{
            fetch(`${process.env.REACT_APP_API_URL}/v1/keyspaces/${process.env.REACT_APP_KEYSPACE}/tables/${process.env.REACT_APP_TABLE}/rows/${this.state.itemID}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'X-Cassandra-Token': await getAstraToken(),
                },
                body: JSON.stringify(reqBody)
            })
            .then(res => res.json())
            await this.getItems()
            this.setState({isEditing: false})
        }
        catch(e){
            console.log(e)
        }
    }

    handleCloseEditForm = () => {
        this.setState({isEditing: false})
    }

    handleAddItem = async(e) => {
        e.preventDefault();
        let itemname = document.getElementById('itemname').value
        let reqBody = {
            "columns": [
                {name: "id", value: uuidv4()}, 
                {name: "itemname", value: itemname}
            ]
        }
        e.target.reset()

        try{
            fetch(`${process.env.REACT_APP_API_URL}/v1/keyspaces/${process.env.REACT_APP_KEYSPACE}/tables/${process.env.REACT_APP_TABLE}/rows`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'X-Cassandra-Token': await getAstraToken(),
                },
                body: JSON.stringify(reqBody)
            })
            .then(res => res.json())
            this.getItems()
        }
        catch(e){
            console.log(e)
        }
    }

    render(){

        return(
        <div>
            <div>
                <form onSubmit={this.handleAddItem}>
                    <label> item:</label>
                       <input type="text" id="itemname" />
                       <input type="submit" />
                </form>
            </div>
            <div>
                <ul>
                    {this.state.items.map((item, i) => (
                        <li key={i}>
                            {item.itemname}
                            <br>
                            </br>
                            <button onClick={() => this.createEditForm(item.itemname, item.id)}>Edit</button>
                            <button onClick={() => this.handleDeleteItem(item.id)}>Delete</button>
                            {this.state.isEditing && this.state.itemID === item.id && <EditModal handleEditSubmit={this.handleEditSubmit} handleCloseEditForm={this.handleCloseEditForm} itemId={item.id} itemName={this.state.editText} />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        )
    }
}

export default ShoppingList;