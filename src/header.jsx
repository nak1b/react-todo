var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			text: ''
		}
	},
	render: function(){
		return <div className="input-group">
			<input onChange={this.handleInputChange} type="text" className="form-control" value={this.state.text}/>
		  <span className="input-group-btn">
			   <button onClick={this.handleClick} className="btn btn-default" type="button">Add</button>
	    </span>
		</div>
	},
	handleInputChange: function(event){
		this.setState({text: event.target.value});
	},
	handleClick: function(){
		this.props.itemsStore.push({
			text: this.state.text,
			done: false
		})

		//Clear out input
		this.setState({text:''});
	}
});
