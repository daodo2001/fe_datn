import React from 'react';

PreviewHotel.defaultProps = {
    arrImage: []
};

function PreviewHotel(props) {
    const { arrImage } = props

    const getImage = (image) => {
        if (image) {
            return `http://localhost:8080/api/rest/files/image_hotels/${image}`
        }
    }
    return (
        <div className="preview-hotel">
            <div className="preview-hotel-left-big">
                <div className="preview-hotel-left-big-img">
                    <img src={getImage(arrImage[0])} alt="" />
                </div>
            </div>
            <div className="preview-hotel-right-small">
                <div className="preview-hotel-right-small-top">
                    <div className="preview-hotel-right-small-img preview-hotel-right-small-img1">
                        <img src={getImage(arrImage[1])} alt="" />
                    </div>
                    <div className="preview-hotel-right-small-img preview-hotel-right-small-img2">
                        <img src={getImage(arrImage[2])} alt="" />
                    </div>
                </div>
                <div className="preview-hotel-right-small-bottom">
                    <div className="preview-hotel-right-small-img preview-hotel-right-small-img1">
                        <img src={getImage(arrImage[3])} alt="" />
                    </div>
                    <div className="preview-hotel-right-small-img preview-hotel-right-small-img2 preview-hotel-right-small-img4">
                        <img src={getImage(arrImage[4])} alt="" />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PreviewHotel;