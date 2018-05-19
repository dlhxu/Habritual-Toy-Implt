import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// possible solutions to the key-value problem: 
// change every list item to an object that will then be rendered into a ListItem
// this way you can actually access the object.unique identifier to delete

function ListItem(props){

  var handleDeleteClick = () => props.deleteTask(props.listId);

  return (
    <li>
      {props.value}
      <button onClick = {handleDeleteClick}> 
      Delete the task
      </button>
    </li>
    );
}

function ListOfItems(props){
console.log(Object.keys(props.arr));
  let componentArr = Object.keys(props.arr).map(function (key) {
    console.log(key);
    return <ListItem listId={key} key={key} deleteTask={props.deleteTask} value={props.arr[key]} />
  });

  return (
    <div>
      Your Tasks!
      <ul>
        {componentArr}
      </ul>
    </div>
    
    );
}

class App extends Component {

  // showDataEntry will be implemented later, for now just add fixed text list elements
  // deletion will be implemented later
  // editing will be implemented later

  constructor(props){
    super(props);
    this.state = {
      listOfItems: [],
      showDataEntryBox: false, 
    };

    this.idGen = this.idGen.bind(this);
    this.listCheck = this.listCheck.bind(this);
  }

  // each task is created with a particular key (random) such that it can be specified for deletion, edit, etc.

  addTask = () => {
    let newListOfItems = this.state.listOfItems;
    let tempName = "temporaryName";
    let listId = this.idGen(tempName);
    //console.log(listId);
    newListOfItems[listId] = "temporary name" + listId; 
    console.log(newListOfItems[listId]);

    //newListOfItems.push(<ListItem key={listId} listId = {listId} deleteTask={this.deleteTask}/>);
    this.setState({listOfItems: newListOfItems,});
  }

  deleteTask = (reqId) => {
    let newListOfItems = this.state.listOfItems;
    //let indexToRemove = this.listCheck(reqId);
    //console.log("removing " + indexToRemove);
    console.log("removing " + reqId);

    // indexToRemove specifies where "1" item should be removed
    //newListOfItems.splice(indexToRemove, 1);
    delete newListOfItems[reqId];
    this.setState({listOfItems: newListOfItems,});
  }

  // alter idGen to instead access the listOfItems and the listIds of each element as filter

// a ListId is a: 
// * int

// this function consumes no parameters and returns a listID that is not currently in use
idGen(itemName) {
    var timestamp = (new Date()).getTime();
    var newId = itemName + timestamp;
    console.log(newId);
    return newId;
  }

// this function consumes an id and returns the listItem's corresponding array index
listCheck (id) {
    var indexNeeded;
    let arr = this.state.listOfItems.slice();

    for(let i = 0; i < arr.length; i++){
      if(arr[i].listId === id){
        indexNeeded = i;
      }
    }

    return indexNeeded;

  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ListOfItems arr={this.state.listOfItems} deleteTask={this.deleteTask}/>
        <button onClick={this.addTask}>Add a new task</button>
      </div>
      
    );
  }
}

export default App;
