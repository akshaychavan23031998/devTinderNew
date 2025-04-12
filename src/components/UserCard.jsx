import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
        <p><strong>about:</strong> {user.about}</p>
        <div className="card-actions flex justify-center mt-auto">
            <button className="btn btn-success">Interested</button>
            <button className="btn btn-danger ml-2">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
