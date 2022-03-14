import React from 'react';

function Footer(props) {
    return (
        <div>
            <footer className="footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">© Hyper - Coderthemes.com</div>
                <div className="col-md-6">
                  <div className="text-md-end footer-links d-none d-md-block">
                    <a href="javascript: void(0);">Về chúng tôi</a>
                    <a href="javascript: void(0);">Hỗ trợ</a>
                    <a href="javascript: void(0);">Liên hệ với chúng tôi</a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
    );
}

export default Footer;