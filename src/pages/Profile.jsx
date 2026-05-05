import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { useLanguage } from "../hooks/useLanguage";
import translations from "../utils/translations";
import { toast } from "react-toastify";
import { FaEdit, FaCamera, FaSave, FaTimes, FaUser, FaPhone, FaBirthdayCake, FaVenusMars, FaGlobe, FaEnvelope, FaPalette, FaLanguage } from "react-icons/fa";
import ThemeBtn from "../components/ThemeBtn";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Profile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);
  const { language } = useLanguage();
  const t = translations[language] || {};
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    birthDate: user?.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
    gender: user?.gender || "",
    country: user?.country || "",
  });

  const [editingFields, setEditingFields] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    birthDate: false,
    gender: false,
    country: false,
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
        gender: user.gender || "",
        country: user.country || "",
      });
      if (user.avatar) {
        setAvatarPreview(`https://edumaster-backend-6xy5.onrender.com${user.avatar}`);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const toggleEdit = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      setIsDirty(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (avatar) {
      data.append("avatar", avatar);
    }

    const result = await updateUserProfile(data);
    if (result.success) {
      toast.success(t.profileSuccessUpdate || "Profile updated successfully!");
      setIsDirty(false);
      setEditingFields({
        firstName: false,
        lastName: false,
        phone: false,
        birthDate: false,
        gender: false,
        country: false,
      });
    } else {
      toast.error(result.message || t.profileErrorUpdate || "Failed to update profile.");
    }
  };

  const cancelChanges = () => {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : "",
      gender: user.gender || "",
      country: user.country || "",
    });
    setAvatar(null);
    setAvatarPreview(user.avatar ? `https://edumaster-backend-6xy5.onrender.com${user.avatar}` : null);
    setIsDirty(false);
    setEditingFields({
      firstName: false,
      lastName: false,
      phone: false,
      birthDate: false,
      gender: false,
      country: false,
    });
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-(--text-color)">Loading...</div>;

  return (
    <div className="min-h-screen bg-(--bg-color) py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-(--main-color) rounded-3xl shadow-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300">
          {/* Header Section */}
          <div className="relative h-48 bg-gradient-to-r from-(--second-color) to-purple-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-(--main-color) overflow-hidden bg-gray-200 shadow-xl transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={avatarPreview || "/userImage.jpg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-1 right-1 bg-(--second-color) p-2 rounded-full text-white shadow-lg hover:bg-opacity-90 transition-all duration-200 scale-90 group-hover:scale-100"
                  title={t.profileChangeAvatar}
                >
                  <FaCamera size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8 text-center">
            <h1 className="text-3xl font-bold text-(--text-color)">{user.username}</h1>
            <p className="text-(--p-color) mt-2 flex items-center justify-center gap-2">
              <FaEnvelope className="text-(--second-color)" /> {user.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--p-color) flex items-center gap-2">
                  <FaUser className="text-(--second-color)" /> {t.profileFirstName}
                </label>
                <div className="relative flex items-center group">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!editingFields.firstName}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      editingFields.firstName
                        ? "border-(--second-color) bg-white/5 text-(--text-color)"
                        : "border-transparent bg-gray-50/5 text-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-(--second-color)/50`}
                    placeholder={t.profileFirstName}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEdit("firstName")}
                    className="absolute right-3 text-gray-400 hover:text-(--second-color) transition-colors p-2"
                  >
                    {editingFields.firstName ? <FaTimes /> : <FaEdit />}
                  </button>
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--p-color) flex items-center gap-2">
                  <FaUser className="text-(--second-color)" /> {t.profileLastName}
                </label>
                <div className="relative flex items-center group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!editingFields.lastName}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      editingFields.lastName
                        ? "border-(--second-color) bg-white/5 text-(--text-color)"
                        : "border-transparent bg-gray-50/5 text-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-(--second-color)/50`}
                    placeholder={t.profileLastName}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEdit("lastName")}
                    className="absolute right-3 text-gray-400 hover:text-(--second-color) transition-colors p-2"
                  >
                    {editingFields.lastName ? <FaTimes /> : <FaEdit />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--p-color) flex items-center gap-2">
                  <FaPhone className="text-(--second-color)" /> {t.profilePhone}
                </label>
                <div className="relative flex items-center group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editingFields.phone}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      editingFields.phone
                        ? "border-(--second-color) bg-white/5 text-(--text-color)"
                        : "border-transparent bg-gray-50/5 text-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-(--second-color)/50`}
                    placeholder={t.profilePhone}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEdit("phone")}
                    className="absolute right-3 text-gray-400 hover:text-(--second-color) transition-colors p-2"
                  >
                    {editingFields.phone ? <FaTimes /> : <FaEdit />}
                  </button>
                </div>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--p-color) flex items-center gap-2">
                  <FaGlobe className="text-(--second-color)" /> {t.profileCountry}
                </label>
                <div className="relative flex items-center group">
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={!editingFields.country}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      editingFields.country
                        ? "border-(--second-color) bg-white/5 text-(--text-color)"
                        : "border-transparent bg-gray-50/5 text-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-(--second-color)/50`}
                    placeholder={t.profileCountry}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEdit("country")}
                    className="absolute right-3 text-gray-400 hover:text-(--second-color) transition-colors p-2"
                  >
                    {editingFields.country ? <FaTimes /> : <FaEdit />}
                  </button>
                </div>
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--p-color) flex items-center gap-2">
                  <FaBirthdayCake className="text-(--second-color)" /> {t.profileBirthDate}
                </label>
                <div className="relative flex items-center group">
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    disabled={!editingFields.birthDate}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      editingFields.birthDate
                        ? "border-(--second-color) bg-white/5 text-(--text-color)"
                        : "border-transparent bg-gray-50/5 text-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-(--second-color)/50`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleEdit("birthDate")}
                    className="absolute right-3 text-gray-400 hover:text-(--second-color) transition-colors p-2"
                  >
                    {editingFields.birthDate ? <FaTimes /> : <FaEdit />}
                  </button>
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-(--p-color) flex items-center gap-2">
                  <FaVenusMars className="text-(--second-color)" /> {t.profileGender}
                </label>
                <div className="relative flex items-center group">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    disabled={!editingFields.gender}
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                      editingFields.gender
                        ? "border-(--second-color) bg-white/5 text-(--text-color)"
                        : "border-transparent bg-gray-50/5 text-gray-400 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-(--second-color)/50 appearance-none`}
                  >
                    <option value="">{t.profileGender}</option>
                    <option value="male">{t.profileMale}</option>
                    <option value="female">{t.profileFemale}</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => toggleEdit("gender")}
                    className="absolute right-3 text-gray-400 hover:text-(--second-color) transition-colors p-2"
                  >
                    {editingFields.gender ? <FaTimes /> : <FaEdit />}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            {isDirty && (
              <div className="flex items-center justify-end gap-4 pt-6 animate-fadeIn">
                <button
                  type="button"
                  onClick={cancelChanges}
                  className="px-6 py-2.5 rounded-xl text-(--p-color) font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
                >
                  {t.profileCancel}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl bg-(--second-color) text-white font-bold shadow-lg shadow-(--second-color)/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <FaSave />
                  )}
                  {t.profileSave}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Appearance & Language Section */}
        <div className="bg-(--main-color) rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm transition-all duration-300">
          <h2 className="text-xl font-bold text-(--text-color) mb-6 flex items-center gap-3">
            <FaPalette className="text-(--second-color)" /> {t.profileAppearance}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center justify-between p-4 bg-gray-50/5 rounded-2xl border border-white/5 hover:border-(--second-color)/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-(--second-color)/10 rounded-lg text-(--second-color)">
                  <FaPalette />
                </div>
                <span className="font-medium text-(--text-color)">{t.profileTheme}</span>
              </div>
              <ThemeBtn />
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50/5 rounded-2xl border border-white/5 hover:border-(--second-color)/30 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-(--second-color)/10 rounded-lg text-(--second-color)">
                  <FaLanguage size={20} />
                </div>
                <span className="font-medium text-(--text-color)">{t.profileLanguage}</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;