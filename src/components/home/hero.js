import React from "react";

import { Carousel } from "antd";

function AppHero() {
  return (
    <div id="hero" className="heroBlock">
      <Carousel>
        {/* {items.map(item => {
          return (
            <div key={item.key} className="container-fluid">
              <div className="content">
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                <div className="btnHolder">
                  <Button type="primary" size="large">Learn More</Button>
                  <Button size="large"><i className="fas fa-desktop"></i> Watch a Demo</Button>
                </div>
              </div>
            </div>  
          );
        })} */}
      </Carousel>
    </div>
  );
}

export default AppHero;
