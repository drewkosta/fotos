import React from 'react';
import ReactDOM from 'react-dom';

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: 'none'
    };
  }

  swapVisibility() {
    var val = (this.state.visible === 'none') ? 'block' : 'none';
    this.setState({ visible: val });
  }

  render() {
    return (
          <div>
            <p>
              <button onClick={this.swapVisibility.bind(this)}>Edit</button>
            </p>
            <div className='inputForm' style={{ 'display': this.state.visible }}>
              <form>
                <p className='inputs'>
                 <label>Start Date: </label>
                 <input type="date" name="startDate" className="datePicker" onChange={(event)=> this.setState({startDate: event.target.value})} />
                </p>
                <p className='inputs'>
                  <label>End Date: </label>
                  <input type="date" name="endDate" className="datePicker" onChange={(event)=> this.setState({endDate: event.target.value})} />
                </p>
              {/* <select onChange={this.dropdownSelect}>
                  <option></option>
                  <option value="filter1">Photos of me</option>
                  <option value="filter2"></option>
                  <option value="filter3">Photos in other countries</option>
                </select> */}

              </form>
            </div>
          </div>
        );
  }
}

export default Edit;