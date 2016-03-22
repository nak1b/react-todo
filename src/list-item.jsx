var React = require('react');
var Firebase = require('firebase');

//Firebase DataSource
var rootUrl = 'https://myreacttodo.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function(){
    this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
  },
  handleDoneChange: function(event){
    var update = {done: event.target.checked}
    this.setState(update);
    this.fb.update(update);
  },
  handleDeleteChange: function(event){
    var self = this;
    $(event.currentTarget).closest('.input-group').slideUp('fast', function(){
       self.fb.remove();
    });
  },
  handleTextChange: function(event){
    this.setState({ text: event.target.value,
                    textChanged: true
                 });
  },
  handleSaveClick: function(){
    this.fb.update({text: this.state.text});
    this.setState({textChanged: false});
  },
  handleUndoClick: function(){
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  changesButton: function(){
    if(!this.state.textChanged){
      return null;
    }else{
      return [
          <span>
            <button
              className="btn no-border-radius"
              onClick={this.handleUndoClick}
              >Undo</button>
            <button
                className="btn btn-success no-border-radius"
                onClick={this.handleSaveClick}
                >Save</button>
          </span>
        ]
    }
  },
  render: function(){
    return <div className="input-group">
            <span className="input-group-addon">
              <input
                type="checkbox"
                onChange={this.handleDoneChange}
                checked={this.state.done}
                />
            </span>
             <input type="text"
                    className="form-control"
                    value={this.state.text}
                    disabled={this.state.done}
                    onChange={this.handleTextChange} />

             <span className="input-group-btn">
               {this.changesButton()}
               <button
                  className="btn btn-danger"
                  onClick={this.handleDeleteChange}
                  >Delete</button>
             </span>
           </div>
  }
});
