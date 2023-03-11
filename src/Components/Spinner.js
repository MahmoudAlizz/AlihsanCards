import React,{Fragment} from "react";

const Spinner= (props) =>{
    return (
        <Fragment>
            <div className="text-center mx-auto p-2">
            <i className="fa-duotone fa fa-spinner fa-xl fa-spin" style={{color: '#1c7ed6'}}></i>
            <p>{props.message}</p>
            </div>
        </Fragment>
    );
};

Spinner.defaultProps = {
    message:'Loading',
};

export default Spinner;