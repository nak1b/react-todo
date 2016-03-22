var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');

//Firebase DataSource
var rootUrl = 'https://myreacttodo.firebaseio.com/';

var Hello = React.createClass({
  mixins: [ReactFire],
  getInitialState: function(){
    return {
      items: {},
      loaded: false
    }
  },
  handleDataLoaded: function(){
    this.setState({loaded:true});
  },
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  onDeleteDoneClick: function(){
    //Delete todo that are marked Done
    for(var key in this.state.items){
      if(this.state.items[key].done === true){
        this.fb.child(key).remove();
      }
    }
  },
  deleteAllBtn: function(){
    if(!this.state.loaded){
      return
    }else{
      return <div className="text-center clear-complete">
                <hr />
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={this.onDeleteDoneClick}
                >Clear Complete
                </button>
             </div>
    }
  },
  render: function() {
    return <div className="row panel panel-default">
              <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                  To-Do List
                </h2>
                <Header itemsStore = {this.firebaseRefs.items}/>
                <hr />
                <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
                  <List items= {this.state.items} />
                  {this.deleteAllBtn()}
                </div>
              </div>
           </div>
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
