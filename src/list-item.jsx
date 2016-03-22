var React = require('react');
var Firebase = require('firebase');

//Firebase DataSource
var rootUrl = 'https://myreacttodo.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function(){
    return {
      text: this.props.item.text,
      done: this.props.item.done
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
  render: function(){
    return <div className="input-group">
            <span className="input-group-addon">
              <input
                type="checkbox"
                onChange={this.handleDoneChange}
                checked={this.state.done}
                />
            </span>
             <input type="text" className="form-control" value={this.state.text} />
             <span className="input-group-btn">
               <button
                  className="btn btn-default"
                  onClick={this.handleDeleteChange}
                  >Delete</button>
             </span>
           </div>
  }
});
