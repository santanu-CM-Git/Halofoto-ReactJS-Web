import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './index.css';

const GlobalLoader = (props) => {
    const override = {
        display: 'block',
        margin: '0 auto',
        borderWidth: '4px', // Ensure border width is applied here
    };

    return (
        props.loading && (
            <div className="loding_container">
                <ClipLoader
                    color={"#0082ed"}
                    loading={true}
                    cssOverride={override}
                    size={60}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        )
    );
};

export default GlobalLoader;
