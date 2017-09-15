import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
  overlay : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    zIndex: 10
  },
  content : {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}

class ProjectModal extends Component {
  render () {
    return (
      <Modal isOpen={this.props.isModalOpen} contentLabel="Example Modal" style={customStyles}>
        <a onClick={this.props.openModal} className='btn-sm waves-light right'>X</a>
        <h2 ref={subtitle => this.subtitle = subtitle} className='center'>Add New Project</h2>
        <form>
          <div className='input-field'>
            <i className="material-icons prefix">mode_edit</i>
            <input id="project_name" type="text" class="validate"/>
            <label htmlFor="project_name">Project Name</label>
          </div>
          <div className='input-field'>
            <i className="material-icons prefix">mode_edit</i>
            <textarea id="textarea1" className="materialize-textarea" spellcheck="true"/>
            <label htmlFor="icon_prefix2">Input Transcript</label>
          </div>
        </form>
      </Modal>
    )
  }
}

export default ProjectModal
