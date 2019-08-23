import React from "react";

function SearchCard(props) {
    return (
        <div className="container mt-3">
            <div className="card">
                <h5 className="card-header">Book Search</h5>
                <div className="card-body">
                    <form onSubmit={props.onClick}>
                        <div className="form-group">
                            <label>Book</label>
                            <input type="text" className="form-control" value={props.value} onChange={props.onChange} placeholder="Enter Book Title or Author" required/>
                        </div>
                        <button className="btn btn-sm float-right btn-info" type="submit" >Find Books!</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchCard;