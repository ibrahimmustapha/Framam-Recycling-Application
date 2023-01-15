import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3">Opps! Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Link to="/" className="btn btn-primary">Go Home</Link>
            </div>
        </div>
    )
}

export default Error;