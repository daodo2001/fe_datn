import React from 'react';

import { Button, Modal } from 'antd';

class AppWorks extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div id="works" className="block worksBlock">
        <div className="container-fluid">
          <div className="titleHolder">
            <h2>Review khách sạn</h2>
            <p>Review Khách Sạn 5 Sao SaPa - Khách Sạn Đẳng Cấp Nhất SaPa - PAO'S SAPA</p>
          </div>
          <div className="contentHolder">
            <Button size="large" onClick={this.showModal}><i className="fas fa-play"></i></Button>
          </div>
          <Modal width={850}
            title="Review khách sạn của Khá Bảnh"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
            destroyOnClose={true}
          >
            <iframe title="Review khách sạn của Khá Bảnh" width="100%" height="450" src="https://www.youtube.com/embed/vLS2ds6_wps"></iframe>
          </Modal>
        </div>
      </div>
    );
  }
}

export default AppWorks;