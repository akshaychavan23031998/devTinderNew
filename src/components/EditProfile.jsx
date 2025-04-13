import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const fallbackImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // default avatar

const EditProfile = ({ user }) => {
  const [name, setName] = useState(user.firstName);
  const [photo, setPhoto] = useState(user.photo);
  const [lastname, setLastname] = useState(user.lastName);
  const [bio, setBio] = useState(user.about);
  const [errorMsg, setErrorMsg] = useState("");
  const [imgSrc, setImgSrc] = useState(user.photo); // for handling fallback
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [photoError, setPhotoError] = useState("");

  const nameRegex = /^[A-Za-z\s]+$/;

  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedLastname = lastname.trim();
    const trimmedBio = bio.trim();
    const trimmedPhoto = photo.trim();

    setNameError("");
    setLastnameError("");
    setBioError("");
    setPhotoError("");
    setErrorMsg("");

    let isValid = true;

    if (!trimmedName) {
      setNameError("Name is required.");
      isValid = false;
    } else if (trimmedName.length < 2 || trimmedName.length > 50) {
      setNameError("Name must be between 2 and 50 characters.");
      isValid = false;
    } else if (!nameRegex.test(trimmedName)) {
      setNameError("Name can only contain letters and spaces.");
      isValid = false;
    }

    if (!trimmedLastname) {
      setLastnameError("Last name is required.");
      isValid = false;
    } else if (trimmedLastname.length < 2 || trimmedLastname.length > 50) {
      setLastnameError("Last name must be between 2 and 50 characters.");
      isValid = false;
    } else if (!nameRegex.test(trimmedLastname)) {
      setLastnameError("Last name can only contain letters and spaces.");
      isValid = false;
    }

    if (!trimmedBio) {
      setBioError("Bio is required.");
      isValid = false;
    } else if (trimmedBio.length < 10 || trimmedBio.length > 200) {
      setBioError("Bio must be between 10 and 200 characters.");
      isValid = false;
    }

    // Support .svg and .bmp too
    if (!trimmedPhoto) {
      setPhotoError("Photo URL is required.");
      isValid = false;
    } else if (!/^https?:\/\/.+/i.test(trimmedPhoto)) {
      setPhotoError("Please enter a valid image URL.");
      isValid = false;
    }

    if (!isValid) {
      setErrorMsg("Please fill in all fields correctly.");
    }

    return isValid;
  };

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: name,
          lastName: lastname,
          about: bio,
          photo,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.updatedData));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000)
    } catch (err) {
      setErrorMsg("Something went wrong while saving profile.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      await saveProfile();
    }
  };

  return (
    <>
      <div className="flex justify-center mt-[5%]">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>

            {errorMsg && (
              <div className="text-red-500 text-sm text-center mb-2">
                {errorMsg}
              </div>
            )}

            {/* Profile Picture Preview */}
            <figure className="flex justify-center mb-4">
              <img
                src={imgSrc}
                alt="Profile Preview"
                onError={() => setImgSrc(fallbackImg)}
                className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 shadow-sm"
              />
            </figure>

            {/* Photo URL Input */}
            <label className="input mt-1">
              <input
                type="text"
                value={photo}
                onChange={(e) => {
                  setPhoto(e.target.value);
                  setImgSrc(e.target.value); // live update preview
                }}
                placeholder="Paste image URL here"
                required
              />
            </label>
            {photoError && (
              <div className="text-red-500 text-xs mt-1">{photoError}</div>
            )}

            {/* Name Input */}
            <label className="input mt-1">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Change your first name"
                required
              />
            </label>
            {nameError && (
              <div className="text-red-500 text-xs mt-1">{nameError}</div>
            )}

            {/* Last Name Input */}
            <label className="input mt-1">
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Change your last name"
                required
              />
            </label>
            {lastnameError && (
              <div className="text-red-500 text-xs mt-1">{lastnameError}</div>
            )}

            {/* Bio Input */}
            <label className="input mt-1">
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Change your bio"
                required
              />
            </label>
            {bioError && (
              <div className="text-red-500 text-xs mt-1">{bioError}</div>
            )}

            {/* Save Button */}
            <div className="card-actions justify-center mt-1">
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {showToast && (<div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>)}
    </>
  );
};

export default EditProfile;
