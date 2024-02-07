import React,{useState} from 'react'
import { Button, Modal } from 'antd';
import moment from 'moment';
import { Tooltip } from 'antd';

function EventModal({ event, visible, handleClose }) {

    return (
      <Modal
        visible={visible}
        onCancel={handleClose}
        footer={null}
        centered
        title="What's New"
      >  
      <hr/>
     <ul>
        <li>Added Logs for Category, Sub-Category And Process</li>
        <li>Added Inquiry Reports</li>
        <li>Added Email Setting</li>
        <li>Added Mail Sending Feature To Client</li>
        {/* <li>Added</li> */}
     </ul>
      </Modal>
    );
  };
  
const Footer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

    return (
   
         <div className='d-flex'>
            <footer className="main-footer" >
                <span><strong>Copyright © {new Date().getFullYear()-1}-{moment(new Date()).format('YYYY')} TAXCRM.</strong> All rights reserved.</span>
                <Tooltip title="What's New"  >
                <span onClick={()=>{setIsModalVisible(true)}} style={{cursor:'pointer'}}><strong>Version :</strong> 1.5.2</span>
                </Tooltip>
            </footer>
            <EventModal
          visible={isModalVisible}
          handleClose={handleModalClose}
        />
        </div>
     
    )
}

export default Footer