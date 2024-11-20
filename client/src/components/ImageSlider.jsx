import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/image.css';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer" style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '10px' }}>
            <p className="mb-0">&copy; 2024 Code With Akshay. All Rights Reserved.</p>
        </div>
    );
};

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length === 0) {
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return <div>No images to display</div>;
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div>
            <div className={`col p-0 m-0 d-flex flex-column 'col-12' shadow-class`} style={{backgroundColor:'Azure', boxShadow:'30px 30px 30px 30px'}}>
                <div className="p-2 d-flex justify-content-between shadow">
                    <h4 className="text-center w-100">Employee Management System</h4>
                    <Link to='adminlogin' className='admin'>AdminLogin</Link>
                    <Link to='employeelogin' className='admin'>EmployeeLogin</Link>
                </div>
            </div>

            <div className='work' style={{ backgroundColor: 'azure', minHeight: '100vh', position: 'relative' }}>
                <div>
                    <div className="slider" style={{ border: '1px solid black' }}>
                        <button onClick={goToPrevious}>&lt;</button>
                        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
                        <button onClick={goToNext}>&gt;</button>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

ImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageSlider;
